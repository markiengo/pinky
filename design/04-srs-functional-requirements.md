# 04 — SRS Functional Requirements

---

## §AUTH — Anonymous Session

### AUTH-01: Start Session

- User bắt đầu bằng CTA `Bắt đầu ẩn danh`.
- MVP có thể dùng mock email/session; không bắt buộc xác thực thật.
- Hệ thống tạo `AnonymousProfile` gồm alias, avatar, age range, plan.
- Email hoặc thông tin thật không xuất hiện trong chat/match UI.

### AUTH-02: Profile Privacy

- Alias mặc định theo format thân thiện, ví dụ `Bạn Đồng Điệu 124`.
- Avatar là illustration/icon trừu tượng, không upload ảnh thật trong MVP.
- User có thể đổi alias nhưng không được nhập số điện thoại, email, link social trong alias.

---

## §SURVEY — Intake Survey

### SURVEY-01: Basic Intake

- Form thu thập:
  - `age_range`
  - `primary_category`
  - `current_mood`
  - `mood_intensity`
  - `support_style`
  - optional `short_note`
- Survey không dùng ngôn ngữ chẩn đoán y khoa.
- Submit survey tạo `IntakeSurvey` và chuyển sang theme suggestion.

### SURVEY-02: Category Selection

- MVP chỉ có 3 core groups:
  - `study_pressure`
  - `loneliness_connection`
  - `relationship_emotion`
- Các category chi tiết hơn nằm ở Paid/Future.

### SURVEY-03: Theme Suggestion

- Hệ thống đề xuất theme dựa trên category/mood:
  - Học tập → `blue_calm`
  - Cô đơn → `sky_friend`
  - Tình cảm/cảm xúc → `pink_gentle`
- User có thể accept hoặc đổi theme.

---

## §MATCH — Anonymous Matching

### MATCH-01: Find Match

- User bấm `Tìm người đồng điệu`.
- Hệ thống tìm một `Match` mock phù hợp với survey.
- Matching screen có loading state 2–4 giây để tạo cảm giác sản phẩm thật.

### MATCH-02: Match Reason

- Match card hiển thị:
  - cùng nhóm vấn đề
  - mood gần nhau
  - kiểu hỗ trợ tương thích
- Không hiển thị thông tin định danh, trường, địa chỉ, contact.

### MATCH-03: Free Plan Limit

- Free user có tối đa 1 `active` match.
- Nếu đã có active match và muốn tạo thêm, hệ thống chuyển sang `UpgradePrompt`.
- User vẫn có thể vào lại chat của active match.

### MATCH-04: Paid Expansion

- Paid user có thể có nhiều active matches.
- Paid unlock thêm category, tests, emoji/reactions, tư vấn.
- MVP có thể dùng mock `plan=paid` để demo.

---

## §CHAT — 1:1 Texting

### CHAT-01: Chat Room

- Chat room gắn với một `Match`.
- Header gồm anonymous alias, online indicator, report action.
- Body gồm message bubbles, timestamp, safe-space card.
- Footer gồm text input, attach/emoji placeholder, send button.

### CHAT-02: Send Message

- User nhập text và bấm send/Enter.
- Tin nhắn rỗng không gửi.
- Sau khi gửi, message hiển thị ngay với status `sent`.
- Mock peer có thể phản hồi sau delay để demo.

### CHAT-03: Safe-Space Reminder

- Chat hiển thị reminder:
  - Không chia sẻ thông tin cá nhân.
  - Đây không thay thế tư vấn chuyên môn.
  - Hãy report nếu thấy không an toàn.

### CHAT-04: Report

- User có thể report cuộc trò chuyện.
- MVP report form gồm reason và optional note.
- Sau khi submit, hiển thị confirmation và gợi ý rời chat nếu cần.

---

## §THEME — Interface Personalization

### THEME-01: Theme Packs

- Theme pack gồm colors, gradient, illustration mood, bubble style.
- App áp theme trên landing, onboarding, match, chat, upgrade.
- Theme switch không làm mất state chat.

### THEME-02: Required Theme Packs

- `blue_calm`: focus, study, clarity.
- `pink_gentle`: emotional softness, relationship support.
- `sky_friend`: connection, loneliness, warmth.

---

## §UPGRADE — Freemium

### UPGRADE-01: Upgrade Trigger

- Trigger khi free user:
  - muốn tạo match thứ 2
  - chọn category nâng cao
  - mở emoji pack
  - mở bài test chuyên sâu
  - bấm tư vấn trực tiếp

### UPGRADE-02: Upgrade Screen

- Hiển thị quyền lợi paid bằng ngôn ngữ tích cực, không shame user.
- Có CTA `Mở rộng kết nối`.
- Có option `Để sau` quay lại chat hiện tại.

