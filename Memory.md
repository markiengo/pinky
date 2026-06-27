# Memory — Calendar Feature Development Insights

## Project: Crambox (pinky)
**Date:** June 27, 2026

---

## What We Built Today

### Calendar Version 1 — Complete Feature Set

1. **Prisma Schema Changes**
   - Added `StudyPlan`, `StudySubject`, `StudySession` models
   - Added `description` field to `StudySession`
   - Synced to both local SQLite and Supabase PostgreSQL

2. **Smart Schedule Algorithm** (`src/lib/calendar.ts`)
   - 3 time frames: Morning 7:00-11:00, Afternoon 13:30-17:00, Evening 19:00-22:00
   - 30-min breaks between sessions within a frame
   - Quarter-hour snapping (:00/:15/:30/:45) — no odd times
   - Max 2h per session for focus
   - Subject rotation across frames for variety
   - No weekend reduction — respects user's dailyHours exactly
   - Validation: rejects if total dailyHours > 10.5h with popup error
   - `findAlternativeSlot` updated to use same time frames

3. **Calendar UI** (`src/components/calendar/calendar-client.tsx`)
   - Month view (Monday-start) and Week view (24h time grid)
   - Drag-and-drop session moving with confirmation modal
   - "Thêm sự kiện" button — opens EventEditModal with defaults
   - "Sửa kế hoạch" button — opens wizard to edit existing plan
   - "Lưu lịch" button — always visible, disabled when no unsaved changes
   - Click empty time slots in WeekView to create events
   - Unsaved changes tracking with save/discard confirmation

4. **Event Edit Modal** (Google Calendar-style)
   - Title input (autofocused)
   - Native date picker (directly editable)
   - Time inputs: text-based, no spin buttons, keyboard Arrow Up/Down support
   - Description textarea
   - Color picker (6 pastel swatches)
   - Save / Cancel / Delete buttons
   - Replaced old SessionDetailModal entirely

5. **Setup Wizard**
   - Shows current subjects pre-filled when editing
   - Subject color dots
   - Trash icon to delete any subject
   - "Thêm môn" button to add new subjects
   - Back button ("← Quay lại") when editing existing plan
   - Dynamic title: "Tạo kế hoạch ôn thi" vs "Chỉnh sửa kế hoạch"
   - Validation error popup from server (e.g. total hours exceeded)

---

## Key Insights

### Architecture
- Next.js App Router with server actions in `src/lib/calendar.ts`
- Prisma ORM with SQLite (local) and PostgreSQL (Supabase)
- Schema uses `@map` for snake_case DB columns, camelCase in TS
- `serializePlan` in `page.tsx` must explicitly include new fields
- API routes in `src/app/api/calendar/` handle plan CRUD and session batch updates

### Gotchas Encountered
- **Prisma generate lock**: Dev server locks `query_engine.dll` — must kill node before `prisma generate`
- **Wizard routing bug**: `showWizard` condition at line 313 caught both first-time and edit paths — needed to split into separate `if` blocks
- **Unicode in JSX**: `\u2192` renders literally — must use actual `→` character
- **Number input spin buttons**: Webkit shows spin buttons on `type="number"` — use `type="text"` + `inputMode="numeric"` + CSS to hide
- **Supabase push**: Schema provider is `sqlite` — need temporary postgres schema file to push to Supabase
- **`@map` fields**: Prisma `@map` column names need explicit handling in serialize functions

### Design Decisions
- **3 frames over 1 continuous block**: Better lifestyle fit (lunch break, dinner break)
- **30-min breaks**: User preference for comfortable pacing
- **Max 2h sessions**: Research-backed optimal focus duration
- **Quarter-hour snapping**: Clean UI, easy to read, no weird times like 7:24
- **No weekend reduction**: User wants exact hours respected
- **Always-visible "Lưu lịch"**: Better UX than hiding the save button

### File Map
- `prisma/schema.prisma` — DB schema (SQLite local, Postgres Supabase)
- `src/lib/calendar.ts` — Server actions: CRUD, scheduling algorithm, slot suggestions
- `src/app/api/calendar/plan/route.ts` — Plan GET/POST API
- `src/app/api/calendar/session/route.ts` — Session PUT (batch save)
- `src/app/calendar/page.tsx` — Calendar page (auth, premium gate, serialize)
- `src/components/calendar/calendar-client.tsx` — Main calendar UI component (~1200 lines)
- `src/proxy.ts` — Middleware for route protection

### Supabase Connection
- Project: `lhxgvqdlpnjzxnbewoer`
- Pooler: `aws-1-ap-southeast-2.pooler.supabase.com:5432`
- To push schema: create temp postgres schema file, set `SUPABASE_DB_URL` env, run `prisma db push --schema=<temp> --skip-generate`

---

## What's Next (Potential v2)
- Google Calendar sync (Pro tier feature per pricing strategy)
- Adaptive exam planner (adjusts based on quiz performance)
- Session completion tracking with progress stats
- Notifications/reminders for upcoming study sessions
- Subject-based filtering in calendar view
