# Agent Guide

This file is the neutral entrypoint for any coding agent working in this repo.

## Read Order

Use this order unless the user tells you otherwise:

1. `CLAUDE.md`
2. `.claude/cache/project-intake.md` if it exists
3. the specific docs, commands, skills, or nested rules relevant to the current task

## Mandatory Repo Intake

If this is the first session in the repo, or if the intake cache is stale, do not start implementation yet.

A valid intake means:
- the repo git history has been scanned
- core docs have been inventoried and summarized
- planning state has been inventoried when `.planning/` exists
- installed workflow packs under `.claude/`, `.codex/`, `.agents/`, and `.mcp.json` have been inventoried when present
- `.claude/cache/project-intake.md` matches the current repo state closely enough to trust

The shared startup hook should perform this automatically. If it did not, run the project-intake command or script manually.

## How To Use The Intake Digest

Treat `.claude/cache/project-intake.md` as the repo primer, not as a substitute for all raw docs.

Use it to answer:
- what this repo is
- how it evolved
- which docs matter first
- which workflow packs are installed
- where likely guardrails and sharp edges live

Then decide what to read in full for the actual task.

## Read Raw Files Only When Needed

Do not load every agent pack or every markdown file in full by default.

Read more source material when:
- the task touches a specific subsystem
- the digest calls out a sharp edge or unresolved risk
- a command or skill is directly relevant to the requested work
- the user wants a review, migration, or high-confidence architectural answer

## Preferred Working Order

1. Confirm intake is current.
2. Read the narrowest relevant files.
3. Plan the change.
4. Make the change.
5. Run the smallest relevant verification.
6. Report what changed, what was tested, and what remains risky.

## Shared Vs Local

Shared files belong in repo history:
- `AGENTS.md`
- `CLAUDE.md`
- `.claude/settings.json`
- `.claude/commands/`
- `.claude/skills/`
- `.claude/hooks/`
- `.claude/rules/`
- `.agents/skills/` (repo-local Codex skills such as `$gsd`)
- `.codex/` (Codex agent config, GSD workflows, and shared skills)

Local files stay private:
- `CLAUDE.local.md`
- `.claude/settings.local.json`
- `.claude/cache/`
- `.mcp.json`

## Biases This Template Intentionally Adds

- read before editing
- prefer real repo commands over guessed commands
- prefer a generated repo primer over hand-wavy "I scanned the repo"
- keep default automation light and deterministic
- separate shared guidance from personal local preferences

## Working methodology — questioning and execution protocol

### 1. Context first

Read existing files, research external references (e.g. FotMob), understand existing patterns before asking anything. Never ask a question answerable by reading the codebase.

### 2. Targeted questioning

Use `ask_user_question` with 2-4 concrete predefined options for every design decision. Never open-ended. Cover in order: scope, features/data, visual treatment, layout, sizing, interaction, formatting, backend needs. Aim for 8-15 questions on moderate features. When the user says "ask like 20 more questions," they mean it — err toward more.

### 3. Plan

Write a concise scannable plan (tables, bullets) to the Windsurf plans directory. Wait for confirmation.

### 4. Execute

Immediately after confirmation. Use `todo_list`. Batch independent edits in parallel. Fix bugs without asking — root cause, patch, verify with dev server + browser preview.

### 5. Bug fixing

Read the failing module, fix at root, add mock fallbacks for new API methods, verify by running the server.

