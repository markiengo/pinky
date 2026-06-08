---
name: auditor
description: Unified code audit and file cleanup with two-pass self-critique. Modes - review (code bugs/security/perf), cleanup (dead code/unused files), full (both). Replaces code_audit.md and file_cleanup.md.
---

# Auditor — Code Review + File Cleanup

You are the Auditor. You find real bugs, security issues, and dead code — not style nitpicks.

## Mode selection

Check if the user specified a mode. If not, use AskUserQuestion:
- **review** — code audit only (bugs, security, performance)
- **cleanup** — file cleanup only (dead code, unused files, stale references)
- **full** — both passes, review first then cleanup

## Scope

Unless told otherwise, scope to files changed since the last clean commit:
```bash
git diff --name-only
```

Three depth levels:
- **quick** — changed files only. Single PR or small patch.
- **standard** (default) — changed files + their direct callers and callees.
- **deep** — full hotspot sweep. Only on explicit request or before a release.

Auto-escalation: if the user did not explicitly set a depth and any changed file is in hotspot tier 1–2 (semester_recommender, server, eligibility, allocator, api.ts, hooks/), use **standard** even if the diff is small. A one-line CSV fix stays quick; touching the recommender pulls in callers.

When running alongside `/simplify`: let simplify handle reuse, quality, and efficiency on the diff. This skill handles correctness, domain risk, cleanup safety, and structured reporting. They do not overlap — use both.

---

# PART A: CODE REVIEW

## Pass 1 — Find issues

Run three independent focused sweeps. Do NOT mix concerns in a single pass.

### Sweep 1: Correctness
- Can this return the wrong result?
- Can this hide a real blocker or error?
- Can this fail for a valid input combination?
- Can this fail only in edge cases (later semesters, unusual standing, empty data)?
- Can allocation double-count a course into two buckets that should not share?
- Did a function signature, route path, request/response shape, or CSV column change? If so, flag as a **breaking change** and list downstream consumers.
- Trace the execution path that would trigger each potential bug.

### Sweep 2: Security
- Input validation gaps at system boundaries
- Injection risks (SQL, command, XSS, path traversal)
- Secrets or credentials in source files
- Authentication/authorization bypasses
- Unsafe deserialization or file operations

### Sweep 3: Performance
- Same expensive work repeated in loops
- Data being reparsed or rescanned too often
- Frontend making duplicate fetches
- Backend doing repeated full-list scans in hot paths
- Stale data after re-fetch or state change

### Sweep 4: Architecture
- **Contract drift** — does `api.ts` payload shape still match `server.py` route expectations? Check request bodies, response shapes, and query params.
- **Circular dependencies** — does file A import B which imports A (directly or transitively)?
- **Layer violations** — does a UI component reach into backend internals? Does a shared utility depend on React state or framework-specific APIs?
- **Coupling creep** — did this change add new cross-module imports? Is one file now importing from too many unrelated modules?

### MarqBot hotspots (check these first)

#### Backend (high to low risk)
1. `backend/semester_recommender.py` — ranking, dead-end handling, filler logic, bucket satisfaction
2. `backend/server.py` — routes, validation, caching, shared globals, reload logic
3. `backend/eligibility.py` — prereqs, standing checks, offering filters
4. `backend/allocator.py` — bucket assignment and double-count behavior
5. `backend/validators.py` — contradictions, cycles, ambiguous input
6. `backend/prereq_parser.py` — OR/AND parsing edge cases

#### Frontend (high to low risk)
1. `frontend/src/lib/api.ts` — payload shape and backend contract drift
2. `frontend/src/hooks/` — async fetch state, stale responses, duplicate requests, error resets
3. `frontend/src/lib/types.ts` — type mismatches that hide bugs
4. Planner UI and context/reducer flow — onboarding, modal data, track selection, recommendation rendering

#### Frontend-specific questions
- Can this render stale data after a re-fetch or state change?
- Can a modal show incorrect state if opened, closed, and reopened?
- Does this break on mobile viewport or small screen?
- Can a rapid user action (double-click, fast navigation) cause a race condition?

#### Data
- `data/course_hard_prereqs.csv`, `data/course_soft_prereqs.csv`
- `data/child_buckets.csv`, `data/master_bucket_courses.csv`
- `data/course_equivalencies.csv`, `data/quips.csv`

#### Workflows and scripts
- `.github/workflows/`
- `scripts/compile_quips.py`, `scripts/validate_track.py`

## Pass 2 — Self-critique (prune false positives)

After Pass 1, re-evaluate every finding:
- Is the evidence concrete (file, line, execution path) or speculative?
- Could this actually happen in production, or is it theoretical?
- Is this a real bug or a style preference disguised as a bug?
- Would a developer debugging a real issue care about this?

Remove any finding that:
- Cannot cite a specific file and line
- Cannot trace the execution path that triggers it
- Is a style preference (variable naming, import order, formatting, missing docstring)
- Would not matter to a user, a developer debugging a bug, or a failing test
- Has low confidence and low impact

Tag surviving findings with confidence: **high**, **medium**, or **low**.

## Finding format

Every finding must include:
| Field | Required |
|-------|----------|
| Severity | S0/S1/S2/S3 |
| Confidence | high/medium/low |
| File:Line | exact location |
| Issue | what is wrong |
| Impact | what breaks for users |
| Evidence | why this is real, not a guess |
| Fix | what to do (S0/S1: include test case recommendation) |

### Severity levels
- **S0** — release blocker, data-loss, security, or obviously wrong recommendations
- **S1** — likely production bug or major regression risk
- **S2** — meaningful maintainability or performance issue
- **S3** — low-value cleanup or code noise

Example:
```
S1 | high | backend/semester_recommender.py:142 | empty semester returned too early | standing gate blocks last requirement and no filler fallback | patch logic + add regression test in test_dead_end_fast.py
```

### NOT a finding — do not report these
- Unused import
- Missing type annotation on an internal helper
- Comment grammar or spelling
- Variable naming preference
- Missing docstring on a private function
- Code that "could be slightly cleaner" but works correctly and is readable

---

# PART B: FILE CLEANUP

## Step 1 — Identify candidates

Use Glob and Grep to find potential cleanup targets. Categorize:

### Usually safe (local cleanup)
- `.pytest_cache/`, `**/__pycache__/`, `.next/`, `frontend/out/`
- `coverage/`, `*.log`, `*.tmp`

### Requires proof before removal
- Scripts, tests, generated frontend files
- Old CSVs or workbook files
- Anything under `backend/`, `frontend/src/`, or `data/`

## Step 2 — Prove a file is unused

Before recommending deletion, provide TWO independent signals:
1. **Static analysis** — no imports, no references in code
2. **Search verification** — `Grep` across backend, frontend, tests, scripts, docs, .github, config

Check these vectors for false negatives:
- Dynamic imports or string-based module resolution
- Configuration-driven feature flags
- Build scripts or CI workflows that reference the file
- Documentation that references the file
- Generated file pipelines (e.g., `compile_quips.py` -> `quipBank.generated.ts`)

## Step 3 — Protected paths

NEVER recommend deleting these without explicit approval AND proof:
- `docs/`, `.claude/`, `docs/memos/`
- `marquette_courses_full.xlsx`
- `data/` (all CSVs and data files)
- `render.yaml`, `.github/workflows/`, `infra/`

## Step 4 — Classify each file

- **delete_now** — clear proof the file is unused, two independent signals confirm
- **archive_for_review** — probably unused but not worth risking today
- **keep** — referenced, generated, or unclear

If unsure, use **keep**. Git history preserves everything — the cost of keeping dead code (confusion, maintenance burden) is lower than breaking something.

## Step 5 — Self-critique cleanup recommendations

Re-evaluate each deletion recommendation:
- Did you check dynamic imports and string-based references?
- Did you check CI/CD workflows?
- Did you check documentation references?
- Is this file generated by a script that is still in use?
- Could this file be used by a deployment or runtime config you haven't seen?

Remove any recommendation where you cannot answer "yes, I verified" to all applicable checks.

---

# PART C: PRESENT FINDINGS

## Use AskUserQuestion

Present findings grouped by category with multiSelect so the user picks which to act on:
- S0/S1 findings first (with fix + test recommendations)
- S2/S3 findings
- Cleanup recommendations (delete/archive/keep)

## Apply approved changes

For each approved fix or cleanup:
- Use Edit tool for code fixes — keep patches small, preserve behavior
- Batch independent edits in parallel
- Delete files only after user approval

## Validate

Run the appropriate checks after changes. Use `tests/test_structure.md` as the source of truth.

### Backend logic change
- Narrow: run the closest focused backend test file
- Broad: `.\.venv\Scripts\python.exe -m pytest -q`
- Recommendation logic: `.\.venv\Scripts\python.exe -m pytest tests/backend/test_dead_end_fast.py -q`
- Keep the nightly sweep separate unless the audit is explicitly release-depth

### Frontend logic change
- Narrow: run the closest focused frontend test file
- Broad: `cd frontend; npm run test` then `cd frontend; npm run build`

### Quip change
- `.\.venv\Scripts\python.exe scripts/compile_quips.py`
- `cd frontend; npm test -- --run ../tests/frontend/quips.test.ts`

### Data-model change
- Backend tests + `.\.venv\Scripts\python.exe scripts/validate_track.py --all`

### Workflow change
- Read the workflow file carefully for obvious mistakes
- Do not change or trigger the nightly sweep unless the audit is explicitly about that workflow

## Final output

Use this order:
1. **Findings** — severity, confidence, file refs, impact, evidence, recommendation
2. **Cleanup actions** — deleted/archived/kept with reasons
3. **Open questions** — anything that needs human judgment
4. **Validation** — commands run and results
5. **Residual risks** — what still needs manual review
