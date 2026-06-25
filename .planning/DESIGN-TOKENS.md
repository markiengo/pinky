# Design Tokens — AI Exam Prep App

Ported from the existing reference design (`design/00-logs.md` + `screens/screens.css`). Goal: a **mix of token reuse + fresh components** that meets the visual standard of `screens/*.html`. New screens should feel like the same product family: soft, rounded, airy, candy-pastel on a warm pink wash.

> **Standard-meeting loop:** build a screen → run dev server → screenshot via browser preview → compare side-by-side with the closest `screens/*.html` reference → refine until it matches the bar. Do not mark a screen done on first render.

## Palette (map into Tailwind `theme.extend.colors` + CSS vars)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#17191C` | primary text, "black" pill fills, active states |
| `--on-ink` | `#FFFFFF` | text/icons on ink fills |
| `--muted` | `#8A9097` | secondary text |
| `--faint` | `#B6BCC2` | tertiary text |
| `--line` | `#EDEFF2` | hairlines/borders |
| `--line-soft` | `#F3F4F6` | softer hairlines |
| `--surface` | `#FFFFFF` | cards, panels, inputs |
| `--surface-2` | `#F6F7F8` | recessed rails / hovers |
| `--c-pink` | `#FCC5D9` | candy card (fairy) |
| `--c-cream` | `#F7F5ED` | candy card (floral white; +1px ink-α border on pink bg) |
| `--c-lilac` | `#C9D0FA` | candy card (vista tint) |
| `--c-mint` | `#B1E6F3` | candy card (non-photo blue) |
| `--c-blue` | `#BCD9FB` | candy card (argentinian tint) |
| `--accent` | `#F7ADC3` | **RESERVED** primary accent: best-match card, progress fills, selection ticks, hearts |
| `--accent-deep` | `#E98CAB` | small accent details |
| `--sky-pop` | `#72DDF7` | rare blue pop |
| `--good` / `--good-ink` | `#C9F2B3` / `#2F6B2A` | positive/correct (MCQ right answer) |
| `--bad` / `--bad-ink` | `#F7B8C8` / `#9B2742` | negative/incorrect (MCQ wrong answer) — derive from accent family |
| `--star` | `#F6B51E` | rating stars |

**Subject color mapping (new — pick from candy pool, respect collision rule):**
- Toán → `--c-lilac` · Vật Lý → `--c-mint` · Hóa Học → `--c-pink`

**Collision rule (carry over):** a page's main accent (`--accent` cherry) must not be reused by a sibling element on the same page. Re-tint from the pool if a hex repeats.

## Background system (carry over)

- Fixed wash gradient: `linear-gradient(165deg, #FBF1F3 → #FADDE3 48% → #F7F5ED)`.
- Three soft drifting radial blobs (cherry/sky/fairy) at low opacity behind content.
- Tokenize wash + blobs so a future dark mode can dim them (dark mode is optional/out of MVP scope but keep tokens clean).

## Typography — 4-font system

| Tier | Font | Use | CSS var |
|---|---|---|---|
| 1 · Voice | **Schibsted Grotesk** 500–800 | all headlines, display, page/section titles, card titles, stat numbers | `--font-display` |
| 2 · Warmth | **EB Garamond** 500/600 + italics | emotional/greeting moments only (e.g. "Chào, *bạn*") | `--font-serif` |
| 4 · Workhorse | **Plus Jakarta Sans** 500–800 | ~85% of text: body, buttons, pills, labels, chat, meta | `--font-ui` (body default) |

- Load tiers 1/2/4 via one Google Fonts link.
- **Tier 3 (Angleton Script) is PERSONAL-USE-ONLY — do NOT ship it.** Accent words fall back to EB Garamond italic. (See `design/00-logs.md` §3.4.)
- Fallbacks: Schibsted → Plus Jakarta Sans; Garamond → Georgia; Jakarta → system-ui.

### Type scale (anchor values)
- Hero/display: Schibsted `clamp(34–46px)` 700, lh 1.04
- Section h2: Schibsted 25–42px 700
- Card title: Schibsted 17.5px 700
- Body/lead: Plus Jakarta Sans 13–16px 500–600, lh 1.55–1.6, color `#5D646B`
- Buttons: Plus Jakarta Sans 12–14.5px 800
- Pills/eyebrow: Plus Jakarta Sans 11–12px 800

## Shape, spacing, motion

- **Radii:** cards ~20–24px, pills full-round, inputs ~14–16px (match reference soft corners).
- **Shadows:** soft, low-spread, warm-tinted; avoid hard/black drop shadows.
- **Surfaces:** floating white cards on the pink wash; cream cards get a 1px ink-alpha border on pink backgrounds.
- **Motion:** gentle (blob drift ~26s; count-up on stat numbers; subtle hover lifts). Keep it calm — no flashy/random effects.

## shadcn/ui mapping

- Configure shadcn theme so `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--border` resolve to the tokens above (`--primary` → `--accent`).
- Use shadcn `Card`, `Button`, `Input`, `Tabs`, `Progress`, `Dialog` as primitives, then restyle to match the candy-pastel reference (rounded, soft shadows, Jakarta labels).

## Component parallels (reference → new app)

| Reference component (`screens/`) | New app usage |
|---|---|
| `.ccard` candy cards | đề result cards, dashboard stat cards |
| stat pills / `.stat-pill .num` count-up | dashboard metrics (attempts, avg score) |
| chat bubbles (`14-chat.html`) | chatbox messages + result stream |
| progress bar | quiz progress |
| `.btn` (Jakarta 800) | all buttons |
| tag pills / eyebrows | subject tags, topic tags, match-reason chips |

---
*Source of truth for visuals remains `design/00-logs.md`. When in doubt, open the matching `screens/*.html` and match it.*
