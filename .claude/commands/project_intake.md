---
name: project_intake
description: Build or refresh the repo primer from git history, docs, planning state, and installed workflow tooling.
---

# Project Intake

This command exists to make repo understanding explicit and verifiable.

## Use When

- first session in a newly opened repo
- after a large branch merge or rebase
- after major doc, planning, or tooling changes
- when the startup hook reports a missing or stale intake digest

## Inputs

- required:
  the repo root
- optional:
  `--force` to rebuild even if the digest looks current

## Scope

The command is allowed to:
- scan git history
- read docs and planning files
- inventory installed workflow packs under `.claude/`, `.codex/`, and `.mcp.json`
- write only to `.claude/cache/project-intake.md` and `.claude/cache/project-intake.json`

The command should not:
- change source code
- install dependencies
- mutate project docs
- rewrite settings outside the intake cache

## Steps

1. Check whether the intake cache exists and whether it is stale.
2. If missing or stale, rebuild the digest by scanning:
   - commit subject history
   - tags and releases
   - core docs
   - planning docs
   - installed commands, skills, helper packs, and agent tooling
3. Read the digest before planning implementation work.
4. Open the specific docs or workflow files relevant to the user request.

## Expected Output

The digest should answer:
- what this repo is
- how it evolved
- which docs matter first
- which workflow systems are installed
- what likely guardrails or sharp edges exist
- what the agent should read next for deeper work

## Ask Before

This command normally should not ask.

Ask only if:
- git is unavailable and the repo identity is ambiguous
- the repo is so large that the startup timeout must be increased
- a custom scan path or exclusion is required

## Do Not Do

- do not claim the repo was scanned unless the digest was actually refreshed or confirmed current
- do not dump the entire history into the user-facing response
- do not read every agent prompt file in full unless the current task needs them
