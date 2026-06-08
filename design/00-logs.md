# Connect to Heal — Design Checkpoint (v8)

> **Source of truth for the static design-spec prototype in `screens/`.** Read this FIRST before touching anything under `docs-connect-to-heal/`. It **supersedes the visual sections of `DESIGN.md`** (the old glassy 3-theme system) and the repo `DESIGN.md` pastel direction. When designing or editing a screen, copy an existing screen as scaffold and pull every value from here.
>
> Last updated: 2026-06-08 · Style law: `memos/UI_ref.png` · Color pools: `memos/palette2.png` → `memos/palette1.png`

---

## 1. File Map & Routes

```
docs-connect-to-heal/
  docs/
    00-logs.md             ← this file (the design checkpoint / source of truth)
  screens/
    screens.css            ← single shared stylesheet (all tokens + components)
    10-landing.html        ← scroll-story landing (entry)
    11-onboarding.html     ← playful identity onboarding (nickname/gender/seed/pot) + step 5 launch hub — first visit only
    12-theme-switcher.html ← settings · appearance (visual-only)
    13-find-match.html     ← searching → 2 match results
    14-chat.html           ← safe chat (core screen)
    16-journal.html        ← journal · daily check-in + mood stats
    17-dashboard.html      ← logged-in home ("Hello, Quiet Deer")
    18-paywall.html        ← Connect Plus
    19-connections.html    ← "Your circle" connections grid
    20-blog-post.html      ← self-help article page
```

### Flow shape (v5 — dashboard-first)

`landing → onboarding → ENTER MY SPACE → dashboard (home base)`. Matching, check-ins, blogs, and the circle all start FROM home; chat's back button returns home. The app is a place you live in, not a funnel.

**Demo-day consistency story**: streak = 6 days, today not yet checked in — dashboard calendar shows 6 dots + today hollow-dashed, snapshot card says "no check-in yet", journal's Save flips to 🌸 7-day state.

### Button / route matrix (additions on top of USERFLOWS.md §4)

| Control | Source | Destination |
|---|---|---|
| `Start anonymous` | 10 | 11 (auto-skips → 17 if `cth` saved) |
| `Start Growing` (saves localStorage) | 11 step 4 | 11 step 5 (launch hub) |
| Launch hub `Find someone to talk to` | 11 step 5 | 13 |
| Launch hub `Log your mood` | 11 step 5 | 16 |
| Launch hub `See your personal dashboard` / `skip to my space` | 11 step 5 | 17 |
| `✦ more seeds with Plus` teaser | 11 step 3 | 18 |
| `Find someone who truly understands` (hello-sub) | 17 | 13 |
| Ask-state chips → `Find my match` | 13 | same screen: ask → searching → results |
| `Enter safe chat with [alias]` | 13 | 14 |
| Garden mini widget / garden pane | 17 / 16 | 16 / — |
| `Add another connection` / locked features | 13, 14, 19 | 18 |
| Convo-panel locked slots + `Add another connection` foot | 14 | 18 |
| Convo-panel Mochi Bunny row | 14 | 19 |
| Convo-panel Night Fern row | 14 | **no nav — active thread highlight** |
| `Maybe later` | 18 | 14 |
| Chat back button | 14 | 17 |
| "Most helpful today" cards (all 4) | 17 | 20 |
| Category tabs (All/Study/Lonely/Relation) | 17 | **no nav — visual blog filters** (Deep tests lock → 18) |
| Blog banner strip `Explore all posts` | 17 | 20 |
| Stat pill 1 (days tracking) / `Check in now` / snapshot card | 17 | 16 |
| Stat pill 2 (conversations) | 17 | 14 |
| Stat pill 3 (friends made) / `1 active connection` pill / rail users icon | 17, 14 | 19 |
| Rail journal icon | all app-shell screens | 16 |
| `Save today's check-in` → saved state → `Find support from this` / `Back to home` | 16 | 13 / 17 |
| Settings gear (rail bottom + aside top) | app-shell screens | 12 |
| Night Fern card | 19 | 14 |
| `← Go back`, `Back to home` | 12, 20 | 17 |
| Article end CTA | 20 | 13 |

Rule: every screen has ≥1 incoming link; every button exactly one destination.

---

## 2. Color System

### Pools (priority order)
1. **palette2.png (pinks)**: cherry blossom `#F7ADC3` · fairy tale `#FCC5D9` · mimi pink `#FADDE3` · floral white `#F7F5ED` · sky blue `#72DDF7`
2. **palette1.png (blues)**: anti-flash `#EFEFEF` · non-photo `#B1E6F3` · sky `#72DDF7` · argentinian `#79B8F4` · vista `#8093F1`

### Tokens (`screens.css :root`)

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#17191C` | text, black pills, active states |
| `--muted` / `--faint` | `#8A9097` / `#B6BCC2` | secondary / tertiary text |
| `--line` / `--line-soft` | `#EDEFF2` / `#F3F4F6` | hairlines |
| `--c-pink` | `#FCC5D9` | candy card (fairy) |
| `--c-cream` | `#F7F5ED` | candy card (floral white, +1px ink-α border on pink bg) |
| `--c-lilac` | `#C9D0FA` | candy card (vista tint) |
| `--c-mint` | `#B1E6F3` | candy card (non-photo blue); peer chat bubbles |
| `--c-blue` | `#BCD9FB` | candy card (argentinian tint) |
| `--accent` | `#F7ADC3` | **RESERVED**: wipes, best-match card (`.ccard.blossom`), hearts, progress fills, selection ticks |
| `--accent-deep` | `#E98CAB` | calendar dots, small accent details |
| `--sky-pop` | `#72DDF7` | rare blue pop |
| `--good` / `--good-ink` | `#C9F2B3` / `#2F6B2A` | semantic positive pill |
| `--star` | `#F6B51E` | rating stars |

### Emotion colors (semantic — exempt from pool)

| Feeling | UI chips `--emo-*` (saturated, onboarding mood faces) | Graph tints `--emt-*` (pastelized, charts only) |
|---|---|---|
| overwhelmed | `#FFB4A2` | `#F7B8C8` |
| anxious | `#FFD39A` | `#FBDFC0` |
| down (sad = blue) | `#5C7CB8` | `#A8BEE8` |
| numb | `#C4CBD4` | `#D8DDE3` |
| lonely | `#9B98D9` | `#C9D0FA` |
| restless | `#F6E27F` | `#F6ECC0` |
| okay | `#9DDBAD` | `#BFE8CC` |

### Collision rule
The page's main accent (`--accent` cherry) must never be reused by a sibling element on the same page. Background is mimi/floral, so no flat-mimi card surfaces. Before adding any colored element, check its page for the same hex; if found, re-tint from the pool.

### Background system
- `body::before` (fixed, z -2): wash `linear-gradient(165deg, var(--bg-wash-1) → var(--bg-wash-2) 48% → var(--bg-wash-3))` — light defaults `#FBF1F3 → #FADDE3 → #F7F5ED`; identical on every page.
- `body::after` (fixed, z -1, inset -22%, blur 6px): three radial blobs — `var(--blob-cherry)` Ø340 · `var(--blob-sky)` Ø300 · `var(--blob-fairy)` Ø220 (light `rgba(247,173,195,.62)`/`rgba(114,221,247,.34)`/`rgba(252,197,217,.45)`) — drifting via `blobfloat` 26s alternate.
- Per page only the blob positions change (`--b1/--b2/--b3` on `body.bg-*`): landing, onboarding, match, chat, plus, home, settings, friends, blog.
- The wash + blobs are now **tokenized** so dark mode dims them (see Dark mode below).

### Dark mode — "Warm dark calm" (v8)

**Opt-in only.** Dark mode activates *exclusively* when the user picks **Dark** in Appearance (screen 12). There is **no** `prefers-color-scheme` rule — the OS theme never triggers it. Mechanism:
- Settings writes `localStorage['cth_theme'] = 'light' | 'dark'` (separate from the `cth` identity object; default light). It is the **only** writer.
- Every screen carries a tiny **pre-paint head script** (right after `<meta charset>`, before the stylesheet) that adds `dark` to `<html>` when `cth_theme === 'dark'` — prevents a light flash on load:
  `<script>try{if(localStorage.getItem('cth_theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}</script>`
- All dark values live in one `html.dark { … }` block in `screens.css` (overrides `:root`).

**Semantic token layer** (added to `:root`; ~250 former hardcoded literals now route through these so the theme is a single swap):

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ink` | `#17191C` | `#ECE6EA` | primary text **and** "black pill" fills (pills invert → light pill, dark text) |
| `--on-ink` | `#FFF` | `#1B1620` | text/icons sitting on `--ink` fills |
| `--surface` | `#FFF` | `#2A2230` | floating panels, cards, pills, inputs |
| `--surface-2` / `--surface-sel` | `#F6F7F8` / `#FAFBFC` | `#332A3A` / `#38303F` | recessed rails·hovers / selected fills |
| `--glass` / `--glass-soft` | `rgba(255,255,255,.9/.7)` | `rgba(42,34,48,.82/.6)` | translucent card surfaces |
| `--text-2` / `--text-3` | `#5D646B` / `#3C434A` | `#B8AEB6` / `#C8C0C6` | secondary copy / prose |
| `--ink-soft`/`-mid`/`-faint` | ink @ .74/.58/.4 | `#ECE6EA` @ .82/.62/.42 | text on candy cards (3 alpha tiers) |
| `--c-pink`/`-cream`/`-lilac`/`-mint`/`-blue` | candy pastels | `#3B2731`/`#322D24`/`#2D2C47`/`#1F3A40`/`#243650` | candy cards → muted darkened tints |
| `--bg-wash-1/2/3`, `--blob-*` | pink wash | `#1C151B`/`#241A22`/`#1A1419` + blobs @ ~⅓ opacity | page background |
| `--accent` / `--accent-deep` | `#F7ADC3` / `#E98CAB` | **kept** | reserved accent reads on dark unchanged |

**Exempt from theming (stay saturated in both modes):** `--emo-*` mood faces, `--emt-*` chart tints, garden (`--pot/-dark/-soil/-stem/-leaf/-pz-*`, bloom colorways), status dots (green `#34C759` / amber `#F0B35E`), `--good`/`--good-ink`, `--star`, and the saturated MCQ swatches (`.sw-pb3/-pb4/-vista/-bloom`, `.sw-mimi/-orchid`). Decorative warm surfaces (quote-paper, article-hero) get explicit `html.dark` overrides.

> **Adding a color to a screen?** Use a semantic token (`--surface`, `--text-2`, `--ink-*`, candy `--c-*`) — never a raw `#fff`/`rgba(23,25,28,…)` literal, or it will be stuck in light mode. Inputs/textareas need explicit `background: var(--surface)` (UA default is white).

---

## 3. Typography

### 3.1 The four-font system

The product runs a 4-tier font hierarchy with strict role separation.
**Logic: Schibsted *announces* → Garamond *comforts* → Angleton *delights* → Jakarta *does the work*.**

| Tier | Font | Weights | Personality | Speaks where | CSS hook |
|---|---|---|---|---|---|
| **1 · Voice** | Schibsted Grotesk | 500–800 (display 700–800) | confident, modern, structural | ALL headlines & display: hero, `.display`, page titles, `.ccard h3`, stat numbers, modal/panel titles | `--font-display` |
| **2 · Warmth** | EB Garamond | 500/600 + italics | soft, human, literary | Emotional moments only: `.hello` greetings ("Hello, *Quiet Deer*"), `.pullquote`, `.reminder-card .quote`, profile `.me .name` | `--font-serif` |
| **3 · Flourish** | Angleton Script *(trial)* | single weight | handwritten, intimate, calligraphic | 1–2 accent **words** inside Tier-1 headlines ("*safe*", "*heard*") AND **pot names** (`.pot-name` — handwriting on the pot band) | landing accents via `angleton.css`; `.pot-name` on 11/16/17 |
| **4 · Workhorse** | Plus Jakarta Sans | 500–800 | neutral, legible, friendly | Everything functional (~85% of text): body, `.lead`, buttons, pills, labels, chat `.msg`, meta/footnotes | `--font-ui` (body default) |

### 3.2 Loading

- Tiers 1/2/4: one Google Fonts `<link>` on every page:
  `Schibsted Grotesk 500–800 · Plus Jakarta Sans 500–800 · EB Garamond ital,wght 0,500/0,600/1,500/1,600`
- Tier 3: `screens/angleton.css`, linked from `10-landing.html`, `11-onboarding.html`, `16-journal.html`, `17-dashboard.html` (landing accents + pot names). The OTF (`angleton-script-font/AngletonScript_PERSONAL_USE_ONLY.otf`, 186 KB) is embedded as a **base64 data-URI** because browsers block `file://`→`file://` font fetches — never switch it to a relative `url()`.
- Fallback chains: Angleton → `EB Garamond italic` → Georgia; Schibsted → Plus Jakarta Sans; Jakarta → system-ui. Removing `angleton.css` degrades gracefully to Garamond italics.

### 3.3 Usage rules (do / don't)

- ✅ Angleton on **1–2 words max**, always inside a Schibsted headline, `font-style: normal` (the script is already cursive — italics would double-slant), sized `~1.06em` with `0.06em` side padding for entry/exit strokes.
- ✅ Garamond for any sentence-length warm copy; Angleton never for sentences (script kills legibility past a couple of words).
- ✅ One Angleton word per line of headline at most ("A *safe* space / to be *heard*" works because each script word owns its line).
- ❌ Never set body copy, buttons, pills, or chat messages in Tier 1–3 fonts — those are Jakarta's.
- ❌ Never use Garamond AND Angleton in the same phrase — pick the warmth tier the moment calls for.
- ❌ No new fonts without updating this section; four tiers is the ceiling.
- Promotion path (pending client + license): Angleton may take over Garamond's *accent-word* duties app-wide ("Your *circle*", "Make it feel like *yours*"); Garamond keeps quotes/greetings.

### 3.4 Angleton licensing ⚠️

The local OTF is **PERSONAL USE ONLY** (Måns Grebäck). A commercial license — mansgreback.com/angleton-script — is **required before any public/competition build**. If not licensed: delete `screens/angleton.css` + its `<link>`s; accents fall back to EB Garamond italic automatically. Licensed bonus features: swash tails via trailing underscores (`heard_`), stylistic/contextual alternates, ligatures.

⚠️ **Demo-font watermark trap**: the free OTF renders digits (and most punctuation) as "PERSONAL USE ONLY" watermark glyphs. `angleton.css` therefore carries a `unicode-range` limiting Angleton to `A–Z a–z space ' - ’` — digits in pot names etc. intentionally fall through to Garamond. After buying the license, swap in the full OTF and the `unicode-range` can be removed.

### 3.5 Type scale

| Role | Font | Size | Weight | Notes |
|---|---|---:|---:|---|
| Garamond greeting `.hello` | EB Garamond | clamp(40–58px) | 500 | name in `<em>` italic; 👋 `.wave` waves twice |
| Hero display (landing) | Schibsted Grotesk | clamp(48–84px) | 700 | ls -0.025em; one italic Garamond accent word |
| Display `.display` | Schibsted Grotesk | clamp(34–46px) | 700 | lh 1.04 |
| Section h2 (story/qcard) | Schibsted Grotesk | 25–42px | 700 | |
| Card title `.ccard h3` | Schibsted Grotesk | 17.5px | 700 | lh 1.22 |
| Mini card `.mini-ccard h4` | Schibsted Grotesk | 14px | 700 | lh 1.35 |
| Stat number `.stat-pill .num` | Schibsted Grotesk | 27px | 800 | count-up on load |
| Pull-quote / reminder | EB Garamond italic | 18–20px | 500 | |
| Body / lead `.lead` | Plus Jakarta Sans | 13–16px | 500–600 | lh 1.55–1.6, color `#5D646B` |
| Buttons `.btn` | Plus Jakarta Sans | 12–14.5px | 800 | |
| Pills `.tagpill/.ratepill/.eyebrow` | Plus Jakarta Sans | 11–12px | 800 | |
| Section label | Plus Jakarta Sans | 13px | 800 | |
| Meta/caption `.meta/.footnote` | Plus Jakarta Sans | 10.5–11.5px | 600 | low contrast |
| Kicker/qnum | Plus Jakarta Sans | 10.5–11px | 800 | uppercase, ls 0.14em |

---

## 4. Shape, Depth, Spacing

- Radii: panels `26px` (`--r-panel`) · cards `20px` (`--r-card`) · everything clickable = pill `999px` · match cards `30px` · qcard/modal `24–26px`.
- Shadows: panels `0 18px 50px rgba(31,42,50,.10)` · hover pop `0 14px 34px rgba(23,25,28,.10)` · modals `0 30px 80px rgba(23,25,28,.3)`.
- App shell: `.app` grid `80px | 1fr | 352px`, 16px gaps + 16px page padding; rail/aside/chat-col are floating white panels. `.app.no-aside` drops the third column. Chat uses `.app.chat-shell` (`80px | 300px | 1fr`): rail + conversations sidebar + chat column; the sidebar hides ≤1080px.
- Flow screens center a single column on the gradient: `.qcard` 580px · match `.result` 1000px · `.pay-card` 520px · article sheet ~720px.
- Tap targets ≥ 40px; icons 15–17px inline SVG (lucide-style, stroke 2, round caps).
- **125% zoom pages**: landing, onboarding, blog use `body.bg-* { zoom: 1.25 }` (ctrl+-equivalent). Any `100vh/svh` element on a zoomed page must compensate with `calc(100xvh / 1.25)`. App-shell screens (dashboard, chat, settings, circle) and match/paywall stay at 100% — **except journal**, which upscales its whole shell 10% via `body.bg-journal .app { zoom: 1.1; height: calc(100vh / 1.1) }` (zoom the `.app`, not body, so the fixed quote-overlay backdrop stays full-viewport).
- **Journal quote popup**: the post-check-in plant card `.quote-paper` is `zoom: 1.3` (whole pane +30%).
- **Scroll-column rule**: direct children of `.main`/`.aside` get `flex-shrink: 0` — flex columns must scroll, never squash content (regression guard).

---

## 5. Component Inventory (`screens.css`)

| Component | Classes | Notes |
|---|---|---|
| Buttons | `.btn` + `black/white/mint` + `sm/lg` | spring hover (translateY -3px scale 1.03), `:active` squash .95 |
| Icon button | `.icon-btn` (+`.active` = black circle) | rail + headers |
| Rail | `.rail` > `.brand`, `nav` (gray pill container), `.spacer`, bottom gear + self `.ava` | brand = black rounded heart |
| Tabs | `.tabs` > `.tab` (+`.active`) | active = black pill; locked tab uses `.lock` icon → paywall |
| Pills | `.tagpill` `.ratepill` `.eyebrow` `.goodpill` `.wide-pill` `.mini-drop` | always white unless semantic |
| Candy card | `.ccard` + `pink/cream/lilac/mint/blue/blossom` > `.row`, `h3`, `.foot`, `.meta`, `.face-stack` | `blossom` = reserved accent |
| Avatars | `.ava` + `sm/lg/xl` + color + `.online` | emoji chibi; `.face-stack` overlaps -9px, `.more` black count |
| Stat pill | `<a class="stat-pill">` > `.num[data-count]`, `.lab`, `.arrow` (span) | whole pane is the link; count-up JS |
| Journal insights (v7) | `.insights-row > .insight-card[--tint]` (plain-language "so what", bold keyword) · `.pixel-wrap > .pixel-dow + .pixel-grid > .pixel-cell(.future/.today) > .pixel-tip` (month-in-pixels heatmap, 36px cells, `--cell` mood tint, `--i` stagger) · `.streak-card > .streak-ring` (SVG dasharray, `--ring-off`, cherry fill = legit reserved-accent progress) | **replaces the old `.mood-graph`** on journal (16). Mock `MONTH_MOODS` in 16's JS; today ringed, future dashed. Insight copy MUST be warm + hedged ("tends to"/"usually") + non-diagnostic |
| Mood graph (retired) | `.mood-graph` CSS still present, unused | superseded by the v7 insights block |
| Calendar | `.cal` > `.cal-grid` (`.dow/.day/.dim/.dot/.today/.hollow`), `.streak`; `.cal.expanded` = dashboard variant (38px cells) | dots = `--accent-deep`, today checked = ink fill, today pending = `.hollow` dashed cherry |
| Check-in block | `.checkin-block` (dashboard) > `.head` + `.cal.expanded` + `Check in now` → 16 | "Have you checked in *today* yet?" |
| Blog strip | `.blog-strip` (blue tint — collision-safe on pink) | dashboard → 20 |
| Snapshot | `.snapshot-card` (aside, cream) | today's check-in status → 16 |
| Breath / reminder | `.breath-card` (`breathe` 8s) · `.reminder-card` (Garamond quote) + `.slim` variants | calm corner of the dashboard right pane |
| Journal check-in | `.checkin-card` > mood-grid + intensity + note + `.checkin-saved` bloom state | save flips form → 🌸 saved |
| Journal entries | `.entry-list` > `.entry-row` (`.when/.mood-dot/.body/.score`) | mood-dot uses `--emt-*` |
| Survey shell | `.flow-wrap`, `.progress-dashes`, `.qcard`, `.step(.on)`, `.priv-row`, `.qnav` | onboarding scaffold |
| Onboarding v6 | `.nick-input`+`.nick-note`, `.pick-grid > .pick-card(.sel)` (gender/seed), `.seed-teaser` | tap-only identity steps |
| Launch hub | `.launch-list > .launch-card` (`.lc-ico`/`.lc-txt b+small`/`.lc-arrow`) | onboarding step 5 ("Welcome in"); 3 link cards → 13/16/17; Garamond `.hello` greeting personalized with nickname |
| Mood picker | `.mood-grid.compact` (4×4) > `.mood.compact(.sel)`+`.tickdot` | 16 emotions + full-width "something else"; multi-select; `--emo-*` faces |
| Intensity | `.intensity` range `step="any"` | TRUE float, **no numeric readout ever** (no user-facing quantifier); labels 12.5px |
| Garden | `.garden-stage` > `.watercan`+`.droplet d1–3`, `.plant[data-stage=0–15][data-seed]` (`.sprout/.stem/.leaf l1–l4/.bud/.bloom(petals+core)`), `.pot-wrap` > `.soil/.pot-rim/.pot` > `.band > .pot-name` | **15 stages** (one per daily check-in): soil→sprout→leaves unfurl (l1@3,l2@5,l3@8,l4@11)→stem rises→bud@13→full bloom@15; seeds rose/orchid/daisy keep flower colors. **Chevron-pop pot**: navy `--pot` base + 3 bright zigzag rows (`--pz-teal/-pink/-yellow`), cream Angleton name; `.pat-*` classes retained for JS compat but render identically; kawaii `.face` hidden |
| Garden pane / mini | `.garden-pane` (journal — stretches to match the check-in card via `.journal-top{align-items:stretch}`; `.garden-stage` flexes so the plant grows into the height; `.growth-track` = 15 segments + label; `.gstatus thirsty/happy`) · `.garden-mini` (dashboard aside, scaled 0.46, `:has([data-stage])` heights 0–15) | both render from localStorage; journal demo fallback seeds stage 6 (matches the 6-day-streak story) |
| Quote card | `.overlay` > `.quote-paper` (`paperpop`, rotate -2°, Garamond quote, ✕) | random from 10-quote pool in 16's JS — warm-but-blunt tone |
| Journal2 panes | `.count-duo > .count-pane` (Garamond numbers) · `.entry-grid > .entry-pane` (mood-tinted gradient, `.ibar` intensity bar — bar, not number) | per `ui-refs/journal2.png` |
| Match | `.match-stage`, `.searching` (pulse rings + `.orbit-ava`), `.result`, `.match-grid`, `.match-card(.sel)`, `.match-id`, `.reason-pills`, `.match-why` (click-reveal), `.pick-hint` | best match = `.blossom` + preselected |
| Chat | `.chat-col`, `.chat-head`, `.chat-body`, `.safe-card` (lilac), `.msg.peer` (mint) `.msg.me` (ink), `.msg-time`, `.typing`, `.composer-bar/-input`, `.emoji-lock`+`.padlock`, `.send-btn` | send appends + mock reply 0.9–1.6s; airy spacing: body pad 36/40, msg pad 16/22 + 18px gaps, 56px composer/send |
| Convo panel | `.convo-panel` > `.convo-head`, `.convo-list` > `.convo-row(.active/.locked)` (`.convo-who/.convo-name/.convo-preview/.convo-time`, locked `.slot`+`.padlock`), `.convo-foot` | chat-only sidebar; `.active` tinted `--c-blue` (mint taken by peer bubbles — collision rule); locked rows + foot pill → 18 |
| Modal | `.overlay(.on)` > `.modal` | report flow with 5 reasons (07-safety-privacy.md) |
| Paywall | `.pay-backdrop` (blurred app), `.pay-wrap`, `.pay-card`, `.plus-badge`, `.seg`, `.benefit(-list)`, `.price-line` | supportive tone |
| Landing | `.topnav`, `.hero` (`.hi h1–h4` stagger), `.float-chip fc1–4`, `.scroll-hint`, `.story`, `.steps/.stepcard`, `.voices/.voice`, `.safety`, `.plus-strip`, `.landing-footer` | reveals via IntersectionObserver |
| Wipe | `.wipe` (+`.cover`) | see motion |

### Avatar emoji registry
🦌 Quiet Deer = **you** (mint) · 🦉 Night Fern (lilac, active match) · 🐰 Mochi Bunny (pink, candidate) · crowd/voices: 🦊 Sleepy Fox (cream) · 🐻 Cloud Bear (blue) · 🐸 Pond Frog (mint) · 🐢 🐱 🦝 🐹 🦔 as fillers. Never faces, photos, names, or emails.

---

## 6. Motion Conventions

| Pattern | Spec |
|---|---|
| Slice wipe (every page) | `.wipe` skewX(-6°) cherry→fairy gradient; **in**: `wipeout` 690ms `cubic-bezier(.5,0,.2,1)` (`+0.05s` delay) on load; **out**: JS adds `.cover` (`wipein` 370ms, same easing) on internal `.html` link click, navigates after 380ms. Timings tuned 15% slower + gentler easing for a smoother glide (v7); keep the three values in lockstep — nav delay must ≥ `wipein` duration so the cover finishes before navigating |
| Spring hovers | `cubic-bezier(.34,1.56,.64,1)` ~280ms; cards lift -3px |
| Stagger pop | `.pop p1–p6`, `poppin` 550ms, delays 0.25s + 0.08s steps |
| Scroll reveal | `.reveal` (+`left/right` slide-in 44px), threshold .18, once |
| Idle loops | `floaty` 5.5–7s (chips/voices) · `breathe` 8s · `blobfloat` 26s · `pulse`/`orbit` (searching) · `wave` 2×  |
| Bars | `barup` scaleY bottom-origin 700ms |
| Reduced motion | all animations/transitions ~0ms; `.reveal/.pop` forced visible; `.wipe { display:none }`; instant nav |

Shared nav-intercept snippet (bottom of every page) skips `#` anchors and honors reduced-motion.

---

## 7. Copy & Tone

- English-first; warm, non-clinical peer-support voice ("what's weighing on you", never diagnoses).
- Chat is lowercase-casual; peer replies short + empathetic, no medical advice.
- Paywall is supportive: "One connection is yours, free — forever"; never shame.
- Disclaimers in `.footnote`: app ≠ counseling/diagnosis/treatment.
- Safety UI: safe-space card in chat, report with 5 reasons, privacy promises in onboarding step 0.

---

## 8. Checklist for any new screen

1. Copy an existing screen as scaffold (head fonts, `body.bg-*`, `.wipe` div, rail if app-shell, nav script).
2. Add a `body.bg-<name>` rule with three blob positions.
3. Pull all colors from §2 — run the collision check.
4. Garamond for the page greeting; Schibsted for titles; Jakarta for UI.
5. Black pill = primary action; white pill = secondary; lock → `18-paywall.html`.
6. Add entrance motion (`.pop` or `.reveal`) + at least one delightful micro-interaction.
7. Update the route matrix (§1) and keep every button wired.
8. Verify with a headless Edge screenshot (CSS animations freeze mid-flight in captures — expected).
9. **Tooling rule**: edit these files ONLY with proper UTF-8 tools — PowerShell `Get-Content`/`Set-Content` without explicit encoding mangles the BOM-less UTF-8 (em-dashes → `â€"`, emoji → `ðŸ¦Œ`). If bulk text-replace is unavoidable, use `[IO.File]::ReadAllText/WriteAllText($p, $s, [Text.Encoding]::UTF8)`.

---

## 9. Garden & Demo State (localStorage)

**Identity rule**: the typed nickname is PRIVATE (device-only) — greetings ("Hello, Mai") and pot label. Matches/chat always see the anonymous alias (🦌 Quiet Deer). Never blend the two.

**Theme key** — separate from `cth`: `localStorage['cth_theme']` = `'light' | 'dark'` (default light, written only by screen 12's Mode toggle). Applied pre-paint by the head script on every screen — see §2 *Dark mode*. Kept out of the `cth` object so the identity contract below is untouched.

**Contract** — key `cth`:
```json
{ "name": "Mai", "gender": "female", "seedType": "rose|orchid|daisy",
  "potName": "Mai’s pot", "plantStage": 0–5, "lastWateredDate": "YYYY-MM-DD|null" }
```
- Written by 11 (`Start Growing`); onboarding is ALWAYS accessible (no accounts, no auto-skip — re-running it re-plants the garden); `#0–#4` deep-link to steps for design review
- Read by 17 (greeting, aka-sub, mini garden) and 16 (garden pane, daily gate)
- **Watering loop (16)**: Save check-in → can tilts + droplets (~1.9s) → plant `nudge` + `plantStage++` (cap 5) → quote card (10-pool, warm-but-blunt, in 16's JS) → dismiss persists `lastWateredDate` = today → saved state. One watering per calendar day; "↺ reset demo day" (16 footer) clears the date, "↺ reset demo" (11 footer) clears everything.
- New emotion tokens: angry `#F08C8C` · stressed `#E6A06B` · hurt `#E58CB0` · guilty `#B3A08C` · confused `#C9B8E8` · grateful `#F5B8D0` · hopeful `#A8D8F0` · tired `#9AA8C0` (+ matching `--emt-*` tints)
- Plant stages must stay visually distinct: 0 soil · 1 sprout · 2 stem+leaf · 3 taller+2 leaves · 4 bud · 5 bloom (petal colorway by seed)
