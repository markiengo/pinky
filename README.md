# Crambox

Crambox is a study companion for Vietnamese university students. It helps you find the right practice exams, take quizzes, review explanations, and track your progress across subjects -- all in one place.

You type what you need, upload your materials, and Crambox matches you with relevant exams from the question bank. No guesswork, no scrolling through random forums.

## How It Works

1. **Ask for what you need.** Type a prompt like "Cho minh de Ke toan ve BCTC" or upload a PDF of your class notes.
2. **Get matched.** Crambox reads your input, detects the subject and topics, and returns the most relevant exam papers from the database.
3. **Practice.** Take quizzes with instant feedback on multiple-choice questions and model answers for essay questions.
4. **Track progress.** Every attempt is saved. Your dashboard shows score trends, subject averages, and recent activity.

## What You Can Do

- Search for exams by typing a question or uploading a PDF
- Browse the full exam library, filtered by subject
- Take quizzes with MCQ and essay questions
- See detailed explanations after each question (inline, no modal popup)
- View score progression over time
- Compare performance across subjects
- Manage your profile and review full attempt history
- Preview pricing tiers (Free, Plus, Pro)
- Multi-chat sessions in the chatbox (in-memory, ephemeral)
- **Calendar study planner** (Premium) — smart scheduling with 3 daily time frames, breaks, drag-and-drop, event editing

## Subjects Covered

- **Ke toan** -- Accounting principles, financial statements
- **Tai chinh -- Ngan hang** -- Finance and banking
- **Quan tri kinh doanh** -- Business administration, marketing, strategy
- **Kinh te vi mo** -- Microeconomics, market structures, consumer theory
- **Phap luat dai cuong** -- Constitutional, civil, commercial, and administrative law

## Getting Started

### Local Development (SQLite)

Install dependencies:

```powershell
npm install
```

Create a `.env` file (see `.env.example`):

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="dev-secret-do-not-use-in-production"
PORT=3001
```

Push schema and seed the database:

```powershell
npx prisma db push --skip-generate
npm run seed
```

Start the dev server:

```powershell
npm run dev
```

Open http://localhost:3001 in your browser.

### Production Deployment (Railway + Supabase)

The app uses SQLite for local dev and PostgreSQL (Supabase) in production. Railway's build step auto-swaps the Prisma provider from `sqlite` to `postgresql`.

1. Push the repo to GitHub.
2. Create a Railway project from the GitHub repo.
3. Set environment variables in Railway:
   - `DATABASE_URL` -- Supabase direct connection string (e.g. `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`)
   - `JWT_SECRET` -- a strong random secret
4. Railway builds and deploys automatically. The Supabase database is already seeded -- no migration or seed step needed on deploy.

## Demo Accounts

Both local and production use the same accounts:

```text
huyenmy / my1234      premium account
pinky   / pinky1234   basic account
```

## Scripts

```powershell
npm run dev     # Start dev server on port 3001 (Turbopack)
npm run build   # Generate Prisma client and build for production
npm run start   # Start production server
npm run seed    # Seed local SQLite database (3,000 questions, 150 de_thi, 5 subjects, 2 users)
npm run lint    # Run ESLint
npx vitest run  # Run unit tests (35 tests across vietnamese, subject-detection, matching)
```

## Pages

| Route                  | Description                                             |
| ------------------------| ---------------------------------------------------------|
| /                      | Landing page (hero, features, pricing, testimonials)    |
| /login                 | Login (username/password, no OAuth)                     |
| /signup                | Sign up                                                 |
| /dashboard             | Personal stats and recent activity                      |
| /library               | Browse all exam papers                                  |
| /practice              | AI-style search chatbox with multi-chat sessions        |
| /quiz/[deThiId]        | Take a specific quiz (MCQ + essay, inline explanations) |
| /history               | Full attempt history with charts                        |
| /profile               | Profile, stats, and logout                              |
| /pricing               | Pricing tiers (Free, Plus, Pro)                         |
| /calendar              | Study planner calendar (Premium, month/week views)     |
| /api/search            | Search API endpoint (POST, FormData)                    |
| /api/calendar/plan     | Study plan CRUD API (GET/POST)                          |
| /api/calendar/session  | Study session batch save API (PUT)                      |
| /api/dev-clear-session | Dev-only session clear endpoint (POST)                  |

## Pricing

Crambox offers three tiers:

- **Free** -- Search, quiz, explanations, basic dashboard. No cost.
- **Plus** -- AI reads your materials, generates quizzes from uploads, flashcards, syllabus analyzer, exam planner. 49.000 VND/month.
- **Pro** -- Everything in Plus plus Google Calendar sync, YouTube parsing, Zalo notifications, Notion sync, adaptive scheduling. 99.000 VND/month.

See `docs/pricing-strategy.md` for the full pricing rationale.

## Project Layout

```text
src/
  app/              Next.js App Router pages and API routes
    api/            API routes (search, dev-clear-session)
    dashboard/      Dashboard page
    history/        Quiz history page
    library/        Exam library page
    login/          Login page
    practice/       Chatbox page
    pricing/        Pricing page
    profile/        Profile page
    quiz/[deThiId]  Quiz taking page
    signup/         Signup page
    layout.tsx      Root layout (CursorGlow, ClearStorage, DevAutoLogout)
    page.tsx        Landing page
    globals.css     Design tokens, animations, global styles
  components/       UI components
    app-shell.tsx       Desktop sidebar + mobile bottom nav
    calendar/           Calendar study planner components
      calendar-client.tsx  Main calendar UI (month/week views, event modal, wizard)
    chatbox.tsx         Multi-chat AI search interface
    quiz-client.tsx     Quiz taking (MCQ + essay, inline explanations)
    charts.tsx          Recharts score progression + subject averages
    de-pane-card.tsx    Library exam card
    de-thi-card.tsx     Chatbox result card
    premium-overlay.tsx Upsell modal when prompts run out
    rendered-content.tsx  Markdown + KaTeX renderer
    cursor-glow.tsx     Canvas cursor glow effect
    clear-storage.tsx   Clears localStorage/sessionStorage on mount
    dev-auto-logout.tsx Dev-only auto-logout on page unload
  lib/              Business logic
    auth.ts            Login/signup/logout server actions
    session.ts         JWT session management (jose, httpOnly cookie)
    db.ts              Prisma client singleton
    quiz.ts            Quiz data fetching + attempt saving
    history.ts         Quiz history + dashboard stats
    calendar.ts        Study plan CRUD + smart scheduling algorithm
    search-service.ts  Search orchestration with caching
    matching.ts        Tag matching + rule-based ranking engine
    subject-detection.ts  Subject detection from keyword tables
    vietnamese.ts      Vietnamese text normalization utilities
    format-date.ts     Deterministic date formatting (no Intl)
    __tests__/         Unit tests (vitest)
  proxy.ts          Middleware: route protection + auth redirect
prisma/
  schema.prisma     Database schema (SQLite locally, Postgres on Railway)
  seed-hard.mts     Seed script (matches Supabase production data)
  data/             JSON seed data (accounting, finance, business, legal, microecon)
public/             Static assets (logo, backgrounds, faces, fonts)
docs/
  prd.md            Product requirements document
  pricing-strategy.md  3-tier pricing strategy
```

## Tech

- Next.js 16 with App Router (Turbopack dev)
- React 19, TypeScript, Tailwind CSS v4
- Prisma with SQLite (local dev) / PostgreSQL via Supabase (production)
- JWT sessions with jose, password hashing with bcryptjs
- Recharts for analytics, pdf-parse for PDF text extraction
- react-markdown + remark-math + rehype-katex for math rendering
- Vitest for unit tests

## Notes

- The search engine is deterministic and zero-cost. No paid LLM or embedding API is used in the current version.
- Auth is username/password (no OAuth). Sessions are JWT in httpOnly cookies.
- Dev mode: session cookie is session-only (cleared on browser close). Production: 7-day maxAge.
- Dev mode: auto-logout on hard refresh / tab close via `pagehide` event + `sendBeacon`.
- `.env` and local build artifacts are gitignored. Set environment variables on your deployment platform.
- Use a strong `JWT_SECRET` in production. The default dev secret is not secure.
- Local dev uses SQLite. Railway's build step (`railway.json`) auto-swaps the Prisma provider to `postgresql` and connects to Supabase.
