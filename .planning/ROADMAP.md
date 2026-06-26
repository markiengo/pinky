# Roadmap: AI Exam Prep App

**Granularity:** Standard (7 phases) · **Execution:** Parallel waves · **Created:** 2026-06-25

This roadmap is optimized for **autonomous overnight handoff**. Phases are grouped into waves; phases in the same wave have no dependencies on each other and can run in parallel sessions. Every phase follows the loop in `EXECUTION-PLAYBOOK.md`: **research → plan → build → test → visually verify (screenshot+compare) → commit**.

## Dependency Graph

```
Wave 1:  Phase 1 (Foundation)                        ← must finish first; everything depends on it
                 │
        ┌────────┴────────┐
Wave 2: Phase 2 (Auth)   Phase 3 (Content + Matching) ← parallel
                 │                 │
                 └────────┬────────┘
        ┌────────────────┴────────────────┐
Wave 3: Phase 4 (Chatbox + PDF)   Phase 5 (Quiz)       ← parallel (both need Phase 3)
                 └────────┬────────┘
Wave 4:          Phase 6 (History + Dashboard)         ← needs quiz attempts (Phase 5)
                          │
Wave 5:          Phase 7 (Polish + Visual Verify)      ← needs everything
```

## Phase Table

| Phase | Name | Wave | Depends On | Model | Requirements |
|-------|------|------|------------|-------|--------------|
| 1 | Foundation | 1 | — | GLM-4.6 | FND-01..05 |
| 2 | Authentication | 2 | P1 | Kimi-K2 | AUTH-01..06 |
| 3 | Content & Matching Engine | 2 | P1 | GLM-4.6 | CONT-01..03, MATCH-01..04 |
| 4 | Chatbox & PDF Upload | 3 | P3 | Kimi-K2 | CHAT-01..07 |
| 5 | Quiz Engine | 3 | P3 | GLM-4.6 | QUIZ-01..06 |
| 6 | History & Dashboard | 4 | P5 | Kimi-K2 | HIST-01, DASH-01..02 |
| 7 | Polish & Visual Verification | 5 | P1–P6 | GLM-4.6 | NFR-01..05 |

---

## Phase 1 — Foundation

**Goal:** A running Next.js app with the design system, database, and seed pipeline in place.

**Deliverables:**
- Next.js App Router + TypeScript + Tailwind + shadcn/ui scaffold; `npm run dev` works
- Tailwind theme + `globals.css` carry the ported design tokens (see `DESIGN-TOKENS.md`)
- Prisma schema for all PRD §19 tables + `users` table; SQLite datasource; initial migration
- `prisma/seed.ts` wired to `npm run seed`, idempotent (upserts)
- Base layout: responsive shell, nav, soft/rounded reference aesthetic, background wash

**Acceptance:** App boots, DB migrates, an empty seed run succeeds, a styled placeholder home renders matching the reference look.

**Research first:** Next.js 14/15 App Router + Prisma + SQLite setup gotchas on Windows; shadcn/ui init; Tailwind v3/v4 token mapping.

---

## Phase 2 — Authentication

**Goal:** Username/password auth with persistent sessions, fully local.

**Deliverables:**
- Signup + login forms (styled), server actions/route handlers
- `bcryptjs` password hashing; never store plaintext
- Signed cookie / JWT session; persists across refresh; logout clears it
- Middleware protecting app routes; redirect to login when unauthenticated
- Seeded demo user (e.g. `demo` / `demo1234`) for instant demo login

**Acceptance:** Can sign up, log out, log back in, refresh and stay logged in; protected route blocks anon access.

**Research first:** Next.js App Router auth patterns (server actions + cookies / jose JWT), secure cookie flags, bcryptjs on Node.

---

## Phase 3 — Content & Matching Engine

**Goal:** A realistic Vietnamese đề bank + the deterministic matching pipeline.

**Deliverables:**
- **Web-research real university đề** (Accounting, Banking, Business curriculum topics, common chapters, tag taxonomy) — findings in `.planning/research/phase3-content.md`
- Seed data: 3 college subjects (Kế toán, Tài chính – Ngân hàng, Quản trị Kinh doanh), 8 đề total, 60 questions; Markdown structure; clean tags; correct/model answers
- Vietnamese normalization util (strip diacritics, lowercase, tokenize) — pure code, unit-tested (`src/lib/vietnamese.ts`)
- Subject detection from keyword tables (PRD §13.2) — `src/lib/subject-detection.ts`
- Tag matching + rule-based ranking by overlap (PRD §13.3); returns 3–6 đề with match reason — `src/lib/matching.ts`
- Matching exposed as a typed service consumed by Phase 4 — `src/lib/search-service.ts`

**Acceptance:** Given a Vietnamese prompt, engine returns ranked đề with reasons; 33 normalization/matching unit tests pass; seed populates the bank.

**Research first (mandatory content + technical):** real Vietnamese university exam structure/formatting, common topic tags per subject; diacritics-normalization approaches in JS/TS.

**Status:** ✓ Complete (2026-06-26) — UAT 10/10 passed, 33/33 tests green, seed verified.

---

## Phase 4 — Chatbox & PDF Upload

**Goal:** The main AI-style chatbox interface with text + PDF input and result cards.

**Deliverables:**
- Chatbox UI (prompt input, attach PDFs, message/result stream) in the reference aesthetic
- Server-enforced limits: 3 prompts/session, 200 words/prompt, 3 PDFs/prompt, PDF-only, ~20MB
- Server-side `pdf-parse` extraction; extracted text → normalization → matching engine
- đề result cards: title, subject, #questions, type (MCQ/Essay/Mixed), match reason, Start Quiz
- Full error states (PRD §23) with friendly Vietnamese copy

**Acceptance:** Typing a prompt returns cards; uploading sample PDFs returns cards citing detected topics; each limit + error state behaves correctly.

**Research first:** `pdf-parse` server usage in Next.js route handlers (Node runtime, not Edge), multipart upload handling, file validation.

---

## Phase 5 — Quiz Engine

**Goal:** Take a đề as a quiz with MCQ + essay support and saved results.

**Deliverables:**
- Quiz page: one MCQ at a time, 4 options, progress bar
- Instant feedback (green/red), reveal correct answer on wrong
- Essay: input + submit → reveal model answer (no grading)
- KaTeX + Markdown rendering in questions/options/answers
- End screen score summary; persist `quiz_attempts` + `quiz_answers`

**Acceptance:** Full quiz playable start→finish; math renders correctly; attempt + answers saved to DB.

**Research first:** KaTeX + Markdown rendering in React (react-markdown + rehype-katex), safe rendering, one-question-at-a-time state patterns.

---

## Phase 6 — History & Dashboard

**Goal:** Students can see past attempts and progress charts.

**Deliverables:**
- History page: attempts list (đề title, subject, score, %, completed_at)
- Dashboard line chart: score over attempts (Recharts)
- Dashboard bar chart: average score per subject (Recharts)
- Empty states when no attempts yet

**Acceptance:** After completing quizzes, history lists them and both charts render real data responsively.

**Research first:** Recharts responsive line/bar setup; aggregating attempts per subject in Prisma.

---

## Phase 7 — Polish & Visual Verification

**Goal:** Demo-ready quality across the whole product.

**Deliverables:**
- Responsive pass on mobile widths for every screen
- **Computer-vision verification**: screenshot each screen via browser preview, compare against `screens/*.html` reference standard, refine until it meets the bar
- Verify all error states, UTF-8 Vietnamese integrity, performance targets (NFR-02)
- End-to-end demo run-through of PRD §25 success criteria; fix bugs only

**Acceptance:** PRD §25 demo criteria all pass locally; no crashes on the happy path; screens meet the reference visual standard.

**Research first:** none new — verification phase; consult reference screens + checkpoint.

---

## Overnight Session Ordering (recommended)

1. **Session A** runs Phase 1 to completion and commits. (blocking gate)
2. After P1 commits: **Session B** = Phase 2, **Session C** = Phase 3 (parallel).
3. After P3 commits: **Session D** = Phase 4, **Session E** = Phase 5 (parallel).
4. After P5 commits: **Session F** = Phase 6.
5. **Session G** = Phase 7 last.

Copy-paste prompts for each session are in `SESSION-PROMPTS.md`. If running a single long session instead of parallel, execute phases in numeric order — the dependency graph already guarantees correctness.

---
*Created: 2026-06-25 · Standard granularity · 7 phases / 5 waves*
