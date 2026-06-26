import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const tiers = [
  {
    name: "Free",
    tagline: "Tìm & Luyện",
    price: "0đ",
    period: "miễn phí",
    desc: "Tìm đề, làm quiz, xem lời giải, theo dõi tiến bộ.",
    features: [
      "Kho đề: 150 đề, 5 môn",
      "AI tìm đề (5 lượt/ngày)",
      "Làm bài trắc nghiệm & tự luận",
      "Lời giải chi tiết sau mỗi câu",
      "Lưu 5 lần làm bài gần nhất",
      "Biểu đồ tiến bộ cơ bản",
    ],
    cta: "Bắt đầu miễn phí",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Plus",
    tagline: "AI học cùng bạn",
    price: "49.000đ",
    period: "/tháng",
    desc: "AI đọc tài liệu của bạn và gợi ý ôn tập cá nhân hóa.",
    features: [
      "Tất cả tính năng Free",
      "Không giới hạn lượt AI tìm đề",
      "AI phân tích tài liệu cá nhân (PDF, ảnh)",
      "AI tạo quiz từ tài liệu upload",
      "Flashcards tự động từ đề thi",
      "Phân tích đề cương & gợi ý ưu tiên",
      "Lập kế hoạch ôn thi cơ bản",
      "Lịch sử không giới hạn",
    ],
    cta: "Nâng cấp Plus",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Pro",
    tagline: "Trung tâm điều khiển",
    price: "99.000đ",
    period: "/tháng",
    desc: "AI chạy toàn bộ quá trình ôn thi. Sync với Google, YouTube, Zalo.",
    features: [
      "Tất cả tính năng Plus",
      "AI tự điều chỉnh lịch học khi bỏ lỡ",
      "Phân tích sức khỏe học tập",
    ],
    integrations: [
      { name: "Google Calendar", logo: "https://cdn.simpleicons.org/googlecalendar/F4899A" },
      { name: "YouTube", logo: "https://cdn.simpleicons.org/youtube/F4899A" },
      { name: "Notion", logo: "https://cdn.simpleicons.org/notion/F4899A" },
      { name: "Zalo", logo: null },
    ],
    cta: "Nâng cấp Pro",
    href: "/signup",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-[100dvh] bg-[#E8E4F2]">
      {/* ── NAV ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Crambox logo"
            width={28}
            height={28}
            priority
            style={{ mixBlendMode: "multiply" }}
          />
          <span className="font-sans font-semibold text-[15px]" style={{ color: "#1E1B3A" }}>
            Crambox
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="font-sans text-[14px] font-normal transition-colors duration-200"
            style={{ color: "#5C5875" }}
          >
            Tính năng
          </Link>
          <Link
            href="/#how"
            className="font-sans text-[14px] font-normal transition-colors duration-200"
            style={{ color: "#5C5875" }}
          >
            Cách hoạt động
          </Link>
          <Link
            href="/pricing"
            className="font-sans text-[14px] font-normal transition-colors duration-200"
            style={{ color: "#1E1B3A" }}
          >
            Bảng giá
          </Link>
        </div>
        <Link
          href="/login"
          className="font-sans font-medium text-[14px] rounded-[999px] px-5 py-2.5 transition-all duration-200 btn-press"
          style={{
            background: "rgba(30,27,58,0.06)",
            border: "1px solid rgba(30,27,58,0.12)",
            color: "#1E1B3A",
          }}
        >
          Đăng nhập
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-8 pb-12 px-6 md:px-12">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,27,58,0.06) 0%, transparent 100%)",
          }}
        />
        <div className="relative z-10 max-w-[800px] mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 mb-6 rounded-[999px] px-4 py-2"
            style={{
              background: "rgba(159,122,234,0.08)",
              border: "1px solid rgba(159,122,234,0.15)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: "#9F7AEA" }} />
            <span
              className="font-sans text-[12px] font-medium"
              style={{ color: "#5C5875" }}
            >
              Bảng giá Crambox
            </span>
          </div>
          <h1
            className="font-serif font-normal leading-[1.1] tracking-[-0.02em] mb-5"
            style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#1E1B3A" }}
          >
            Học miễn phí,
            <br />
            nâng cấp khi{" "}
            <em
              className="font-serif italic"
              style={{ color: "#F4899A" }}
            >
              sẵn sàng
            </em>
          </h1>
          <p
            className="font-sans leading-[1.6] max-w-[480px] mx-auto"
            style={{ fontSize: "15px", color: "#5C5875" }}
          >
            Bắt đầu miễn phí với kho đề thi đại học. Nâng cấp Plus hoặc Pro để mở khóa AI cá nhân hóa và tích hợp đầy đủ.
          </p>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className="reveal rounded-[20px] p-8 relative flex flex-col"
              style={{
                animationDelay: `${i * 100}ms`,
                background: tier.highlight
                  ? "linear-gradient(135deg, #1E1B3A 0%, #2A2750 50%, #3D2E5C 100%)"
                  : "#FFFFFF",
                border: tier.highlight
                  ? "1px solid rgba(159,122,234,0.25)"
                  : "1px solid rgba(244,137,154,0.12)",
                boxShadow: tier.highlight
                  ? "0 12px 40px rgba(30,27,58,0.20)"
                  : "0 4px 20px rgba(244,137,154,0.06)",
              }}
            >
              {tier.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[999px] px-4 py-1.5 font-sans font-bold text-[11px] uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(244,137,154,0.30)",
                  }}
                >
                  Phổ biến nhất
                </div>
              )}
              <div className="mb-6">
                <span
                  className="font-sans font-semibold text-[12px] uppercase tracking-[0.08em]"
                  style={{ color: tier.highlight ? "#9F7AEA" : "#F4899A" }}
                >
                  {tier.name}
                </span>
                <div className="font-sans text-[12px] mt-1" style={{ color: tier.highlight ? "rgba(255,255,255,0.5)" : "#8F8AA3" }}>
                  {tier.tagline}
                </div>
                <div className="flex items-baseline gap-1 mt-3">
                  <span
                    className="font-serif font-normal"
                    style={{ fontSize: "40px", color: tier.highlight ? "#FFFFFF" : "#1E1B3A" }}
                  >
                    {tier.price}
                  </span>
                  <span
                    className="font-sans text-[13px]"
                    style={{ color: tier.highlight ? "rgba(255,255,255,0.5)" : "#8F8AA3" }}
                  >
                    {tier.period}
                  </span>
                </div>
                <p
                  className="font-sans mt-3 leading-[1.5]"
                  style={{ fontSize: "14px", color: tier.highlight ? "rgba(255,255,255,0.7)" : "#5C5875" }}
                >
                  {tier.desc}
                </p>
              </div>

              <Link
                href={tier.href}
                className="block w-full text-center font-sans font-semibold text-[14px] rounded-[12px] px-6 py-3.5 transition-all duration-200 btn-press mb-8"
                style={{
                  background: tier.highlight
                    ? "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)"
                    : "rgba(244,137,154,0.08)",
                  color: tier.highlight ? "white" : "#1E1B3A",
                  border: tier.highlight ? "none" : "1px solid rgba(244,137,154,0.15)",
                  boxShadow: tier.highlight ? "0 4px 16px rgba(244,137,154,0.25)" : "none",
                }}
              >
                {tier.cta}
              </Link>

              <div className="space-y-3 flex-1">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#F4899A" }}
                    />
                    <span
                      className="font-sans leading-[1.5]"
                      style={{
                        fontSize: "14px",
                        color: tier.highlight ? "rgba(255,255,255,0.85)" : "#1E1B3A",
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
                {tier.integrations && (
                  <div className="pt-3 mt-1" style={{ borderTop: "1px solid rgba(244,137,154,0.12)" }}>
                    <div className="font-sans font-semibold mb-3" style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.5)" : "#8F8AA3" }}>
                      Tích hợp
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {tier.integrations.map((int) => (
                        <div
                          key={int.name}
                          className="inline-flex items-center gap-2 rounded-[8px] px-3 py-2"
                          style={{
                            background: tier.highlight ? "rgba(255,255,255,0.06)" : "rgba(244,137,154,0.06)",
                            border: "1px solid rgba(244,137,154,0.10)",
                          }}
                        >
                          {int.logo ? (
                            <Image src={int.logo} alt={int.name} width={16} height={16} unoptimized style={{ width: 16, height: 16 }} />
                          ) : (
                            <span className="font-sans font-bold" style={{ fontSize: "11px", color: "#F4899A" }}>Z</span>
                          )}
                          <span className="font-sans font-medium" style={{ fontSize: "12px", color: tier.highlight ? "rgba(255,255,255,0.8)" : "#1E1B3A" }}>
                            {int.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── DISCOUNT CARDS ── */}
        <div className="max-w-[1100px] mx-auto mt-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(159,122,234,0.20), transparent)" }} />
            <span className="font-sans font-semibold text-[12px] uppercase tracking-[0.1em]" style={{ color: "#8F8AA3" }}>
              Tiết kiệm hơn với gói dài hạn
            </span>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(159,122,234,0.20), transparent)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: "Học kỳ",
                sub: "6 tháng",
                save: "~15% off",
                plusPrice: "249.000đ",
                proPrice: "499.000đ",
                dark: false,
              },
              {
                label: "Năm học",
                sub: "12 tháng",
                save: "~25% off",
                plusPrice: "439.000đ",
                proPrice: "899.000đ",
                dark: true,
              },
              {
                label: "Mùa thi",
                sub: "Khuyến mãi giới hạn",
                save: "30–50% off",
                plusPrice: "199.000đ",
                proPrice: "399.000đ",
                dark: false,
                badge: "Limited",
              },
            ].map((d) => (
              <div
                key={d.label}
                className="reveal rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-[3px]"
                style={{
                  animationDelay: "100ms",
                  background: d.dark
                    ? "linear-gradient(135deg, #1E1B3A 0%, #2A2750 100%)"
                    : "#FFFFFF",
                  border: d.dark
                    ? "1px solid rgba(159,122,234,0.25)"
                    : "1px solid rgba(244,137,154,0.12)",
                  boxShadow: d.dark
                    ? "0 8px 28px rgba(30,27,58,0.18)"
                    : "0 4px 16px rgba(244,137,154,0.06)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-sans font-bold" style={{ fontSize: "16px", color: d.dark ? "#FFFFFF" : "#1E1B3A" }}>
                      {d.label}
                    </div>
                    <div className="font-sans mt-0.5" style={{ fontSize: "12px", color: d.dark ? "rgba(255,255,255,0.5)" : "#8F8AA3" }}>
                      {d.sub}
                    </div>
                  </div>
                  <span
                    className="font-sans font-bold rounded-[999px] px-3 py-1"
                    style={{
                      fontSize: "11px",
                      background: d.dark ? "rgba(244,137,154,0.20)" : "rgba(244,137,154,0.10)",
                      color: "#F4899A",
                    }}
                  >
                    {d.save}
                  </span>
                </div>

                {d.badge && (
                  <div
                    className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 mb-4 font-sans font-bold"
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)",
                      color: "white",
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    {d.badge}
                  </div>
                )}

                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans font-medium" style={{ fontSize: "13px", color: d.dark ? "rgba(255,255,255,0.6)" : "#8F8AA3" }}>
                      Plus
                    </span>
                    <span className="font-serif" style={{ fontSize: "18px", color: d.dark ? "#FFFFFF" : "#1E1B3A" }}>
                      {d.plusPrice}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans font-medium" style={{ fontSize: "13px", color: d.dark ? "rgba(255,255,255,0.6)" : "#8F8AA3" }}>
                      Pro
                    </span>
                    <span className="font-serif" style={{ fontSize: "18px", color: d.dark ? "#FFFFFF" : "#1E1B3A" }}>
                      {d.proPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="font-serif font-normal leading-[1.15] mb-4"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#1E1B3A" }}
          >
            Bắt đầu miễn phí hôm nay
          </h2>
          <p
            className="font-sans mb-8"
            style={{ fontSize: "15px", color: "#5C5875" }}
          >
            Không cần thẻ tín dụng. Nâng cấp bất cứ lúc nào.
          </p>
          <Link
            href="/signup"
            className="font-sans font-semibold text-[14px] rounded-[999px] px-7 py-3.5 transition-all duration-200 btn-press inline-flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)",
              color: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(244,137,154,0.25)",
            }}
          >
            Tham gia ngay
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 md:px-12 py-8 border-t"
        style={{ borderColor: "#D9D3E6", background: "#FFFFFF" }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(244,137,154,0.15) 0%, rgba(159,122,234,0.15) 100%)" }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#F4899A" }} />
            </div>
            <span
              className="font-sans font-semibold text-[14px]"
              style={{ color: "#1E1B3A" }}
            >
              Crambox
            </span>
          </div>
          <p
            className="font-sans text-[13px]"
            style={{ color: "#8F8AA3" }}
          >
            Sản phẩm học thuật, vì sinh viên Việt Nam.
          </p>
        </div>
      </footer>
    </div>
  );
}
