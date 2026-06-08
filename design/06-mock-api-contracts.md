# 06 — Mock API Contracts

> MVP frontend dùng mock service với cùng contract để dễ thay bằng backend thật.

---

## Auth / Session

### `startAnonymousSession()`

```ts
type StartAnonymousSessionResponse = {
  profile: AnonymousProfile;
  entitlement: Entitlement;
};
```

- Tạo anonymous user demo.
- Set default plan `free`.
- Set default theme `blue_calm`.

---

## Survey

### `submitIntakeSurvey(input)`

```ts
type SubmitIntakeSurveyInput = Omit<
  IntakeSurvey,
  "id" | "userId" | "suggestedThemeId" | "createdAt"
>;

type SubmitIntakeSurveyResponse = {
  survey: IntakeSurvey;
  suggestedTheme: ThemePack;
};
```

- Validate đủ category, mood, intensity, support style.
- Gợi ý theme theo rule trong SRS.

---

## Matching

### `findMatch(userId)`

```ts
type FindMatchResponse =
  | { status: "matched"; match: Match; conversation: Conversation }
  | { status: "limit_reached"; upgradeReason: "free_match_limit" };
```

- Nếu free user chưa có active match → trả match.
- Nếu free user đã có active match → trả `limit_reached`.
- Paid user có thể trả nhiều match.

---

## Chat

### `getConversation(conversationId)`

```ts
type GetConversationResponse = {
  conversation: Conversation;
};
```

### `sendMessage(conversationId, body)`

```ts
type SendMessageResponse = {
  message: Message;
  peerReply?: Message;
};
```

- Message rỗng trả validation error.
- Mock peer reply dùng delay 800–1600ms.
- Peer replies nên ngắn, đồng cảm, không đưa lời khuyên y khoa.

---

## Theme

### `setTheme(themeId)`

```ts
type SetThemeResponse = {
  activeTheme: ThemePack;
};
```

- Apply CSS variables hoặc Tailwind class wrapper.
- Persist trong local storage.

---

## Upgrade

### `getEntitlement(userId)`

```ts
type GetEntitlementResponse = {
  entitlement: Entitlement;
};
```

### `mockUpgradeToPaid(userId)`

```ts
type MockUpgradeToPaidResponse = {
  entitlement: Entitlement;
};
```

- Chỉ dùng cho demo.
- Không tích hợp checkout thật trong MVP.

---

## Report

### `submitReport(input)`

```ts
type SubmitReportInput = Omit<Report, "id" | "createdAt">;

type SubmitReportResponse = {
  report: Report;
  message: string;
};
```

- Sau report, conversation có thể giữ `active` hoặc chuyển `reported` tùy demo path.

