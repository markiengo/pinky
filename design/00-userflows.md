# Connect to Heal User Flows

This document maps the visual references in `ui-refs/` into concrete product flows, button actions, and static HTML design screens. It should be used before design refinement so every screen has a clear purpose and every button has an intended destination.

The HTML files in `screens/` are design-spec artifacts. They do not need to behave like a functional MVP yet. Links are optional convenience only; the important handoff is the button-to-screen intent below.

## 0. Product Decisions Before Design

These decisions are locked for the first design handoff.

| Decision | Direction |
|---|---|
| UI language | English-first. Vietnamese can be handled later as a migration/localization pass. |
| Main demo audience | Competition/demo audience first, while still feeling believable for real student users. |
| Onboarding shape | Combined flow: `11-onboarding.html` starts with privacy/anonymous profile reassurance, then continues into survey cards. |
| Theme role | Theme is personalization/settings, not a required pre-match step. Do not interrupt the core flow with theme selection. |
| Matching result | Show one strong anonymous match result, not a browse/marketplace list. |
| Mood and journal | Secondary/future flows. They can be linked, but they must not compete with matching/chat as the core product. |
| Paywall timing | Show Plus only after user understands the value of one free active match. |
| Prototype entry | `screens/10-landing.html` is the real user entry point. `screens/09-wireframe.html` is the user-facing Today/Home screen, not an element board. |

## 1. Reference Image Decisions

| Reference | Use in Prototype | Feature or Element Decisions |
|---|---|---|
| `ui-refs/landing.png` | Landing page direction | Use a cinematic first viewport, floating trust tags, strong headline, and a clear primary CTA. Adapt the mood to Connect to Heal's soft pastel safety instead of the dark startup style. |
| `ui-refs/buttons.png` | Shared component language | Use soft raised buttons, pill controls, segmented controls, toggles, sliders, menu rows, and gentle empty states. Keep the current `09-wireframe.html` palette and rounded glass surfaces. |
| `ui-refs/onboarding_survey.png` | Anonymous onboarding and intake | Use one question per soft card, visible progress, Back/Next controls, and low cognitive load. This becomes the model for the intake survey. |
| `ui-refs/theme-switcher.png` | Theme settings and personalization | Use segmented theme modes, accent swatches, comfort/density controls, and a settings-style layout for choosing Blue Calm, Pink Gentle, or Sky Friend. This is not part of the core first-run path. |
| `ui-refs/find_match.png` | Matching result card | Use large anonymous match cards with reason tags, compatibility score, CTA, and a saved/secondary action. Do not use real faces or identity data. |
| `ui-refs/dashboard.png` | Future calm home dashboard | Borrow the ambient room-like feeling and calm central panel, but keep implementation simple and aligned with the existing pastel browser shell. |
| `ui-refs/dashboard2.png` | Future logged-in app shell | Use as inspiration for a left sidebar and dense dashboard cards only on future dashboard screens, not the current main wireframe. Avoid doctor/patient wording. |
| `ui-refs/mood_log.png` | Mood check-in | Use playful abstract mood icons and a simple grid. Mood selection should feed journal and theme suggestions, not medical diagnosis. |
| `ui-refs/journal.png` | Reflective journal | Use a soft notebook/spread layout with prompt card, streak indicator, writing area, and optional mood context. |
| `ui-refs/paywall.png` | Connect Plus upgrade | Use a centered modal/page with blurred backdrop, benefits list, segmented plan state, price/CTA, and a softer tone than a hard sales popup. |

## 2. Primary MVP Flow

```text
screens/10-landing.html
  -> screens/11-onboarding.html
  -> screens/13-find-match.html
  -> screens/14-chat.html
  -> screens/18-paywall.html
```

### Flow: First-Time Anonymous User

1. User lands on `screens/10-landing.html`.
2. User clicks `Start anonymous`.
3. Intended next screen is `screens/11-onboarding.html`.
4. User confirms privacy basics and completes the intake survey:
   - age range
   - main issue category
   - current mood
   - mood intensity
   - support style
   - optional short note
5. User clicks `Find my match`.
6. Intended next screen is `screens/13-find-match.html`.
7. Matching state resolves into one anonymous match card.
8. User understands why the match was suggested:
   - same issue category
   - similar mood range
   - compatible support style
9. User clicks `Enter safe chat`.
10. Intended next screen is `screens/14-chat.html`.

### Flow: Free User Hits Match Limit

1. User is in `screens/14-chat.html` with one active free match.
2. User clicks `Add another connection` or `Try another match`.
3. Intended next screen is `screens/18-paywall.html`.
4. Paywall explains that free users have one active connection and can still return to the current chat.
5. User can click:
   - `Upgrade to Connect Plus` to show paid demo state.
   - `Maybe later` to return to `screens/14-chat.html`.

## 3. Secondary and Future Flows

These screens can be linked from `09-wireframe.html` and the dashboard, but they are not required for the core MVP pitch unless time allows.

### Mood Log Flow

```text
screens/09-wireframe.html or screens/17-dashboard.html
  -> screens/15-mood-log.html
  -> screens/16-journal.html or screens/13-find-match.html
```

- User clicks `Mood check-in`.
- User selects one mood icon and intensity.
- User can continue to `Open journal` or `Find someone with this mood context`.
- Mood language must stay emotional and reflective, not diagnostic.

### Journal Flow

```text
screens/15-mood-log.html or screens/17-dashboard.html
  -> screens/16-journal.html
```

- User clicks `Open journal` or `Reflect`.
- User sees a daily prompt, streak, and writing area.
- User can save a reflection locally in the static prototype as a visual state only.
- Journal may link back to `Find match` when the user wants peer support.

### Theme Settings Flow

```text
screens/09-wireframe.html, screens/14-chat.html, or screens/17-dashboard.html
  -> screens/12-theme-switcher.html
```

- User clicks settings, appearance, or theme.
- User chooses one of three theme packs:
  - Blue Calm for study pressure and focus recovery.
  - Pink Gentle for relationship or emotional support.
  - Sky Friend for loneliness and connection.
- Theme controls should preview the selected palette and return the user to the prior flow.
- This screen is optional personalization. It should never block the user from matching or chatting.

### Future Dashboard Flow

```text
screens/17-dashboard.html
  -> screens/13-find-match.html
  -> screens/14-chat.html
  -> screens/15-mood-log.html
  -> screens/16-journal.html
  -> screens/18-paywall.html
```

- Dashboard is a future logged-in hub, not the current MVP hero.
- It may include a sidebar with:
  - Home / Today
  - Find Match
  - Chat
  - Mood Log
  - Journal
  - Healing Sounds
  - Tests / Insights
  - Connect Plus
  - Settings / Theme

## 4. Button and Navigation Matrix

This is the design-source-of-truth for button behavior. HTML links do not need to be final; use this table to decide what each visible action means.

| Button / Control | Source Screen | Action | Destination | Status |
|---|---|---|---|---|
| `Start anonymous` | `screens/10-landing.html` | Start anonymous session/demo profile | `screens/11-onboarding.html` | MVP |
| `View app home` | `screens/10-landing.html` | Preview returning-user home | `screens/09-wireframe.html` | Demo helper |
| `Back` | `screens/11-onboarding.html` | Return to landing or previous survey card | `screens/10-landing.html` or same screen | MVP |
| `Find my match` | `screens/11-onboarding.html`, `screens/09-wireframe.html` | Submit intake answers and start matching flow | `screens/13-find-match.html` | MVP |
| `Enter safe chat` | `screens/13-find-match.html` | Open active match conversation | `screens/14-chat.html` | MVP |
| `Open safe chat` | `screens/09-wireframe.html`, `screens/17-dashboard.html` | Reopen active conversation | `screens/14-chat.html` | MVP |
| `Send` / composer button | `screens/14-chat.html` | Show sent message state in future implementation | Same screen | MVP |
| `Report` | `screens/14-chat.html` | Open or focus report reasons panel | Same screen | MVP |
| `Add another connection` | `screens/14-chat.html`, `screens/13-find-match.html` | Trigger free-plan limit after one active match | `screens/18-paywall.html` | MVP |
| `Upgrade to Connect Plus` | `screens/18-paywall.html` | Show paid demo state or future paid dashboard | `screens/17-dashboard.html` | MVP demo |
| `Maybe later` | `screens/18-paywall.html` | Dismiss upgrade and keep current active chat | `screens/14-chat.html` | MVP |
| `Mood check-in` | `screens/09-wireframe.html`, `screens/17-dashboard.html` | Open mood picker | `screens/15-mood-log.html` | Secondary |
| `Open journal` | `screens/15-mood-log.html`, `screens/17-dashboard.html` | Open reflective journal | `screens/16-journal.html` | Secondary |
| `Save reflection` | `screens/16-journal.html` | Show saved state in future implementation | Same screen | Secondary |
| `Find support from this` | `screens/15-mood-log.html`, `screens/16-journal.html` | Continue to match using mood/journal context | `screens/13-find-match.html` | Secondary |
| `Theme` / `Settings` | `screens/09-wireframe.html`, `screens/14-chat.html`, `screens/17-dashboard.html` | Open appearance controls | `screens/12-theme-switcher.html` | Secondary |
| `Use Blue Calm` | `screens/12-theme-switcher.html` | Select focus/study theme | Return to prior screen, default `screens/14-chat.html` | Secondary |
| `Use Pink Gentle` | `screens/12-theme-switcher.html` | Select emotional support theme | Return to prior screen, default `screens/14-chat.html` | Secondary |
| `Use Sky Friend` | `screens/12-theme-switcher.html` | Select loneliness/connection theme | Return to prior screen, default `screens/14-chat.html` | Secondary |
| `Deeper test` / Plus locked feature | `screens/09-wireframe.html`, `screens/17-dashboard.html` | Explain locked advanced test | `screens/18-paywall.html` | Plus |
| `Emoji pack` | `screens/14-chat.html` | Explain locked reactions/emoji | `screens/18-paywall.html` | Plus |
| `Direct consultation` | `screens/18-paywall.html`, `screens/17-dashboard.html` | Explain future paid counselor access | `screens/18-paywall.html` | Plus/future |

## 4.1 Screen-Level Design Spec

Use this section as the practical design planning guide if you are not using Figma.

| Screen | User-Facing Purpose | Primary Button | Secondary Buttons | Design Notes |
|---|---|---|---|---|
| `screens/10-landing.html` | First impression and promise | `Start anonymous` -> `screens/11-onboarding.html` | `View app home` -> `screens/09-wireframe.html` | Must communicate anonymous peer support in under 30 seconds. |
| `screens/11-onboarding.html` | Privacy reassurance plus lightweight intake | `Find my match` -> `screens/13-find-match.html` | `Back` -> `screens/10-landing.html` | One-card-at-a-time survey feeling; avoid clinical language. |
| `screens/13-find-match.html` | One compatible anonymous peer result | `Enter safe chat` -> `screens/14-chat.html` | `Add another connection` -> `screens/18-paywall.html` | One result only; no marketplace browsing. |
| `screens/14-chat.html` | Core private conversation | Composer/send stays on same screen | `Report` stays on same screen, `Add another connection` -> `screens/18-paywall.html` | This is the most important MVP screen. Make privacy and comfort obvious. |
| `screens/18-paywall.html` | Explain free limit and Plus expansion | `Upgrade to Connect Plus` -> `screens/17-dashboard.html` | `Maybe later` -> `screens/14-chat.html` | Must not shame user; free still has value. |
| `screens/09-wireframe.html` | Returning-user Today/Home screen | `Find my match` -> `screens/13-find-match.html` or `Open safe chat` -> `screens/14-chat.html` | Mood, Journal, Theme, Plus | This is user-facing home, not an element dump. |
| `screens/12-theme-switcher.html` | Optional personalization | Theme selection returns to prior screen | Sidebar/settings navigation | Do not place this before matching in first-run flow. |
| `screens/15-mood-log.html` | Optional emotional check-in | `Open journal` -> `screens/16-journal.html` | `Find support from this` -> `screens/13-find-match.html` | Secondary feature; useful but not core. |
| `screens/16-journal.html` | Optional reflection | `Save reflection` stays on same screen | `Find support from this` -> `screens/13-find-match.html` | Treat as private context, not diagnosis. |
| `screens/17-dashboard.html` | Future logged-in dashboard | `Open safe chat` -> `screens/14-chat.html` | Mood, settings, Plus | Future app shell; do not let it overtake MVP story. |

## 5. Screen Creation Order

1. Refine `screens/10-landing.html` using the current theme tokens and landing reference composition.
2. Refine `screens/11-onboarding.html` for privacy start plus survey cards.
3. Refine `screens/13-find-match.html` for loading state and one anonymous match result.
4. Refine `screens/14-chat.html` for the core anonymous chat room.
5. Refine `screens/18-paywall.html` for the free-plan limit and Connect Plus.
6. Refine `screens/09-wireframe.html` as the returning-user Today/Home screen.
7. Build secondary screens only after the MVP route is coherent:
   - `screens/12-theme-switcher.html`
   - `screens/15-mood-log.html`
   - `screens/16-journal.html`
   - `screens/17-dashboard.html`

## 6. Screen Design Rules

- Preserve the visual system from `09-wireframe.html`: `Fraunces` headings, `Nunito Sans` UI text, pastel gradients, soft glass cards, rounded chips, and warm cream backgrounds.
- Use English UI copy for the first prototype. Plan Vietnamese as a later localization pass, not mixed copy in the first design set.
- Use multiple standalone HTML files, not one long prototype page.
- Keep `09-wireframe.html` as the current main hub/two-pane wireframe.
- Do not add a persistent sidebar to the current wireframe. Use sidebar navigation only in `17-dashboard.html`.
- Keep all match and chat identities anonymous. Use abstract avatars, aliases, shared reason tags, and online state only.
- Avoid clinical wording. Use emotional, peer-support language.
- Paywall copy should feel supportive: free users still have value, Plus expands options.
- Theme controls are optional personalization and should not be treated like a required onboarding milestone.
- Keep mobile-first proportions around a 390px phone width, then adapt to the desktop browser shell.

## 7. Acceptance Checklist

- Every planned screen has at least one incoming button.
- Every MVP button has exactly one clear destination.
- Plus and future features are clearly labeled so they do not confuse the core MVP.
- Mood, journal, dashboard, and direct consultation are treated as secondary/future unless explicitly promoted.
- The flow demonstrates the product promise in this order: anonymous start, gentle check-in, matching, safe chat, upgrade limit.
- Theme personalization remains available from settings, but it does not interrupt the first-run matching flow.
