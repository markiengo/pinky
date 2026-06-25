# Execution Playbook — Autonomous Overnight Build

This is the operating manual for the long-running agent sessions building the AI Exam Prep App. Every session reads this file first, then its phase prompt from `SESSION-PROMPTS.md`.

## Mission

Build the full PRD end-to-end (see `prd.md` + `.planning/REQUIREMENTS.md`) locally, overnight, with minimal human intervention, while maintaining the visual quality bar of `screens/*.html`.

## The Per-Phase Loop (non-negotiable)

Every phase follows this exact loop:

```
1. RESEARCH   → always research first (technical + content). Write findings to .planning/research/<phase>-<topic>.md
2. PLAN       → write a short PLAN.md for the phase (tasks, files, acceptance). Sanity-check it covers the phase's requirements.
3. BUILD      → implement in small commits. Imports at top. UTF-8 everywhere. No placeholder/TODO stubs on the happy path.
4. TEST       → run dev server + any unit tests. Fix at root cause, not symptoms.
5. VERIFY     → computer-vision check: screenshot each new/changed screen, compare to the closest screens/*.html reference. Refine until it meets the bar.
6. COMMIT     → conventional commit. Update .planning/STATE.md with what shipped + anything risky.
```

**Research is mandatory every phase** (user mandate: "always research"). Even if confident, do a quick best-practices check and verify library versions/APIs against current docs — training data drifts.

## Computer-Vision Verification Gate

A screen is NOT done until it has been visually verified:

1. Start the dev server (`npm run dev`).
2. Open the screen in a browser preview / headless screenshot.
3. Capture screenshots at desktop (~1280px) AND mobile (~390px) widths.
4. Compare against the closest reference in `screens/` (e.g. chatbox ↔ `14-chat.html`, dashboard ↔ `17-dashboard.html`, cards ↔ `.ccard` styling).
5. Check: palette correct, fonts correct (Schibsted/Garamond/Jakarta, NOT Angleton), rounded/soft surfaces, KaTeX math renders, no layout breakage, Vietnamese text intact (no mojibake).
6. If it doesn't meet the bar, refine and re-screenshot. Loop until it does.

Record verification (screenshot path + verdict) in the phase PLAN.md or STATE.md.

## Model Rotation

Alternate the two unlimited models per phase to spread load:

| Phase | Model |
|-------|-------|
| 1 Foundation | GLM-4.6 |
| 2 Authentication | Kimi-K2 |
| 3 Content & Matching | GLM-4.6 |
| 4 Chatbox & PDF | Kimi-K2 |
| 5 Quiz | GLM-4.6 |
| 6 History & Dashboard | Kimi-K2 |
| 7 Polish & Verify | GLM-4.6 |

If running parallel sessions in the same wave, give each session a different model where possible.

## Escalation Rule (Opus / GPT)

Stay on GLM/Kimi by default. **Escalate to Opus or GPT only when:**
- The same root-cause bug survives **2 genuine fix attempts** (with research between attempts), OR
- An **architectural decision** has no clear answer after research and would be expensive to reverse, OR
- A security/correctness concern needs a high-confidence second opinion.

When escalating: write a tight problem statement (what was tried, what failed, the exact error, the decision at stake) and ask the premium model as an **advisor** for a recommendation — then return to GLM/Kimi to implement. Log the escalation + outcome in STATE.md.

## Hard Rules

- **UTF-8 / Vietnamese:** never bulk-edit files with PowerShell `Get-Content`/`Set-Content` without explicit UTF-8 — it mangles diacritics. Use editor/write tools or `[IO.File]::WriteAllText(path, text, UTF8)`.
- **No Angleton Script** in shipped output (personal-use-only license). Fall back to EB Garamond italic.
- **Zero paid AI:** no OpenAI/Claude/embedding API calls anywhere in the matching pipeline. The escalation advisor models are for the *developer/agent*, never called from app runtime.
- **Server-enforce all limits** (prompts/words/files/size) — never trust the client.
- **Never send raw PDF text to an instruction-following LLM** (PRD §12). Extraction → normalization → deterministic matching only.
- **Local-first:** no Supabase/cloud dependency for the demo. Keep the Prisma datasource swappable to Postgres via env.
- **Don't weaken/delete tests** to make them pass. Fix the code.
- **Small commits**, conventional messages, update STATE.md after each phase.

## Git Isolation & Branching

Parallel sessions MUST NOT share a branch, or you wake up to merge conflicts instead of PRs.

- `main` stays clean. Each phase runs on its own branch: `overnight/phase-1-foundation`, `overnight/phase-2-auth`, etc.
- A phase branches FROM its dependency's branch (or `main` once the dependency is merged). Per the dependency graph: P2 and P3 branch from P1's merged result; P4 and P5 branch from P3's; P6 from P5's; P7 from P6's.
- Each session commits to its own branch and opens a PR when its phase Definition of Done is met. Do not push directly to `main`.
- The coordinator (or the human in the morning) merges PRs in wave order, resolving conflicts.
- Stagger parallel session starts by 10-30s to avoid simultaneous rate-limit spikes.

## Completion Signals

Every session ends its run by emitting ONE explicit status tag as the last line of its final message, so the coordinator/human knows the state at a glance (no guessing from vibes):

- `COMPLETE` - phase Definition of Done met, branch pushed, PR opened.
- `BLOCKED: <reason>` - a hard external blocker; the most reasonable default was implemented and flagged in STATE.md under "Needs human review".
- `DECIDE: <question>` - a decision only the human can make; session implemented a best-guess default and continued where possible.

Always update `.planning/STATE.md` (phase log + status table) before emitting the signal.

## Kill Switch & Caps

- **Iteration/turn caps:** keep work bounded. If the same root-cause failure survives 2 fix attempts, stop and emit `BLOCKED:` rather than thrashing.
- **Kill switch:** if a file named `.planning/STOP` exists, stop all work immediately and emit `BLOCKED: kill switch`. Check for it at the start of each major step.
- **No runaway scope:** build only the current phase's requirement IDs. Do not start the next phase.

## Coordinator Mode (Devin manages Devins)

If running under a Devin coordinator that can spawn managed Devins:

1. The coordinator reads `ROADMAP.md` + `SESSION-PROMPTS.md` and executes **wave by wave**.
2. Wave 1: spawn ONE managed Devin for Phase 1 on branch `overnight/phase-1-foundation`. Wait for `COMPLETE` + merge to `main`.
3. Wave 2+: spawn the wave's phases as parallel managed Devins, each on its own branch off the latest `main`, each given its phase prompt from `SESSION-PROMPTS.md`. Wait for all to report `COMPLETE`, review/merge their PRs, then proceed to the next wave.
4. On any `BLOCKED:`/`DECIDE:` from a child, the coordinator either resolves it (if within the locked decisions in PROJECT.md) or surfaces it to the human and continues other work.
5. The coordinator compiles a final `SUMMARY.md` in `.planning/` listing each phase's PR, status, and any human-review items.

## Definition of Done (per phase)

- All the phase's requirement IDs (see ROADMAP traceability) implemented.
- Dev server runs clean; unit tests (if any) pass.
- Visual verification gate passed (screenshots compared to reference).
- STATE.md updated; committed.

## Definition of Done (project / PRD §25)

- Log in (username/password) → chatbox prompt → upload up to 3 PDFs → ≥3 relevant đề cards → start + complete a quiz → MCQ feedback + essay reveal work → score saved to history → dashboard shows score trend + subject bar chart → no crash on happy path → zero paid AI.

## When Blocked (and can't escalate productively)

If a hard external blocker appears (e.g. a missing decision only the human can make), DO NOT stall silently:
1. Implement the most reasonable default that keeps the app runnable.
2. Clearly flag it in STATE.md under "Needs human review" with the question + your assumption.
3. Continue with the rest of the phase.

---
*Read this before every session. Phase prompts: `SESSION-PROMPTS.md`.*
