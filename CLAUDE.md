# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A RuFlo V3 template workspace that currently hosts **one active project: "Connect to Heal"** — a static HTML/CSS/JS design-spec prototype for an anonymous peer-support mental-health web app for students. It lives entirely under `screens/`. There is no framework, build step, or backend — just `.html` screens sharing `screens/screens.css` + `screens/angleton.css`.

> ### ⚠️ READ THIS FIRST when working on Connect to Heal
> **`design/00-logs.md` is the canonical source of truth (the "design checkpoint").** Before editing, adding, or reviewing any screen, read it in full — it holds the file map/routes, color pools + collision rule, the 4-font system, shape/spacing, the full component inventory, motion conventions, copy tone, and the localStorage `cth` contract. Every value in a screen must come from there, and the checkpoint must be updated after any design change (keep its "Last updated" date + version current). When it conflicts with the repo `DESIGN.md`, the checkpoint wins.
>
> Two hard rules that bite repeatedly (see also memory + checkpoint §8.9 / §3.4):
> - **Encoding**: never bulk-edit the screen files with PowerShell `Get-Content`/`Set-Content` (no explicit encoding) — it mangles em-dashes → `â€"` and emoji → `ðŸ¦Œ`. Use the Write/Edit tools, `[IO.File]::WriteAllText(..., UTF8)`, or `sed` via Bash.
> - **Angleton Script** font is PERSONAL-USE-ONLY licensed — a commercial license is required before any public/competition build; until then it degrades to EB Garamond italic.

**Platform**: Windows 11, PowerShell. Use PowerShell syntax in Bash commands.

## Behavioral Rules

- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary
- ALWAYS prefer editing an existing file to creating a new one
- NEVER save working files or tests to the root folder
- ALWAYS read a file before editing it
- After spawning a swarm, STOP — do not poll or check status; wait for results

## Build & Test

No `package.json` exists yet. Add these scripts once source code is present:

```bash
npm run build   # build
npm test        # run all tests
npm run lint    # lint
```

## Repo Structure

```
.claude/          # Claude Code config: settings, hooks, helpers, agents, commands, skills
  helpers/        # Runtime scripts — hook-handler.cjs, auto-memory-hook.mjs, statusline.cjs
  agents/         # Agent definitions (34)
  commands/       # Slash commands (14)
  skills/         # Skills (37)
design/           # Design docs: checkpoint, personas, user stories, roadmap, etc.
screens/          # All HTML screens + shared CSS (screens.css, angleton.css)
index.html        # GitHub Pages entry point — links to all screens
AGENTS.md         # Agent read-order and intake rules — read before starting implementation
CLAUDE.md         # This file
```

## Hook System

Hooks run automatically via `.claude/helpers/hook-handler.cjs`:

| Event | Handler arg | What it does |
|-------|-------------|--------------|
| PreToolUse Bash | `pre-bash` | Route/validate bash calls |
| PreToolUse Write/Edit | `pre-edit` | Pre-edit checks |
| PostToolUse Write/Edit | `post-edit` | Post-edit learning |
| PostToolUse Bash | `post-bash` | Post-bash metrics |
| UserPromptSubmit | `route` | Prompt routing + intelligence |
| SessionStart | `session-restore` | Restore session state |
| SessionEnd / Stop | `session-end` / `sync` | Persist state; sync memories |
| SubagentStop | `post-task` | Checkpoint after each agent |

Auto-memory (`auto-memory-hook.mjs`) imports MEMORY.md files into AgentDB on session start and syncs on stop.

## Agent Model Routing

| Tier | Handler | Use Cases |
|------|---------|-----------|
| 1 | Edit tool directly | Simple transforms — no LLM needed |
| 2 | Haiku | Simple tasks (<30% complexity) |
| 3 | Sonnet/Opus | Complex reasoning, architecture, security |
