# Session Prompts — Copy-Paste for Overnight Sessions

Paste one block per agent session (Devin Cloud / Devin CLI / Cascade). Each prompt is self-contained but assumes the agent can read the repo. **Run Phase 1 first and let it commit before starting Wave 2.**

Every prompt assumes the agent will: read `.planning/EXECUTION-PLAYBOOK.md`, `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, `.planning/DESIGN-TOKENS.md`, and `prd.md` before coding.

**Global rules baked into every session:** work on the phase's own branch (`overnight/phase-N-...`), open a PR when done (never push to `main`), end with a completion signal (`COMPLETE` / `BLOCKED: <reason>` / `DECIDE: <question>`), and stop immediately if `.planning/STOP` exists.

---

## Coordinator Master Prompt (Devin Cloud — "manage Devins")

> Paste this ONE prompt into a Devin Cloud session connected to `github.com/markiengo/pinky-connect`. It makes that Devin the coordinator that spawns the phase sessions for you.

```
You are the COORDINATOR for building the "AI Exam Prep App" in the repo github.com/markiengo/pinky-connect (branch main). You can spin up and manage parallel managed Devins.

First, read these files in the repo: .planning/EXECUTION-PLAYBOOK.md, .planning/PROJECT.md, .planning/ROADMAP.md, .planning/REQUIREMENTS.md, .planning/DESIGN-TOKENS.md, .planning/SESSION-PROMPTS.md, and prd.md. prd.md + the .planning docs are the source of truth.

Execute the roadmap WAVE BY WAVE, respecting the dependency graph in ROADMAP.md:
- Wave 1: spawn ONE managed Devin for Phase 1 (Foundation) on branch overnight/phase-1-foundation, using the Phase 1 prompt from SESSION-PROMPTS.md. Wait for it to report COMPLETE and open a PR. Review and merge that PR to main.
- Wave 2: from updated main, spawn TWO managed Devins in parallel — Phase 2 (Auth) on overnight/phase-2-auth and Phase 3 (Content & Matching) on overnight/phase-3-content — each with its phase prompt. Stagger their starts ~20s. Wait for both COMPLETE, then review and merge both PRs.
- Wave 3: from updated main, spawn Phase 4 (Chatbox & PDF) and Phase 5 (Quiz) in parallel on their own branches. Wait, review, merge.
- Wave 4: spawn Phase 6 (History & Dashboard). Wait, review, merge.
- Wave 5: spawn Phase 7 (Polish & Visual Verification). Wait, review, merge.

Rules:
- Each child must follow EXECUTION-PLAYBOOK.md: research first, build, test, computer-vision visual verification against screens/*.html, commit small, update .planning/STATE.md, end with a completion signal.
- Each child works ONLY on its own branch and opens a PR; never push to main directly.
- If a child reports BLOCKED or DECIDE: if the answer is already settled in PROJECT.md's locked decisions, instruct the child and continue; otherwise record it and message me, but keep other work moving.
- Do not let any session thrash: if the same root-cause failure survives 2 attempts, have it stop and report.
- Stop everything if .planning/STOP appears in the repo.
- When all waves are merged, write .planning/SUMMARY.md listing each phase's PR link, status, test/verification results, and any items needing my review. Then message me a final report.

Model note: prefer alternating GLM-4.6 / Kimi-K2 for children where you can choose; escalate to a premium advisor model only on a genuine roadblock per the playbook.

Begin with Wave 1 now.
```

---

## Phase 1 — Foundation  · model: GLM-4.6 · wave 1 (BLOCKING — run alone first)

```
You are building the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its per-phase loop (research → plan → build → test → visually verify → commit). Also read .planning/PROJECT.md, .planning/REQUIREMENTS.md, .planning/ROADMAP.md, .planning/DESIGN-TOKENS.md, and prd.md.

Execute Phase 1 (Foundation): requirements FND-01..FND-05.
- Scaffold Next.js (App Router) + TypeScript + Tailwind + shadcn/ui in this repo. App must run with `npm run dev`.
- Port the design tokens from .planning/DESIGN-TOKENS.md into the Tailwind theme + globals.css (palette, fonts via Google Fonts — Schibsted Grotesk, EB Garamond, Plus Jakarta Sans; DO NOT use Angleton). Add the pink wash + soft blob background.
- Set up Prisma with a SQLite datasource. Model all PRD §19 tables (subjects, de_thi, questions, quiz_attempts, quiz_answers) PLUS a users table (id, username unique, password_hash, created_at). Create the initial migration.
- Add an idempotent prisma/seed.ts wired to `npm run seed` (upserts; safe to re-run). It can seed empty/minimal for now.
- Build a responsive base layout (nav + container) and a styled placeholder home that matches the reference aesthetic (compare to screens/17-dashboard.html).

Research current Next.js + Prisma + SQLite + shadcn setup gotchas on Windows before scaffolding. Verify the home screen visually (desktop + mobile screenshots vs reference). Commit in small steps. Update .planning/STATE.md when done.
```

---

## Phase 2 — Authentication · model: Kimi-K2 · wave 2 (after P1 commits)

```
Continue the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its loop. Read .planning/PROJECT.md, REQUIREMENTS.md, ROADMAP.md, DESIGN-TOKENS.md.

Execute Phase 2 (Authentication): requirements AUTH-01..AUTH-06.
- Username + password signup and login (styled to match reference). Hash with bcryptjs; never store plaintext.
- Signed cookie / JWT session (use jose or equivalent) that persists across refresh; logout clears it.
- Middleware that protects app routes and redirects anon users to /login.
- Seed a demo user (username: demo, password: demo1234) in prisma/seed.ts for instant demo login.

Research Next.js App Router auth patterns (server actions + cookies / jose JWT), secure cookie flags. Verify login/signup screens visually. Test the full flow: signup → logout → login → refresh persists → protected route blocks anon. Commit small. Update STATE.md.
```

---

## Phase 3 — Content & Matching Engine · model: GLM-4.6 · wave 2 (parallel with P2, after P1)

```
Continue the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its loop. Read PROJECT.md, REQUIREMENTS.md, ROADMAP.md, prd.md (esp. §13, §21).

Execute Phase 3 (Content & Matching): requirements CONT-01..03, MATCH-01..04.
- MANDATORY research: web-search real Vietnamese THPT đề for Toán, Vật Lý, Hóa Học — chapter/topic structure, common exam formatting, and a sensible tag taxonomy. Write findings to .planning/research/phase3-content.md.
- Author seed data grounded in that research: 3 subjects, 2–3 đề each, 50–100 total questions. Use LaTeX for math and Markdown for structure so đề mirror real Vietnamese documents. Each đề has clean tags; each question has correct answer / model answer. Add to prisma/seed.ts (idempotent).
- Implement Vietnamese normalization (strip diacritics, lowercase, tokenize) as pure code with unit tests.
- Implement subject detection (keyword tables, PRD §13.2) and tag matching + rule-based ranking by overlap (PRD §13.3). Expose a typed matching service that returns 3–6 đề each with a human-readable match reason.

Verify normalization with unit tests; verify `npm run seed` populates the bank; sanity-check matching with a few Vietnamese prompts. Commit small. Update STATE.md.
```

---

## Phase 4 — Chatbox & PDF Upload · model: Kimi-K2 · wave 3 (after P3 commits)

```
Continue the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its loop. Read PROJECT.md, REQUIREMENTS.md, DESIGN-TOKENS.md, prd.md (§8, §11–12, §14, §23).

Execute Phase 4 (Chatbox & PDF): requirements CHAT-01..07.
- Build the AI-style chatbox as the main interface (compare visually to screens/14-chat.html). Accept natural Vietnamese prompts.
- Server-enforce limits: 3 prompts/session, 200 words/prompt, 3 PDFs/prompt, PDF-only, ~20MB/file.
- Server-side PDF text extraction with pdf-parse (Node runtime route handler, NOT Edge). Feed extracted text through the Phase 3 normalization + matching engine. NEVER send raw PDF to any LLM.
- Render matched đề as cards: title, subject, # questions, type (MCQ/Essay/Mixed), match reason, Start Quiz button.
- Generate 2–3 sample THPT PDF files from the seed đề and commit them so upload is demoable instantly.
- Handle ALL error states in PRD §23 with friendly Vietnamese copy.

Research pdf-parse usage in Next.js route handlers + multipart upload handling before building. Verify the chatbox + result cards visually (desktop + mobile). Test each limit + error path. Commit small. Update STATE.md.
```

---

## Phase 5 — Quiz Engine · model: GLM-4.6 · wave 3 (parallel with P4, after P3)

```
Continue the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its loop. Read PROJECT.md, REQUIREMENTS.md, DESIGN-TOKENS.md, prd.md (§15).

Execute Phase 5 (Quiz Engine): requirements QUIZ-01..06.
- Quiz page: one MCQ at a time, 4 options, progress bar at top.
- Instant feedback: correct=green, wrong=red, reveal correct answer when wrong; Next to continue.
- Essay/short-answer: input field + submit → reveal model answer (no AI grading).
- Render math + structure with KaTeX + Markdown (react-markdown + rehype-katex) in questions, options, and answers.
- End screen score summary (e.g. "Bạn đúng 8/10 câu"). Persist quiz_attempts + quiz_answers rows.

Research KaTeX + Markdown rendering in React and safe rendering before building. Verify a full quiz visually incl. math rendering (desktop + mobile). Test start→finish and confirm DB rows are written. Commit small. Update STATE.md.
```

---

## Phase 6 — History & Dashboard · model: Kimi-K2 · wave 4 (after P5 commits)

```
Continue the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its loop. Read PROJECT.md, REQUIREMENTS.md, DESIGN-TOKENS.md, prd.md (§17–18).

Execute Phase 6 (History & Dashboard): requirements HIST-01, DASH-01..02.
- History page: list attempts (đề title, subject, score, percentage, completed_at). Empty state when none.
- Dashboard line chart: score progression over attempts (Recharts).
- Dashboard bar chart: average score per subject (Recharts).
- Style stat cards/pills to match the reference (compare to screens/17-dashboard.html).

Research Recharts responsive line/bar setup + Prisma aggregation per subject before building. Verify charts render real data responsively (desktop + mobile). Commit small. Update STATE.md.
```

---

## Phase 7 — Polish & Visual Verification · model: GLM-4.6 · wave 5 (last)

```
Continue the "AI Exam Prep App". Read .planning/EXECUTION-PLAYBOOK.md and follow its loop. Read PROJECT.md, REQUIREMENTS.md, DESIGN-TOKENS.md, prd.md (§22–25).

Execute Phase 7 (Polish & Visual Verification): requirements NFR-01..05.
- Responsive pass on mobile widths for EVERY screen.
- Computer-vision verification: screenshot each screen (desktop ~1280px + mobile ~390px), compare to the closest screens/*.html reference, refine until each meets the bar. Record verdicts in STATE.md.
- Verify all error states, UTF-8 Vietnamese integrity (no mojibake), and performance targets (PDF < 10s, search < 5s).
- Run the full PRD §25 demo happy-path end to end and fix bugs only (no new features).

Do not add scope. Fix at root cause. Commit small. Update STATE.md with final demo-readiness verdict.
```

---

## Single-Session Alternative

If running one continuous long session instead of parallel ones, paste Phase 1 first, then 2, 3, 4, 5, 6, 7 in order (the dependency graph guarantees correctness). Keep alternating the model per phase per the table above.
