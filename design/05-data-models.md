# 05 — Data Models

> MVP frontend có thể lưu các model này trong mock store/local storage. Đây là data contract để sau này thay bằng backend thật.

---

## AnonymousProfile

```ts
type AnonymousProfile = {
  id: string;
  alias: string;
  avatarKey: string;
  ageRange: "under_18" | "18_20" | "21_24" | "25_plus";
  plan: "free" | "paid";
  activeThemeId: ThemePackId;
  createdAt: string;
};
```

---

## IntakeSurvey

```ts
type IntakeSurvey = {
  id: string;
  userId: string;
  ageRange: AnonymousProfile["ageRange"];
  primaryCategory: IssueCategoryId;
  currentMood: MoodId;
  moodIntensity: 1 | 2 | 3 | 4 | 5;
  supportStyle: "listen" | "share_experience" | "solve_together";
  shortNote?: string;
  suggestedThemeId: ThemePackId;
  createdAt: string;
};
```

---

## IssueCategory

```ts
type IssueCategoryId =
  | "study_pressure"
  | "loneliness_connection"
  | "relationship_emotion";

type IssueCategory = {
  id: IssueCategoryId;
  label: string;
  description: string;
  isPaidOnly: boolean;
};
```

---

## ThemePack

```ts
type ThemePackId = "blue_calm" | "pink_gentle" | "sky_friend";

type ThemePack = {
  id: ThemePackId;
  label: string;
  intent: string;
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
};
```

---

## Match

```ts
type Match = {
  id: string;
  userId: string;
  peerAlias: string;
  peerAvatarKey: string;
  categoryId: IssueCategoryId;
  compatibilityScore: number;
  reasonTags: string[];
  status: "active" | "ended" | "reported";
  conversationId: string;
  createdAt: string;
};
```

---

## Conversation & Message

```ts
type Conversation = {
  id: string;
  matchId: string;
  status: "active" | "ended" | "reported";
  messages: Message[];
  updatedAt: string;
};

type Message = {
  id: string;
  conversationId: string;
  sender: "me" | "peer" | "system";
  body: string;
  status: "sending" | "sent" | "failed";
  createdAt: string;
};
```

---

## Entitlement

```ts
type Entitlement = {
  plan: "free" | "paid";
  maxActiveMatches: number;
  advancedCategories: boolean;
  advancedTests: boolean;
  emojiPacks: boolean;
  directConsultation: boolean;
};
```

---

## Report

```ts
type Report = {
  id: string;
  conversationId: string;
  reason:
    | "unsafe_language"
    | "identity_request"
    | "harassment"
    | "spam"
    | "other";
  note?: string;
  createdAt: string;
};
```

