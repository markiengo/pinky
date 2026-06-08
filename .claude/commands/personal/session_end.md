# Session End: Real Closeout Checklist

Use this at the end of every coding session.
Keep user-facing writing simple enough for a student to understand.

## 1) Review the session
- Run `git status`.
- Review the full worktree, not just the files touched most recently.
- Separate changes into:
  - pushable work
  - local-only work
- If commit grouping or staging help is needed, use `$commiter`.

## 2) Update the right docs

Run the personal `documenter` workflow — it handles the full markdown sweep, cross-references all docs against each other and the codebase, and asks before making changes.

## 3) Run checks
- Run the smallest useful test set for what changed.
- Do not run full nightly sweeps as part of normal closeout.

### Backend changes
- Narrow fix: run the closest backend test file.
- Broad change or pre-push confidence: run the full test suite.

### Frontend changes
- Narrow UI change: run the closest frontend test file.
- Broad change or pre-push: run lint + build + tests.

### Workflow changes
- Read the workflow file carefully for obvious mistakes before pushing.

## 4) Keep the push clean
- Do not push local/private files such as:
  - `.env`
  - `.venv/`
  - `node_modules/`
  - build output dirs
- Do not commit secrets or `.env` values.

## 5) Commit
- If the worktree needs commit batching help before staging, use `$commiter`.
- Commit locally before pushing.
- Commit message rules:
  - 5 to 8 words
  - easy for a normal user to understand
  - verb + outcome format

Examples:
- `Fix planner standing recovery gap`
- `Add nightly dead-end workflow`
- `Improve onboarding course entry flow`

## 6) Push
- Push pushable work to the remote.
- Leave local-only files behind.

## 7) Refresh release notes after push
- Keep release notes short (3 to 7 bullets).
- Write so a non-technical user could understand it.
- Skip deep technical detail.
- Replace the most recent release notes, don't add a new release unless explicitly asked.

Good release note format:
- Added: user-facing feature
- Fixed: user-facing bug
- Improved: user-facing improvement
- Note: anything users should know

## 8) Final handoff to the user
- Say:
  - what changed
  - what you tested
  - what you did not test
  - any follow-up work or risk
- Keep it short and concrete.
