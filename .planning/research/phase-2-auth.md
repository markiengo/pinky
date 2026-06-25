# Phase 2 — Authentication Research

## Next.js App Router Auth Patterns (2025/2026)

### Server Actions + Cookies
- Use `"use server"` async functions for login/signup/logout — no API routes needed
- Server actions can directly set/delete cookies via `next/headers` `cookies()`
- Form submissions use `action={serverAction}` — progressive enhancement, works without JS

### JWT with jose (Edge-compatible)
- `jose` is the recommended JWT library for Next.js — works in Edge runtime (middleware)
- `jsonwebtoken` uses Node crypto APIs not available in Edge — avoid for middleware
- HS256 signing with `jwtSecret` from env; fallback for dev only
- Token payload: `{ userId, username, iat, exp }`
- Expiry: 7 days (`7d`) — reasonable for a study app

### Cookie Security
- `httpOnly: true` — prevents XSS access via `document.cookie`
- `secure: true` in production — HTTPS only
- `sameSite: "lax"` — CSRF protection while allowing top-level navigation
- `path: "/"` — accessible across all routes
- Max-age matches JWT expiry

### Middleware (Next.js 16)
- Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts` but still works
- Matcher: exclude `_next/static`, `_next/image`, `favicon.ico`, and public auth routes
- Verify JWT in middleware; redirect to `/login` if invalid/missing
- Clear invalid cookies to prevent stale session loops

### bcryptjs
- Pure JS implementation — no native bindings needed
- Salt rounds: 10 (good balance of security + performance for dev)
- `bcrypt.hash(plaintext, 10)` → store hash
- `bcrypt.compare(plaintext, hash)` → verify

### Demo User
- Seed `demo` / `demo1234` via idempotent upsert in `prisma/seed.mts`
- Show hint on login page for instant demo access
