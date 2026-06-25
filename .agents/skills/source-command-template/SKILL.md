---
name: "source-command-template"
description: "One sentence describing the workflow and its output."
---

# source-command-template

Use this skill when the user asks to run the migrated source command `_template`.

## Command Template

# <Command Name>

## Use When

- `<trigger 1>`
- `<trigger 2>`
- `<trigger 3>`

## Inputs

- required:
  `<what the agent must know before starting>`
- optional:
  `<flags, scope, paths, branch names, issue numbers>`

## Scope

State what this command is allowed to touch and what it should avoid.

Example:
- touch code under `src/auth/` and related tests
- do not edit deployment files unless the user explicitly asked

## Steps

1. `<step 1>`
2. `<step 2>`
3. `<step 3>`

## Output

State the expected deliverable clearly:
- a patch
- a review report
- a release checklist
- an updated digest

## Ask Before

List the points where the command should stop and ask:
- destructive cleanup
- dependency installation
- production config changes
- broad documentation rewrites

## Do Not Do

- `<forbidden action 1>`
- `<forbidden action 2>`
