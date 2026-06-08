# 00 — Tổng quan Connect to Heal

> **Connect to Heal** là web app hỗ trợ sức khỏe tinh thần cho sinh viên thông qua khảo sát cảm xúc, ghép cặp ẩn danh với người có vấn đề tương đồng, và trò chuyện 1-1 trong một không gian an toàn, nhẹ nhàng.

---

## Mục tiêu MVP

| Mục tiêu | Mô tả |
|---|---|
| **Ẩn danh để dám chia sẻ** | Người dùng dùng biệt danh/avatar mặc định; email không lộ trong trải nghiệm chat |
| **Ghép cặp đồng điệu** | Match 1-1 dựa trên nhóm vấn đề, độ tuổi gần nhau, trạng thái cảm xúc và nhu cầu trò chuyện |
| **Texting là luồng chính** | Trọng tâm demo là onboarding → matching → private chat |
| **Frontend đẹp, dễ demo** | Mobile-first, pastel calming UI, theme packs theo đối tượng/ngữ cảnh |
| **Freemium rõ ràng** | Free có 1 kết nối đang hoạt động; Paid mở rộng kết nối, category, bài test, emoji và tư vấn |

---

## Scope MVP

### Trong scope

- Landing page giới thiệu sản phẩm và lời hứa “Không gian an toàn để bạn được lắng nghe”.
- Đăng nhập/khởi tạo session demo bằng email hoặc mock account.
- Onboarding survey: tuổi, nhóm vấn đề, cảm xúc hiện tại, nhu cầu được lắng nghe.
- Gợi ý theme pack theo trạng thái/ngữ cảnh; người dùng có thể đổi theme thủ công.
- Matching room: tìm một người phù hợp và hiển thị lý do match ở mức an toàn.
- 1:1 anonymous chat: gửi/nhận tin nhắn, trạng thái online, banner an toàn, report.
- Freemium paywall: user free bị giới hạn 1 active connection; paid mở thêm quyền.
- Documentation đủ để build frontend demo bằng mock services.

### Ngoài scope MVP

- Tư vấn chuyên gia trực tiếp thật.
- Thanh toán thật, hóa đơn, gia hạn subscription.
- Moderation queue, risk scoring, clinical escalation.
- Matching thời gian thực nhiều người dùng.
- Mobile native app.
- Admin dashboard đầy đủ.

---

## Tech Stack đề xuất

| Layer | Technology | Lý do |
|---|---|---|
| Frontend | Vite + React + TypeScript | Build nhanh, dễ deploy static, đủ mạnh cho demo tương tác |
| Styling | Tailwind CSS | Dễ tạo design system pastel, responsive nhanh |
| Animation | Framer Motion | Micro-interaction mềm, phù hợp cảm giác “vỗ về” |
| Icons | Lucide React | Nhẹ, rõ, dễ đồng bộ visual |
| State | Zustand hoặc React Context | Đủ cho mock auth, theme, entitlements, chat |
| Deploy | Vercel hoặc Netlify | Deploy static nhanh, ít cấu hình |

---

## Luồng demo chính

```text
Landing
  → Start Healing
  → Anonymous Session / Login
  → Intake Survey
  → Suggested Theme Pack
  → Matching Room
  → 1:1 Anonymous Chat
  → Try New Match
  → Upgrade Prompt
```

---

## Map tài liệu

| Task | Docs |
|---|---|
| Product scope | `00-overview.md`, `01-business-requirements.md` |
| Personas | `02-personas.md` |
| User flows | `03-user-stories.md`, `FRONTEND-PLAN.md` |
| SRS/nghiệp vụ | `04-srs-functional-requirements.md` |
| Data shape | `05-data-models.md` |
| Mock API | `06-mock-api-contracts.md` |
| Safety/privacy | `07-safety-privacy.md` |
| UI system | `DESIGN.md` |
| Implementation plan | `FRONTEND-PLAN.md`, `08-roadmap.md` |

