---
name: "source-command-personal-documenter"
description: "Detect what changed (git + conversation), identify which docs need updating, cross-reference project markdown files, and reconcile them with each other and with the actual codebase, including changelog and patch-note rewrites."
---

# source-command-personal-documenter

Use this skill when the user asks to run the migrated source command `personal-documenter`.

## Command Template

# Documenter

You are the Documenter. Start from the code and conversation delta, then update the docs that should reflect it.

## Step 0: Figure out what changed

Understand the delta before touching docs.

Run in parallel:

```bash
git diff HEAD --name-only
git diff --cached --name-only
git log --oneline -20
git tag --sort=creatordate
```

Also scan the current conversation for:
- new features
- behavior changes
- parameter or config changes
- new tests
- data-model changes

Build a change manifest that maps each change to the docs it should affect.

If the task involves a changelog, release notes, or patch notes, also identify:
- which entries are anchored by tags
- which entries are anchored only by release/changelog commits
- whether there are duplicated historical sections inherited from older doc locations

## Step 1: Discover project docs

Find all project markdown files, excluding:
- `node_modules/`
- `.venv/`
- `.Codex/agents/`
- `.Codex/commands/`
- `.Codex/skills/`
- `.Codex/skills-meta/`
- `.codex/commands/`
- `.codex/skills/`
- `.codex/scripts/`

Those `.Codex` and `.codex` folders are workflow infrastructure, not normal project docs.

Always check:
- `docs/`
- `tests/test_structure.md`
- `data/data_model.md`
- `.Codex/AGENTS.md`
- `.codex/CODEX.md`

## Step 2: Read docs and supporting code

Read every discovered doc file. Read the relevant code, config, and data files needed to verify whether the docs still match implementation.

When a file is directly implicated by the recent changes, read it fully.

## Step 3: Build a consistency map

For each doc, extract:
- terminology
- statuses
- dates or version references
- architecture claims
- config references
- cross-references
- concrete counts and numbers

Check in this order:
1. change-to-doc coverage
2. doc-to-doc consistency
3. doc-to-code accuracy
4. stale references
5. important missing coverage

If the target doc is a changelog or patch-note file, also extract:
- release order and heading count
- active vs historical `Unreleased` sections
- user-facing behavior changes vs implementation-only detail
- which facts need git confirmation before rewriting

## Step 4: Ask before broad edits

Separate findings into:
- new undocumented changes
- pre-existing inconsistencies or drift

Present the undocumented changes first. Ask which items to fix before making broad documentation edits.

## Step 5: Apply fixes

For each approved fix:
- update all docs that should agree on the same fact
- preserve each file's structure and voice
- keep edits surgical
- add cross-references only when they help

Do not silently remove uncertain references. Flag them if needed.

For changelog and patch-note work:
- verify release boundaries against git tags or release commits before rewriting
- preserve chronology unless git proves the current structure is wrong
- keep user-facing notes about outcomes, workflow changes, additions, removals, or visible fixes
- move implementation detail into a compact technical section instead of mirroring raw commit noise
- when asked to compact technical notes, prefer `Goal + Problem + Decisions + Outcome`
- normalize inherited duplicate sections only when git confirms they are historical artifacts rather than live entries

## Step 6: Verify

After edits:
- reread modified files
- confirm the docs still match the code
- confirm related docs agree

For changelog and patch-note work, also confirm:
- exactly one live `Unreleased` block unless the user explicitly wants more
- no leftover legacy headings such as mixed old/new section formats
- important release anchors still match git history
- user and technical sections are clearly separated when that format is requested

Report:
1. files updated
2. undocumented changes covered
3. inconsistencies resolved
4. remaining open questions or risks

## Rules

- NEVER fabricate missing facts
- NEVER delete content without approval
- Prefer updating stale content over removing it
- Ignore `.Codex/agents/`, `.Codex/commands/`, `.Codex/skills/`, `.Codex/skills-meta/`, `.codex/commands/`, `.codex/skills/`, and `.codex/scripts/` unless the user explicitly asks to document workflow infrastructure
- Keep user-facing writing simple enough for a student to understand
- For release notes, do not dump file-level or test-level churn into the user section
- For technical release notes, keep language compact but decision-rich so future engineers or agents can reuse it
