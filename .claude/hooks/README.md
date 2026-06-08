# Hooks

Hooks are for lightweight lifecycle automation.

This template intentionally ships only one default automation idea:
- `SessionStart -> project-intake`

That default is useful because it verifies repo context before work starts.

## Rules For Good Hooks

- keep them fast
- keep them deterministic
- keep them local
- fail soft
- print short useful notifications

## What Hooks Should Do Well

- check whether generated context is missing or stale
- refresh a local digest
- surface a short startup status line
- enforce simple non-destructive guardrails

## What Hooks Should Not Do By Default

- install dependencies
- mutate source files
- run broad test suites
- call remote APIs
- trigger deploys
- silently make opinionated changes

## Example SessionStart Hook

The shared settings file points to:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/scripts/project-intake.mjs\" --session-start",
            "timeout": 20000
          }
        ]
      }
    ]
  }
}
```

That hook only writes to `.claude/cache/` and prints whether the repo primer is current.
