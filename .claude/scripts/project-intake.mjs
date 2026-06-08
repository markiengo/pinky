#!/usr/bin/env node

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(__filename);
const projectRoot = path.resolve(scriptDir, "..", "..");
const cacheDir = path.join(projectRoot, ".claude", "cache");
const digestPath = path.join(cacheDir, "project-intake.md");
const metaPath = path.join(cacheDir, "project-intake.json");

const argSet = new Set(process.argv.slice(2));
const force = argSet.has("--force");
const sessionStart = argSet.has("--session-start");

const CORE_DOC_PRIORITY = [
  "README.md",
  "AGENTS.md",
  "CLAUDE.md",
  "docs/CHANGELOG.md",
  "docs/tech_readme.md",
  "docs/algorithm.md",
  ".planning/PROJECT.md",
  ".planning/STATE.md",
  ".planning/ROADMAP.md"
];

const EXACT_RELEVANT_FILES = ["README.md", "AGENTS.md", "CLAUDE.md", ".mcp.json"];

const GUARDRAIL_PATTERNS = [
  /\bnever\b/i,
  /\bdo not\b/i,
  /\bmanual-only\b/i,
  /\bgenerated\b/i,
  /\bmust not\b/i,
  /\bworktree\b/i,
  /\bsecret\b/i,
  /\.env\b/i
];

function nowIso() {
  return new Date().toISOString();
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function relativeToProject(absolutePath) {
  return toPosix(path.relative(projectRoot, absolutePath));
}

function exists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function statSafe(filePath) {
  try {
    return fs.statSync(filePath);
  } catch {
    return null;
  }
}

function safeReadFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function runGit(args) {
  const candidates =
    process.platform === "win32"
      ? [
          "git",
          "git.exe",
          "C:\\Program Files\\Git\\cmd\\git.exe",
          "C:\\Program Files\\Git\\bin\\git.exe"
        ]
      : ["git"];

  for (const candidate of candidates) {
    try {
      return execFileSync(candidate, args, {
        cwd: projectRoot,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"]
      }).trim();
    } catch {
      continue;
    }
  }

  return "";
}

function resolveGitDir(gitMarkerPath) {
  const markerStats = statSafe(gitMarkerPath);
  if (!markerStats) {
    return null;
  }

  if (markerStats.isDirectory()) {
    return gitMarkerPath;
  }

  const markerText = safeReadFile(gitMarkerPath);
  const match = markerText.match(/^gitdir:\s*(.+)$/im);
  if (!match) {
    return null;
  }

  return path.resolve(path.dirname(gitMarkerPath), match[1].trim());
}

function resolveGitInfo() {
  let currentDir = projectRoot;

  while (true) {
    const gitMarkerPath = path.join(currentDir, ".git");
    if (exists(gitMarkerPath)) {
      const gitDir = resolveGitDir(gitMarkerPath);
      if (!gitDir) {
        return null;
      }

      const commonDirFile = path.join(gitDir, "commondir");
      const commonDir = exists(commonDirFile)
        ? path.resolve(gitDir, safeReadFile(commonDirFile).trim())
        : gitDir;

      const headText = safeReadFile(path.join(gitDir, "HEAD")).trim();
      const headRefMatch = headText.match(/^ref:\s*(.+)$/i);
      const headRef = headRefMatch ? headRefMatch[1].trim() : null;
      const branch = headRef ? headRef.split("/").at(-1) : "";

      return {
        gitRoot: currentDir,
        gitDir,
        commonDir,
        headText,
        headRef,
        branch
      };
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }
    currentDir = parentDir;
  }
}

function readPackedRefs(commonDir) {
  const packedRefsPath = path.join(commonDir, "packed-refs");
  const text = safeReadFile(packedRefsPath);
  const refs = new Map();

  if (!text) {
    return refs;
  }

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line.startsWith("^")) {
      continue;
    }

    const parts = line.split(/\s+/);
    if (parts.length >= 2) {
      refs.set(parts[1], parts[0]);
    }
  }

  return refs;
}

function readRefSha(gitInfo, refName) {
  if (!gitInfo || !refName) {
    return "";
  }

  const looseRefPath = path.join(gitInfo.commonDir, ...refName.split("/"));
  if (exists(looseRefPath)) {
    return safeReadFile(looseRefPath).trim();
  }

  return readPackedRefs(gitInfo.commonDir).get(refName) || "";
}

function readGitRemote(gitInfo) {
  if (!gitInfo) {
    return "";
  }

  const configText = safeReadFile(path.join(gitInfo.commonDir, "config"));
  const remoteMatch = configText.match(/\[remote\s+"([^"]+)"\][\s\S]*?url\s*=\s*(.+)/i);
  if (!remoteMatch) {
    return "";
  }

  return `${remoteMatch[1]} ${remoteMatch[2].trim()}`;
}

function readFallbackHistory(gitInfo) {
  if (!gitInfo) {
    return { mode: "unavailable", entries: [] };
  }

  const logCandidates = [];
  if (gitInfo.headRef) {
    logCandidates.push(path.join(gitInfo.commonDir, "logs", ...gitInfo.headRef.split("/")));
  }
  logCandidates.push(path.join(gitInfo.gitDir, "logs", "HEAD"));
  logCandidates.push(path.join(gitInfo.commonDir, "logs", "HEAD"));

  for (const logPath of logCandidates) {
    if (!exists(logPath)) {
      continue;
    }

    const entries = safeReadFile(logPath)
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^[0-9a-f]{40}\s+([0-9a-f]{40})\s+.*\t(.*)$/i);
        if (!match) {
          return null;
        }

        const shortSha = match[1].slice(0, 7);
        const message = match[2]
          .replace(/^(commit|merge|rebase|reset|pull|checkout|clone):\s*/i, "")
          .trim();
        return `${shortSha}\t${message || "(no reflog message)"}`;
      })
      .filter(Boolean);

    if (entries.length) {
      return { mode: "reflog", entries };
    }
  }

  return { mode: "unavailable", entries: [] };
}

function readFallbackTags(gitInfo) {
  if (!gitInfo) {
    return [];
  }

  const tags = new Set();

  function walkTags(currentDir, prefix = "refs/tags") {
    const stats = statSafe(currentDir);
    if (!stats || !stats.isDirectory()) {
      return;
    }

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const nextRef = `${prefix}/${entry.name}`;
      if (entry.isDirectory()) {
        walkTags(fullPath, nextRef);
      } else if (entry.isFile()) {
        tags.add(nextRef.replace(/^refs\/tags\//, ""));
      }
    }
  }

  walkTags(path.join(gitInfo.commonDir, "refs", "tags"));

  for (const refName of readPackedRefs(gitInfo.commonDir).keys()) {
    if (refName.startsWith("refs/tags/")) {
      tags.add(refName.replace(/^refs\/tags\//, ""));
    }
  }

  return Array.from(tags).sort();
}

async function ensureDir(dirPath) {
  await fsp.mkdir(dirPath, { recursive: true });
}

async function listFilesRecursive(rootDir, predicate = () => true) {
  const output = [];

  async function walk(currentDir) {
    let entries = [];
    try {
      entries = await fsp.readdir(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && predicate(fullPath)) {
        output.push(fullPath);
      }
    }
  }

  if (exists(rootDir)) {
    await walk(rootDir);
  }

  output.sort((left, right) => relativeToProject(left).localeCompare(relativeToProject(right)));
  return output;
}

async function collectRelevantFiles() {
  const absolutePaths = [];

  for (const relativePath of EXACT_RELEVANT_FILES) {
    const absolutePath = path.join(projectRoot, relativePath);
    if (exists(absolutePath)) {
      absolutePaths.push(absolutePath);
    }
  }

  const docsFiles = await listFilesRecursive(path.join(projectRoot, "docs"));
  const planningFiles = await listFilesRecursive(path.join(projectRoot, ".planning"));
  const claudeFiles = await listFilesRecursive(
    path.join(projectRoot, ".claude"),
    (filePath) => !relativeToProject(filePath).startsWith(".claude/cache/")
  );
  const codexFiles = await listFilesRecursive(path.join(projectRoot, ".codex"));
  const agentsFiles = await listFilesRecursive(path.join(projectRoot, ".agents"));

  return [...absolutePaths, ...docsFiles, ...planningFiles, ...claudeFiles, ...codexFiles, ...agentsFiles]
    .map((filePath) => relativeToProject(filePath))
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort();
}

function buildFileSnapshot(relativePaths) {
  const snapshot = {};

  for (const relativePath of relativePaths) {
    const absolutePath = path.join(projectRoot, relativePath);
    const stats = statSafe(absolutePath);
    if (!stats || !stats.isFile()) {
      continue;
    }

    snapshot[relativePath] = stats.mtimeMs;
  }

  return snapshot;
}

function snapshotChangedPaths(previousSnapshot, currentSnapshot) {
  const changed = [];
  const allPaths = new Set([
    ...Object.keys(previousSnapshot || {}),
    ...Object.keys(currentSnapshot || {})
  ]);

  for (const relativePath of allPaths) {
    if ((previousSnapshot || {})[relativePath] !== (currentSnapshot || {})[relativePath]) {
      changed.push(relativePath);
    }
  }

  return changed.sort();
}

function stripFrontmatter(text) {
  if (!text.startsWith("---")) {
    return text;
  }

  const lines = text.split(/\r?\n/);
  let endIndex = -1;

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index].trim() === "---") {
      endIndex = index;
      break;
    }
  }

  if (endIndex === -1) {
    return text;
  }

  return lines.slice(endIndex + 1).join("\n");
}

function firstUsefulLine(text) {
  const cleaned = stripFrontmatter(text);
  const lines = cleaned.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (
      line.startsWith("#") ||
      line.startsWith("|") ||
      line.startsWith("```") ||
      line.startsWith(">") ||
      line === "---"
    ) {
      continue;
    }

    return line.length > 220 ? `${line.slice(0, 217)}...` : line;
  }

  return "No plain-text summary line found.";
}

function extractHeadings(text, limit = 6) {
  const headings = [];
  const cleaned = stripFrontmatter(text);
  const lines = cleaned.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line.startsWith("#")) {
      continue;
    }

    const heading = line.replace(/^#+\s*/, "").trim();
    if (!heading) {
      continue;
    }

    headings.push(heading);
    if (headings.length >= limit) {
      break;
    }
  }

  return headings;
}

function summarizeMarkdownFile(filePath) {
  const text = safeReadFile(filePath);
  return {
    path: relativeToProject(filePath),
    summary: firstUsefulLine(text),
    headings: extractHeadings(text)
  };
}

function formatBulletList(items, limit = 12) {
  if (!items.length) {
    return ["- none"];
  }

  const visible = items.slice(0, limit).map((item) => `- ${item}`);
  if (items.length > limit) {
    visible.push(`- ... and ${items.length - limit} more`);
  }
  return visible;
}

function statusLabel(reason) {
  if (reason === "missing") {
    return "project-intake: missing -> generating";
  }
  if (reason === "stale") {
    return "project-intake: stale -> refreshing";
  }
  return "project-intake: current";
}

function parseRelevantDirtyPaths(statusText) {
  if (!statusText) {
    return [];
  }

  const lines = statusText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const relevant = [];

  for (const line of lines) {
    const rawPath = line.slice(3).trim();
    const pathPart = rawPath.includes(" -> ") ? rawPath.split(" -> ").at(-1) : rawPath;
    const normalized = toPosix(pathPart);

    if (
      normalized === "README.md" ||
      normalized === "AGENTS.md" ||
      normalized === "CLAUDE.md" ||
      normalized === ".mcp.json" ||
      normalized.startsWith("docs/") ||
      normalized.startsWith(".planning/") ||
      normalized.startsWith(".claude/") ||
      normalized.startsWith(".codex/") ||
      normalized.startsWith(".agents/")
    ) {
      relevant.push(normalized);
    }
  }

  return Array.from(new Set(relevant)).sort();
}

function collectGuardrails(fileSummaries) {
  const findings = [];
  const seen = new Set();

  for (const filePath of fileSummaries) {
    const text = safeReadFile(path.join(projectRoot, filePath));
    const lines = text.split(/\r?\n/);

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.length < 8) {
        continue;
      }

      if (!GUARDRAIL_PATTERNS.some((pattern) => pattern.test(line))) {
        continue;
      }

      const normalized = line.replace(/\s+/g, " ");
      const key = `${filePath}::${normalized}`;
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      findings.push(`- ${filePath}: ${normalized}`);

      if (findings.length >= 12) {
        return findings;
      }
    }
  }

  return findings.length ? findings : ["- no explicit guardrail lines surfaced from the scanned core docs"];
}

function namesFromPaths(paths, stripSuffix) {
  return paths.map((filePath) => {
    const relativePath = relativeToProject(filePath);
    return stripSuffix ? relativePath.replace(stripSuffix, "") : relativePath;
  });
}

async function buildDigest(statusReason) {
  const generatedAt = nowIso();
  const gitInfo = resolveGitInfo();
  const gitRoot = gitInfo ? gitInfo.gitRoot : "";
  const headSha = gitInfo
    ? (gitInfo.headRef ? readRefSha(gitInfo, gitInfo.headRef) : gitInfo.headText)
    : "";
  const shortSha = headSha ? headSha.slice(0, 7) : "no-git";
  const branch = gitInfo ? gitInfo.branch : "";
  const remoteLine = runGit(["remote", "-v"]).split(/\r?\n/).find(Boolean) || readGitRemote(gitInfo);
  const statusText = runGit(["status", "--porcelain", "--untracked-files=all"]);
  const dirtyRelevantPaths = parseRelevantDirtyPaths(statusText);

  const gitHistoryText = runGit(["log", "--reverse", "--pretty=format:%h\t%s"]);
  const historyFallback = readFallbackHistory(gitInfo);
  const historyMode = gitHistoryText ? "git" : historyFallback.mode;
  const historyLines = gitHistoryText
    ? gitHistoryText.split(/\r?\n/).filter(Boolean)
    : historyFallback.entries;

  const tagText = runGit(["tag", "--sort=creatordate"]);
  const tagLines = tagText ? tagText.split(/\r?\n/).filter(Boolean) : readFallbackTags(gitInfo);

  const docsAndToolingCommits = historyLines.filter((line) =>
    /\b(doc|docs|readme|changelog|plan|planning|claude|codex|skill|hook|agent)\b/i.test(line)
  );

  const docsFiles = await listFilesRecursive(path.join(projectRoot, "docs"), (filePath) => filePath.endsWith(".md"));
  const planningFiles = await listFilesRecursive(path.join(projectRoot, ".planning"), (filePath) => filePath.endsWith(".md"));
  const claudeCommandFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "commands"), (filePath) => filePath.endsWith(".md"));
  const claudeSkillFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "skills"), (filePath) => path.basename(filePath) === "SKILL.md");
  const claudeHookFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "hooks"), (filePath) => filePath.endsWith(".md"));
  const claudeRuleFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "rules"), (filePath) => filePath.endsWith(".md"));
  const claudeScriptFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "scripts"));
  const claudeHelperFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "helpers"));
  const claudeAgentFiles = await listFilesRecursive(path.join(projectRoot, ".claude", "agents"));
  const codexSkillFiles = await listFilesRecursive(path.join(projectRoot, ".codex", "skills"), (filePath) => path.basename(filePath) === "SKILL.md");
  const codexCommandFiles = await listFilesRecursive(path.join(projectRoot, ".codex", "commands"), (filePath) => filePath.endsWith(".md"));
  const codexWorkflowFiles = await listFilesRecursive(
    path.join(projectRoot, ".codex", "get-shit-done", "workflows"),
    (filePath) => filePath.endsWith(".md")
  );
  const codexAgentFiles = await listFilesRecursive(path.join(projectRoot, ".codex", "agents"));
  const repoAgentSkillFiles = await listFilesRecursive(path.join(projectRoot, ".agents", "skills"), (filePath) => path.basename(filePath) === "SKILL.md");

  const existingCoreDocs = CORE_DOC_PRIORITY
    .map((relativePath) => path.join(projectRoot, relativePath))
    .filter((filePath) => exists(filePath));
  const coreDocSummaries = existingCoreDocs.map(summarizeMarkdownFile);

  const planningPriority = [".planning/PROJECT.md", ".planning/STATE.md", ".planning/ROADMAP.md"]
    .map((relativePath) => path.join(projectRoot, relativePath))
    .filter((filePath) => exists(filePath))
    .map(summarizeMarkdownFile);

  const relevantFiles = await collectRelevantFiles();
  const fileSnapshot = buildFileSnapshot(relevantFiles);
  const guardrailLines = collectGuardrails(coreDocSummaries.map((item) => item.path));

  const markdown = [
    "# Project Intake Digest",
    "",
    `Generated: ${generatedAt}`,
    `Status: ${statusReason}`,
    `Project root: ${projectRoot}`,
    `Git root: ${gitRoot || "not detected"}`,
    `Current branch: ${branch || "unknown"}`,
    `Current HEAD: ${shortSha}`,
    "",
    "This digest is a local repo primer generated from git history, core docs, planning state, and installed workflow tooling.",
    "",
    "## Repo Identity",
    "",
    `- directory name: ${path.basename(projectRoot)}`,
    `- project root: ${projectRoot}`,
    `- git root: ${gitRoot || "not detected"}`,
    `- remote: ${remoteLine || "not detected"}`,
    `- relevant dirty paths: ${dirtyRelevantPaths.length ? dirtyRelevantPaths.join(", ") : "none or unavailable"}`,
    "",
    "## History Milestones",
    "",
    `- history source: ${historyMode === "git" ? "git log" : historyMode === "reflog" ? "git reflog fallback" : "unavailable"}`,
    `- scanned history entries: ${historyLines.length}`,
    `- first entry: ${historyLines[0] || "none"}`,
    `- latest entry: ${historyLines.at(-1) || "none"}`,
    `- tags discovered: ${tagLines.length}`,
    "",
    "Recent history entries:",
    ...formatBulletList(historyLines.slice(-12)),
    "",
    "Docs and tooling related history entries:",
    ...formatBulletList(docsAndToolingCommits.slice(-12)),
    "",
    "Tags:",
    ...formatBulletList(tagLines.slice(-12)),
    "",
    "## Core Docs",
    "",
    ...(
      coreDocSummaries.length
        ? coreDocSummaries.flatMap((item) => {
            const lines = [`- ${item.path}: ${item.summary}`];
            if (item.headings.length) {
              lines.push(`  headings: ${item.headings.join(" | ")}`);
            }
            return lines;
          })
        : ["- no core docs from the priority list were found"]
    ),
    "",
    `Additional docs under docs/: ${docsFiles.length}`,
    ...formatBulletList(namesFromPaths(docsFiles, null), 15),
    "",
    "## Planning State",
    "",
    ...(
      planningPriority.length
        ? planningPriority.flatMap((item) => {
            const lines = [`- ${item.path}: ${item.summary}`];
            if (item.headings.length) {
              lines.push(`  headings: ${item.headings.join(" | ")}`);
            }
            return lines;
          })
        : ["- no .planning/PROJECT.md, .planning/STATE.md, or .planning/ROADMAP.md files were found"]
    ),
    "",
    `Additional planning docs under .planning/: ${planningFiles.length}`,
    ...formatBulletList(namesFromPaths(planningFiles, null), 15),
    "",
    "## Installed Tooling",
    "",
    `- .claude commands: ${claudeCommandFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeCommandFiles, ".md"), 15),
    "",
    `- .claude skills: ${claudeSkillFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeSkillFiles, "/SKILL.md"), 15),
    "",
    `- .claude hook docs: ${claudeHookFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeHookFiles, ".md"), 12),
    "",
    `- .claude rules docs: ${claudeRuleFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeRuleFiles, ".md"), 12),
    "",
    `- .claude scripts: ${claudeScriptFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeScriptFiles, null), 12),
    "",
    `- .claude helpers: ${claudeHelperFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeHelperFiles, null), 12),
    "",
    `- .claude agents: ${claudeAgentFiles.length}`,
    ...formatBulletList(namesFromPaths(claudeAgentFiles, null), 12),
    "",
    `- .codex commands: ${codexCommandFiles.length}`,
    ...formatBulletList(namesFromPaths(codexCommandFiles, ".md"), 12),
    "",
    `- .codex skills: ${codexSkillFiles.length}`,
    ...formatBulletList(namesFromPaths(codexSkillFiles, "/SKILL.md"), 15),
    "",
    `- .agents skills: ${repoAgentSkillFiles.length}`,
    ...formatBulletList(namesFromPaths(repoAgentSkillFiles, "/SKILL.md"), 15),
    "",
    `- .codex workflows: ${codexWorkflowFiles.length}`,
    ...formatBulletList(namesFromPaths(codexWorkflowFiles, ".md"), 15),
    "",
    `- .codex agents: ${codexAgentFiles.length}`,
    ...formatBulletList(namesFromPaths(codexAgentFiles, null), 12),
    "",
    `- .mcp.json present: ${exists(path.join(projectRoot, ".mcp.json")) ? "yes" : "no"}`,
    "",
    "## Likely Guardrails And Gotchas",
    "",
    ...guardrailLines,
    "",
    "## Suggested First Reads",
    "",
    ...CORE_DOC_PRIORITY
      .filter((relativePath) => exists(path.join(projectRoot, relativePath)))
      .map((relativePath, index) => `${index + 1}. ${relativePath}`),
    "",
    "## Refresh Rules",
    "",
    "- Refresh this digest when HEAD changes, when core docs or workflow packs change, or when the startup hook reports staleness.",
    "- Read the digest first, then open deeper source material only for the current task."
  ].join("\n");

  const meta = {
    version: 1,
    generatedAt,
    status: statusReason,
    projectRoot,
    gitRoot: gitRoot || null,
    headSha: headSha || null,
    shortSha,
    branch: branch || null,
    remote: remoteLine || null,
    history: {
      mode: historyMode,
      entryCount: historyLines.length,
      firstEntry: historyLines[0] || null,
      latestEntry: historyLines.at(-1) || null,
      tags: tagLines,
      docsAndToolingEntries: docsAndToolingCommits
    },
    coreDocs: coreDocSummaries,
    planningDocs: planningPriority,
    inventory: {
      docsCount: docsFiles.length,
      planningCount: planningFiles.length,
      claudeCommands: claudeCommandFiles.length,
      claudeSkills: claudeSkillFiles.length,
      claudeHooks: claudeHookFiles.length,
      claudeRules: claudeRuleFiles.length,
      claudeScripts: claudeScriptFiles.length,
      claudeHelpers: claudeHelperFiles.length,
      claudeAgents: claudeAgentFiles.length,
      codexCommands: codexCommandFiles.length,
      codexSkills: codexSkillFiles.length,
      repoAgentSkills: repoAgentSkillFiles.length,
      codexWorkflows: codexWorkflowFiles.length,
      codexAgents: codexAgentFiles.length,
      hasMcpJson: exists(path.join(projectRoot, ".mcp.json"))
    },
    dirtyRelevantPaths,
    fileSnapshot
  };

  await ensureDir(cacheDir);
  await fsp.writeFile(digestPath, markdown, "utf8");
  await fsp.writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

  return { shortSha, meta, markdown };
}

async function readExistingMeta() {
  if (!exists(metaPath)) {
    return null;
  }

  try {
    return JSON.parse(await fsp.readFile(metaPath, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const gitInfo = resolveGitInfo();
  const currentHead = gitInfo
    ? (gitInfo.headRef ? readRefSha(gitInfo, gitInfo.headRef) : gitInfo.headText)
    : "";
  const gitRoot = gitInfo ? gitInfo.gitRoot : "";
  const dirtyRelevantPaths = parseRelevantDirtyPaths(runGit(["status", "--porcelain", "--untracked-files=all"]));
  const existingMeta = await readExistingMeta();
  const relevantFiles = await collectRelevantFiles();
  const currentSnapshot = buildFileSnapshot(relevantFiles);
  const snapshotChanges = snapshotChangedPaths(existingMeta ? existingMeta.fileSnapshot : {}, currentSnapshot);

  let reason = "current";
  if (!exists(digestPath) || !existingMeta) {
    reason = "missing";
  } else if (force) {
    reason = "stale";
  } else if ((existingMeta.headSha || "") !== currentHead) {
    reason = "stale";
  } else if (dirtyRelevantPaths.length) {
    reason = "stale";
  } else if (snapshotChanges.length) {
    reason = "stale";
  } else if (gitRoot && existingMeta.gitRoot && existingMeta.gitRoot !== gitRoot) {
    reason = "stale";
  }

  if (reason === "current") {
    const shortSha = currentHead ? currentHead.slice(0, 7) : "no-git";
    console.log(`${statusLabel(reason)} @ ${shortSha}`);
    console.log(`project-intake digest: ${digestPath}`);
    return;
  }

  console.log(statusLabel(reason));
  const result = await buildDigest(reason);
  console.log(`project-intake digest: ${digestPath}`);
  console.log(`project-intake scanned HEAD: ${result.shortSha}`);

  if (!sessionStart) {
    console.log("project-intake refresh complete");
  }
}

main().catch((error) => {
  console.error("project-intake failed");
  console.error(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});
