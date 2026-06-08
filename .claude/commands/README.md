# Commands

Command docs are explicit workflow guides.

Use a command when you want the agent to enter a deliberate mode such as:
- project intake
- code review
- release prep
- documentation sync
- session closeout

Do not use commands for always-on rules. Those belong in `CLAUDE.md`.

Do not use commands for automatic lifecycle behavior. That belongs in hooks.

Do not use commands for reusable capability packs with stable inputs and outputs. Those belong in skills.

## Starter Command Set

This template ships one starter command:
- `project_intake`

That command exists because repo understanding is too important to leave implicit.

## Good Command Traits

A good command:
- is opt-in
- has a clear start and finish
- has a predictable output
- is tied to a real repeated workflow
- can be explained in one sentence

## Promotion Rule

Add a new command after you catch yourself typing the same workflow guidance 2-3 times in real repos.

## Naming

- use lowercase with underscores if the command reads like an action: `project_intake`, `session_end`
- keep the name short enough to invoke naturally
- avoid names tied to one temporary phase or branch
