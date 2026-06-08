# 07 — Safety & Privacy

---

## Nguyên tắc MVP

Connect to Heal là peer-support consumer app, không phải dịch vụ chẩn đoán hoặc trị liệu chuyên môn. MVP cần đủ an toàn để demo nghiêm túc nhưng không triển khai moderation/phân loại rủi ro phức tạp.

---

## Privacy Rules

- Không hiển thị email, tên thật, số điện thoại, trường học trong match/chat.
- Alias và avatar mặc định là ẩn danh.
- Không cho upload ảnh mặt thật trong MVP.
- Match reason không được tiết lộ dữ liệu nhạy cảm.
- Chat banner nhắc không chia sẻ thông tin cá nhân.

---

## Safety Rules

### Required UI

- Disclaimer ở onboarding hoặc first chat:
  - “Connect to Heal không thay thế tư vấn, chẩn đoán hoặc điều trị chuyên môn.”
- Report button trong chat.
- Reminder trong chat:
  - “Hãy tử tế. Không hỏi thông tin cá nhân. Bạn có thể rời cuộc trò chuyện bất cứ lúc nào.”

### Content Boundary

- Peer reply mock không đưa lời khuyên y khoa.
- Không dùng từ ngữ khẳng định bệnh lý như “bạn bị trầm cảm”.
- App dùng wording “cảm xúc”, “áp lực”, “khó khăn”, “cần được lắng nghe”.

---

## Report Reasons

| Reason | Mô tả |
|---|---|
| `unsafe_language` | Ngôn từ làm user thấy không an toàn |
| `identity_request` | Hỏi thông tin cá nhân |
| `harassment` | Quấy rối, xúc phạm |
| `spam` | Spam/quảng cáo |
| `other` | Lý do khác |

---

## Deferred Safety

Các mục sau không thuộc MVP nhưng nên nằm trong roadmap:

- Moderation queue.
- Tự động phát hiện nội dung nguy cơ cao.
- Crisis resources theo quốc gia/khu vực.
- Counselor escalation.
- Block user.
- Conversation review/audit log.

