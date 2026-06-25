# STATE — AI Exam Prep App

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-06-25)

**Core value:** A student can ask for or upload material and immediately get relevant practice đề they can take and track.
**Current focus:** Phase 1 — Foundation (not yet started)

## Status

| Phase | Name | Wave | Model | Status |
|-------|------|------|-------|--------|
| 1 | Foundation | 1 | GLM-4.6 | ○ Pending |
| 2 | Authentication | 2 | Kimi-K2 | ○ Pending |
| 3 | Content & Matching Engine | 2 | GLM-4.6 | ○ Pending |
| 4 | Chatbox & PDF Upload | 3 | Kimi-K2 | ○ Pending |
| 5 | Quiz Engine | 3 | GLM-4.6 | ○ Pending |
| 6 | History & Dashboard | 4 | Kimi-K2 | ○ Pending |
| 7 | Polish & Visual Verification | 5 | GLM-4.6 | ○ Pending |

Legend: ○ Pending · ◆ In Progress · ✓ Complete · ✗ Blocked

## Decisions Locked (from questioning)

- Local-first Prisma + SQLite (no Supabase for demo; Postgres-swappable for deploy)
- Username/password auth, bcryptjs, cookie/JWT session (no Google OAuth)
- Synthetic seed đề grounded in researched real THPT exams, authored in LaTeX + Markdown
- Next.js App Router + TS + Tailwind + shadcn/ui
- KaTeX + Markdown rendering
- Reuse reference design tokens + components (mix of port + fresh); meet `screens/*.html` standard via screenshot-compare loop
- Research every phase; computer-vision visual verification gate every phase
- Model rotation GLM-4.6 ↔ Kimi-K2; escalate to Opus/GPT only at roadblocks
- Target: full PRD end-to-end overnight

## Phase Log

(Each session appends here after completing its phase: what shipped, tests run, screenshots verified, anything risky.)

## Needs Human Review

(Agents log here any default they had to assume because a decision was unclear. Empty for now.)

---
*Last updated: 2026-06-25 after initialization*
