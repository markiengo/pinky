# Frontend Implementation Plan

---

## 1. Target Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Zustand or React Context
- Deploy: Vercel/Netlify static hosting

Rationale: fastest polished frontend deployment while keeping enough app structure for onboarding, matching, chat, paywall, and theme state.

---

## 2. Visual Baseline From `09-wireframe.html`

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `blueSoft` | `#B1E6F3` | Calm primary, study/focus surfaces |
| `blueSky` | `#72DDF7` | Bright accent, highlights |
| `blueVista` | `#8093F1` | Trust/security accent, send buttons |
| `pinkSoft` | `#FCC5D9` | Emotional warmth, relationship/support cards |
| `pinkMimi` | `#FADDE3` | Soft pink surfaces |
| `cream` | `#F7F5ED` | Warm app background |
| `ink` | `#24313A` | Primary text |
| `muted` | `#73808A` | Secondary text |
| `surface` | `rgba(255,255,255,0.78)` | Glass cards/panels |
| `line` | `rgba(36,49,58,0.10)` | Borders/dividers |

### Fonts

- Display/headline: `Fraunces`, fallback `Georgia`, serif.
- Body/UI: `Nunito Sans`, fallback `system-ui`, sans-serif.
- Avoid clinical/enterprise fonts for the consumer MVP.

### Type Scale

| Element | Size | Weight | Notes |
|---|---:|---:|---|
| Hero heading | `48–74px` desktop, `44px` mobile | `600–700` | `Fraunces`, tight line-height `0.92` |
| Lead paragraph | `16px` | `400` | Line-height `1.55` |
| Section title | `15px` | `700–800` | Compact dashboard labels |
| Card title | `20px` | `800` | Line-height `1.1` |
| Chip/action label | `12px` | `900` | Rounded pill UI |
| Meta/caption | `10–12px` | `800–900` | Muted secondary information |

### Layout Notes

- Current wireframe uses a two-pane layout: main product workspace on the left and compact anonymous profile/chat preview on the right.
- A persistent sidebar should be planned for the future logged-in app shell, but not forced into the current hero wireframe.
- Suggested actions belong inside the main “Find someone who truly understands” workspace.

---

## 3. Suggested Project Structure

```text
src/
  app/
    App.tsx
    routes.tsx
  components/
    ui/
    layout/
    chat/
    survey/
    matching/
    upgrade/
  data/
    mockCategories.ts
    mockThemes.ts
    mockPeers.ts
  services/
    mockAuthService.ts
    mockSurveyService.ts
    mockMatchingService.ts
    mockChatService.ts
    mockUpgradeService.ts
  store/
    sessionStore.ts
    themeStore.ts
  types/
    models.ts
  styles/
    globals.css
```

---

## 4. Routes

| Route | Purpose |
|---|---|
| `/` | Landing |
| `/start` | Anonymous session start |
| `/onboarding` | Intake survey |
| `/theme` | Theme suggestion/selection |
| `/match` | Matching room/result |
| `/chat/:conversationId` | 1:1 anonymous chat |
| `/upgrade` | Freemium upgrade screen |
| `/settings` | Theme/profile/plan settings |

---

## 5. State

### Session State

- `profile`
- `entitlement`
- `survey`
- `activeMatches`
- `activeConversationId`

### Theme State

- `activeThemeId`
- `setTheme(themeId)`
- CSS variables applied to root wrapper.

### Chat State

- `conversations`
- `sendMessage(conversationId, body)`
- `simulatePeerReply(conversationId)`
- `submitReport(conversationId, reason)`

---

## 6. Implementation Order

### Sprint 1 — Foundation

- Initialize Vite React TS app.
- Configure Tailwind.
- Add CSS variables for theme packs.
- Add base UI components: Button, Card, Chip, TextInput, ScreenShell.

### Sprint 2 — Landing & Anonymous Start

- Build landing with pastel hero.
- Build anonymous start screen.
- Create mock session.

### Sprint 3 — Survey & Theme

- Build multi-step intake survey.
- Add category/mood/support-style chips.
- Add theme suggestion screen and theme switcher.

### Sprint 4 — Matching

- Build matching loading state.
- Add match result card.
- Enforce free one-match limit.
- Route limit state to upgrade.

### Sprint 5 — Chat

- Build chat header, bubbles, safe-space banner, composer.
- Implement mock send and delayed peer reply.
- Add report modal.

### Sprint 6 — Upgrade & Polish

- Build upgrade screen.
- Add paid mock toggle for demo.
- Add responsive desktop shell.
- Add Framer Motion transitions.

---

## 7. Demo Data

Use 3 peer profiles:

- Study peer: same academic pressure, support style `solve_together`.
- Connection peer: loneliness, support style `listen`.
- Emotion peer: relationship/emotional issue, support style `share_experience`.

Peer replies should be warm and short:

- “Mình hiểu cảm giác đó. Bạn muốn kể thêm không?”
- “Bạn không cần phải giải thích thật hoàn hảo đâu.”
- “Mình cũng từng bị vậy, mình đang nghe đây.”

Avoid medical advice or diagnosis.

---

## 8. Acceptance Checklist

- Landing communicates product in under 30 seconds.
- User can complete onboarding and receive a theme suggestion.
- User can get one anonymous match and enter chat.
- User can send messages and see mock replies.
- Free user sees upgrade when trying to create a second match.
- Theme changes affect all core screens.
- Mobile UI is polished at `390px` width.
- No real identity is shown in match/chat.
