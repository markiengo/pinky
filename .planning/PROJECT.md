# AI Exam Prep App

## What This Is

A web app that helps Vietnamese high-school (THPT) students find practice exams (đề) that match what they're currently studying. Students use an **AI-style chatbox** to type requests (e.g. "Cho mình đề Vật Lý về dao động điều hòa") or upload school PDFs, receive matched đề as cards, take quizzes (MCQ + essay) directly in the browser, and track their score progress per subject.

Built **zero-cost AI**: no paid LLM/embedding APIs. The chatbox is a smart retrieval interface powered by Vietnamese text normalization, keyword/subject detection, and tag-based database search — not a free-form chatbot.

## Core Value

> A student can ask for or upload material and get **relevant practice đề** they can take immediately — faster than manually searching and filtering generic exam sites.

If everything else fails, the **prompt → matched đề → take quiz → see score** loop must work.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Username/password auth with session persistence (local, bcrypt-hashed)
- [ ] AI-style chatbox: text prompt search + PDF upload, with PRD limits
- [ ] Vietnamese normalization + subject/topic detection + tag-based ranking
- [ ] PDF text extraction (server-side) feeding the same matching engine
- [ ] Matched đề shown as cards with match reasons + Start Quiz
- [ ] Quiz page: MCQ instant feedback + essay model-answer reveal, KaTeX/Markdown rendering
- [ ] Save quiz attempts; History page
- [ ] Dashboard: score-over-time line chart + average-score-by-subject bar chart
- [ ] Seed bank: 3 subjects (Toán/Lý/Hóa), 2–3 đề each, 50–100 questions, LaTeX-authored
- [ ] Responsive on mobile browser; clear error states; no crashes during demo

### Out of Scope

- Google/Facebook OAuth — username/password is sufficient and avoids overnight OAuth-config blockers
- Supabase / hosted cloud DB for the demo — local-first SQLite via Prisma (swappable to Postgres later)
- Paid LLM / embedding / vector search — explicitly zero-cost AI for MVP
- AI essay grading, AI-generated đề, full free-form tutoring chatbot
- Leaderboard, admin dashboard, advanced analytics, export/share

## Context

- **Greenfield build** reusing only the *visual language* of the existing static "Connect to Heal" prototype in `screens/` (palette, fonts, soft/rounded aesthetic). The product itself is entirely different (exam prep, not mental health).
- Existing design source of truth: `design/00-logs.md` + `screens/screens.css`. Palette: pink `#F7ADC3`/`#FCC5D9`, cream `#F7F5ED`, blue `#72DDF7`/`#8093F1`. 4-font system (Schibsted Grotesk display, EB Garamond warmth, Plus Jakarta Sans workhorse; Angleton script is personal-use-only — do NOT ship it, fall back to Garamond italic).
- This project is being built for **autonomous overnight execution** by long-running agent sessions (Devin/CLI). The planning docs are optimized for handoff — see `EXECUTION-PLAYBOOK.md` and `SESSION-PROMPTS.md`.
- Platform: Windows 11, PowerShell. Vietnamese content is primary; UTF-8 must be preserved everywhere (do not bulk-edit with PowerShell `Get-Content`/`Set-Content`).

## Constraints

- **Tech stack**: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui — modern, fast for agents, easy responsive.
- **Data**: Prisma ORM + SQLite (local file). Schema must match PRD §19. Swap to Postgres for deploy via env change only.
- **Auth**: username/password, `bcryptjs` hashing, signed cookie/JWT session. No external auth service.
- **AI cost**: 0 VND. No paid API calls anywhere in the matching pipeline.
- **Rendering**: KaTeX for math + Markdown for structure, so đề mirror real Vietnamese exam documents.
- **PDF**: server-side `pdf-parse`; never send raw PDF to an instruction-following LLM (PRD §12).
- **Limits (server-enforced)**: 3 prompts/session, 200 words/prompt, 3 PDFs/prompt, PDF-only, ~20MB/file.
- **Timeline**: full PRD end-to-end target overnight; prioritize the core loop if time runs short.
- **Visual standard**: new screens must meet the quality bar of the existing `screens/*.html` reference files — loop (build → screenshot → compare → refine) until they do.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Local-first Prisma + SQLite (no Supabase for demo) | It's a demo; avoids cloud-provisioning stalls; Prisma keeps Postgres deploy a one-env-change away | — Pending |
| Username/password auth (drop Google OAuth from PRD) | OAuth consent-screen/redirect config is a classic unattended-overnight blocker; hashing needs no Supabase | — Pending |
| Generate synthetic seed đề grounded in researched real THPT exams, authored in LaTeX | Zero blockers + demo-grade authenticity; LaTeX matches real Vietnamese document formatting | — Pending |
| Next.js App Router + TS + Tailwind + shadcn/ui | Best velocity for agents, clean responsive, easy to map palette to tokens | — Pending |
| KaTeX + Markdown rendering | Faithful to real đề; fast, synchronous | — Pending |
| Standard granularity, 7 phases, parallel waves | Clean dependency ordering + verification gates ideal for session handoff | — Pending |
| Alternate GLM-4.6 ↔ Kimi per phase; escalate to Opus/GPT only at roadblocks | User's available unlimited models; reserve premium models for hard problems | — Pending |
| Research-first + computer-vision visual verification every phase | User mandate: "always research"; screenshot+compare loop guards visual quality | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-25 after initialization*
