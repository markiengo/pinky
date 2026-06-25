---
name: "source-command-personal-commiter"
description: "Review a dirty git worktree, separate pushable from local-only changes, and group related edits into commit-sized batches before staging or committing. Use when Codex needs to propose commit boundaries, staging batches, commit messages, or pushable file scope for mixed or cross-cutting changes."
---

# source-command-personal-commiter

Use this skill when the user asks to run the migrated source command `personal-commiter`.

## Command Template

# Commiter

Review the full worktree and turn it into a clean commit plan before staging.

## Workflow

1. Run `git status --short`
2. Inspect the full worktree. Use `git diff --stat`, `git diff --name-status`, focused diffs, and recent history as needed.
3. Separate changes into:
   - pushable work
   - local-only or private work
   - outliers that should stay unstaged
4. Group pushable work into coherent commit-sized batches. Prefer grouping by product outcome or deployable intent, not by directory alone.
5. For each proposed commit, note:
   - a short commit message candidate
   - the files that belong together
   - what the work was trying to achieve
   - any file that needs partial staging
6. If the grouping is nontrivial, show the plan to the user before staging anything.
7. After the user approves, stage one commit group at a time.
8. If the user wants to continue through commit execution, keep commit boundaries clean and remind them about any local-only files being left behind.

## Output

Use this shape unless the user asks for something else:

`commit -> what files -> what the notes are`

Keep the plan concise. Call out:
- files that should not be staged
- files that mix concerns and may need partial staging
- docs or generated artifacts that belong with another commit

## Guardrails

- Never revert or discard unrelated work.
- Never auto-stage everything unless the user explicitly wants a single commit and the worktree is actually coherent.
- Do not hide uncertainty. If two groupings are both reasonable, say so and recommend one.
- Prefer fewer coherent commits over overly fragmented micro-commits.
- Treat `README.md`, changelogs, docs, generated files, and config as followers. Attach them to the product change they explain or enable.
- Before an actual commit or push flow, use `git-why save` when there is meaningful pushable work and the user wants to preserve session context.
