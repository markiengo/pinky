# 01 — Business Requirements

---

## 1. Bối cảnh

Sinh viên thường gặp áp lực học tập, cô đơn khi xa nhà, mâu thuẫn tình cảm, định hướng nghề nghiệp mơ hồ và ngại chia sẻ vì sợ bị đánh giá. Connect to Heal giải quyết rào cản tiếp cận bằng một sản phẩm **ẩn danh, nhẹ nhàng, dễ bắt đầu**, giúp người dùng tìm một người đồng cảnh để trò chuyện.

---

## 2. Giá trị cốt lõi

| Giá trị | Mô tả |
|---|---|
| **Ẩn danh** | Giảm áp lực danh tính và hình ảnh cá nhân |
| **Đồng điệu** | Ghép với người có vấn đề tương tự để giảm cảm giác phải giải thích quá nhiều |
| **Dễ dùng** | Không yêu cầu quy trình trị liệu phức tạp; vào app là có thể bắt đầu |
| **Vỗ về bằng UI** | Giao diện pastel, mềm, tối giản, tránh cảm giác bệnh án hoặc app y tế nặng nề |
| **Có đường nâng cấp** | Free giúp trải nghiệm giá trị lõi; paid mở thêm kết nối và hỗ trợ sâu hơn |

---

## 3. Business Model

### Free plan

- 1 active anonymous connection.
- 3 nhóm vấn đề cốt lõi.
- Bài survey cơ bản.
- Chat 1-1 cơ bản.
- Report/block ở mức tối thiểu.

### Paid plan

- Nhiều active connections.
- Nhiều category chi tiết hơn.
- Emoji/reaction pack.
- Nhiều bài test cảm xúc hơn.
- Đánh giá chủ quan sâu hơn.
- Quyền đặt lịch hoặc yêu cầu tư vấn trực tiếp tình hình sức khỏe tinh thần.

MVP chỉ cần mô tả entitlement/paywall và demo state; chưa cần tích hợp payment thật.

---

## 4. Yêu cầu nghiệp vụ

### BR-01: Ẩn danh là mặc định

- Người dùng không thấy email, họ tên thật, trường, số điện thoại của người được match.
- Chat hiển thị alias, avatar trừu tượng, trạng thái online.
- Hệ thống không được gợi ý thông tin định danh trong lý do match.

### BR-02: Onboarding phải ngắn

- Người dùng hoàn thành survey trong 2–4 phút.
- Câu hỏi phải đơn giản, không tạo cảm giác bị chẩn đoán.
- Kết quả survey dùng để match và gợi ý theme, không được trình bày như kết luận y khoa.

### BR-03: Match dựa trên đồng điệu

- MVP dùng 3 nhóm vấn đề: áp lực học tập, cô đơn/thiếu kết nối, tình cảm/cảm xúc.
- Người dùng free chỉ có 1 active match.
- Nếu muốn thêm match, app hiển thị upgrade prompt.

### BR-04: Texting là trải nghiệm chính

- Sau khi match, user vào chat room ngay.
- Chat phải có cảm giác riêng tư: banner ẩn danh, trạng thái người kia, input rõ ràng, tin nhắn nhẹ nhàng.
- Chat demo có thể dùng mocked peer replies.

### BR-05: Theme pack theo đối tượng

- App đề xuất theme dựa trên nhóm vấn đề hoặc mood.
- User luôn có quyền đổi theme trong settings.
- Màu chủ đạo ưu tiên `#B1E6F3` và `#FCC5D9`.

### BR-06: Safety tối thiểu

- Có disclaimer: app không thay thế tư vấn/chẩn đoán chuyên môn.
- Có report button trong chat.
- Có nhắc nhở không chia sẻ thông tin cá nhân.

---

## 5. Success Metrics MVP

| Metric | Target demo |
|---|---|
| Completion | Người xem hiểu sản phẩm trong 30 giây đầu |
| Onboarding | Hoàn thành survey dưới 4 phút |
| Match clarity | Người dùng hiểu vì sao được match |
| Chat usability | Gửi tin nhắn đầu tiên trong 1 thao tác sau match |
| Monetization | Paywall xuất hiện đúng khi free user muốn thêm connection |
| Visual quality | UI tạo cảm giác calming, riêng tư, consumer-ready |

