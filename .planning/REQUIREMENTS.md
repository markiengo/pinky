# Requirements: AI Exam Prep App

**Defined:** 2026-06-25
**Core Value:** A student can ask for or upload material and immediately get relevant practice đề they can take and track.

## v1 Requirements

### Foundation

- [ ] **FND-01**: Next.js App Router + TypeScript + Tailwind + shadcn/ui project scaffolded and runs with `npm run dev`
- [ ] **FND-02**: Design tokens (palette, fonts, radii, shadows) ported from `screens/screens.css` into Tailwind config + globals
- [ ] **FND-03**: Prisma + SQLite configured; schema matches PRD §19 (subjects, de_thi, questions, quiz_attempts, quiz_answers, users)
- [ ] **FND-04**: Repeatable seed script (`npm run seed`) that is idempotent
- [ ] **FND-05**: App shell/layout (nav, responsive container) reflecting the soft/rounded reference aesthetic

### Authentication

- [ ] **AUTH-01**: User can sign up with username + password (password hashed with bcryptjs)
- [ ] **AUTH-02**: User can log in with username + password
- [ ] **AUTH-03**: Session persists across browser refresh (signed cookie / JWT)
- [ ] **AUTH-04**: Protected routes redirect unauthenticated users to login
- [ ] **AUTH-05**: User can log out
- [ ] **AUTH-06**: A demo user is seeded for instant login during demo

### Content & Matching Engine

- [x] **CONT-01**: Seed bank has 3 college subjects (Kế toán, Tài chính – Ngân hàng, Quản trị Kinh doanh) with slugs
- [x] **CONT-02**: 2–3 đề per subject, 60 total questions, each with clean tags + correct/model answers
- [x] **CONT-03**: Question/answer content authored in Markdown, grounded in researched real university exam formats (FTU, NEU, UEL, ĐH Mở, HVNH)
- [x] **MATCH-01**: Vietnamese text normalization (diacritics-stripped, lowercased) implemented as pure code
- [x] **MATCH-02**: Subject detection from prompt/PDF text via keyword tables (PRD §13.2)
- [x] **MATCH-03**: Topic/tag matching with rule-based ranking by tag overlap (PRD §13.3)
- [x] **MATCH-04**: Matching returns 3–6 đề with a human-readable match reason per đề

### Chatbox & Upload

- [ ] **CHAT-01**: AI-style chatbox is the main interface; accepts natural Vietnamese prompts
- [ ] **CHAT-02**: Prompt limits enforced server-side: 3 prompts/session, 200 words/prompt
- [ ] **CHAT-03**: PDF upload inside chatbox: max 3 files/prompt, PDF-only, ~20MB/file
- [ ] **CHAT-04**: Server-side PDF text extraction (`pdf-parse`); raw PDF never sent to an LLM
- [ ] **CHAT-05**: Extracted PDF text flows through the same normalization + matching engine
- [ ] **CHAT-06**: Matched đề rendered as cards (title, subject, # questions, type, match reason, Start Quiz)
- [ ] **CHAT-07**: All error states handled (PRD §23): not PDF, too large, too many files, parse failure, no readable text, prompt too long, limit reached, no match, not logged in, server error

### Quiz

- [ ] **QUIZ-01**: Quiz page shows one MCQ at a time with 4 options + progress bar
- [ ] **QUIZ-02**: MCQ instant feedback — correct=green, wrong=red, reveal correct answer if wrong
- [ ] **QUIZ-03**: Essay/short-answer: input field, submit reveals model answer (no AI grading)
- [ ] **QUIZ-04**: Math/structure rendered via KaTeX + Markdown in questions, options, and answers
- [ ] **QUIZ-05**: End screen shows score summary (e.g. "Bạn đúng 8/10 câu")
- [ ] **QUIZ-06**: Quiz attempt saved (user, đề, subject, score, total, percentage, completed_at) with per-answer rows

### History & Dashboard

- [ ] **HIST-01**: History page lists attempts (đề title, subject, score, percentage, completed_at)
- [ ] **DASH-01**: Dashboard line chart — score progression over attempts (Recharts)
- [ ] **DASH-02**: Dashboard bar chart — average score per subject (Recharts)

### Quality & Non-Functional

- [ ] **NFR-01**: Responsive on mobile browser widths
- [ ] **NFR-02**: PDF processing < 10s for normal files; search results < 5s
- [ ] **NFR-03**: App does not crash on the demo happy path; all inputs validated server-side
- [ ] **NFR-04**: New screens visually meet the reference standard (`screens/*.html`), verified via screenshot comparison
- [ ] **NFR-05**: UTF-8 Vietnamese preserved end-to-end (no mojibake)

## v2 Requirements

### Semantic Upgrade
- **V2-01**: Optional paid embedding API + pgvector semantic matching (PRD §10 Option B)
- **V2-02**: Optional LLM rerank/explanations (PRD §10 Option C)

### Auth & Infra
- **V2-03**: Google OAuth via a real auth provider
- **V2-04**: Hosted Postgres (Supabase/Neon) + Vercel deployment
- **V2-05**: Supabase Storage for uploaded PDFs

## Out of Scope

| Feature | Reason |
|---------|--------|
| Paid LLM/embedding/vector search in MVP | Explicit zero-cost AI constraint |
| Google/Facebook OAuth in MVP | OAuth config is an overnight-blocker; username/password suffices |
| Supabase/cloud DB for the demo | Local-first SQLite avoids provisioning stalls |
| AI essay grading | Out of MVP; essays reveal model answer only |
| AI-generated new đề | Out of MVP; seed bank only |
| Leaderboard / gamification / admin / export | Not core to MVP value |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01..05 | Phase 1 | Pending |
| AUTH-01..06 | Phase 2 | Pending |
| CONT-01..03 | Phase 3 | ✓ Complete |
| MATCH-01..04 | Phase 3 | ✓ Complete |
| CHAT-01..07 | Phase 4 | Pending |
| QUIZ-01..06 | Phase 5 | Pending |
| HIST-01 | Phase 6 | Pending |
| DASH-01..02 | Phase 6 | Pending |
| NFR-01..05 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-25*
*Last updated: 2026-06-26 — Phase 3 requirements marked complete, subjects updated from THPT to college-level*
