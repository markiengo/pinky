# Skills

Skills are reusable capability packs.

Use a skill when the workflow has:
- stable inputs
- repeatable steps
- a predictable output
- value across more than one session or task

## When Not To Use A Skill

Do not add a skill when the guidance is really one of these:
- always-on repo context -> put it in `CLAUDE.md`
- an explicit opt-in workflow -> put it in `.claude/commands/`
- a lifecycle automation -> put it in hooks
- a path-specific warning -> put it in nested rules

## Promotion Rule

Promote a repeated behavior into a skill after the third clear repeat.

Examples:
- good skill:
  "audit recommendation-engine changes for contract drift and ranking regressions"
- bad skill:
  "remember that tests live in `tests/`"

## Suggested Skill Structure

Keep each skill concrete:
- when to use it
- required inputs
- exact steps
- expected output
- escalation conditions
- non-goals

## Folder Convention

This template uses folder-per-skill:

```text
.claude/skills/<skill-name>/SKILL.md
```

That keeps each skill portable and leaves room for examples or helper assets later.
