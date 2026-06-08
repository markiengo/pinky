# Rules

Keep root `CLAUDE.md` broad.

Split guidance closer to the code only when one area has rules that would otherwise clutter the root file.

## Good Reasons To Add Nested Rules

- one directory has generated files
- one subsystem has dangerous scripts or deploy behavior
- one area uses a very different stack or test strategy
- one path has special review or migration rules

## Good Candidates

- `frontend/`
  UI patterns, browser test commands, asset rules
- `backend/`
  API contracts, migrations, performance hotspots
- `data/`
  manual-only files, provenance rules, validation commands
- `infra/`
  deploy safety, environment coupling, rollback notes

## What To Put In Nested Rules

Keep them specific:
- ownership or purpose of the directory
- exact test commands for that area
- generated-file warnings
- dangerous operations to avoid
- contract or schema notes

## What Not To Put In Nested Rules

- personal preferences
- repeated copies of the root guide
- vague style advice with no path-specific value
