import { ArrowRight, BarChart3, Sparkles, MessageSquare, FileText, CheckCircle2, Star, TrendingUp, Calendar, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LogoImage } from "@/components/logo-image";

const testimonials = [
  { face: "/faces/face-1.jpg", name: "Nguyễn Thị An", school: "NEU · Kế toán", quote: "Điểm trung bình tăng từ 6.5 lên 8.2 sau 3 tuần luyện đề.", stars: 5 },
  { face: "/faces/face-2.jpg", name: "Trần Văn Bình", school: "FTU · Tài chính", quote: "AI gợi ý đề chuẩn luôn, không cần lục tìm nhóm Facebook nữa.", stars: 5 },
  { face: "/faces/face-3.jpg", name: "Lê Thị Cherry", school: "UEL · QTKD", quote: "Giao diện đẹp, làm bài như thi thật. Lời giải chi tiết cực kỳ.", stars: 5 },
  { face: "/faces/face-4.jpg", name: "Phạm Minh Đức", school: "RMIT · Finance", quote: "Best exam prep tool I've used in Vietnam. Worth every dong.", stars: 5 },
  { face: "/faces/face-5.jpg", name: "Võ Thị Emma", school: "NEU · Banking", quote: "Lịch sử làm bài giúp mình biết điểm yếu ở đâu để ôn lại.", stars: 4 },
  { face: "/faces/face-6.jpg", name: "Đặng Văn Felix", school: "FTU · Marketing", quote: "150 đề thi thực tế, không phải đề bịa. Rất đáng để dùng.", stars: 5 },
  { face: "/faces/face-7.jpg", name: "Bùi Thị Giang", school: "UEL · Accounting", quote: "Từ 5 điểm lên 7.5 chỉ sau 2 tuần. Cảm ơn Crambox rất nhiều.", stars: 5 },
  { face: "/faces/face-8.jpg", name: "Ngô Văn Henry", school: "NEU · QTKD", quote: "AI tìm đề nhanh hơn mình tự tìm 10 lần. Tiết kiệm cực nhiều thời gian.", stars: 5 },
  { face: "/faces/face-9.jpg", name: "Huỳnh Thị Ivy", school: "FTU · Kế toán", quote: "Lời giải chi tiết từng câu, hiểu bài thay vì học vẹt.", stars: 5 },
  { face: "/faces/face-10.jpg", name: "Lý Văn Jack", school: "RMIT · Business", quote: "The dashboard analytics helped me track real progress. Game changer.", stars: 5 },
] as const;

const pricingTiers = [
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
    integrations: undefined,
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
    integrations: undefined,
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

const steps = [
  {
    num: "01",
    title: "Chat với AI",
    desc: "Mô tả môn học, chủ đề, hoặc trường đại học bạn đang ôn thi.",
  },
  {
    num: "02",
    title: "Làm bài thi",
    desc: "Làm trắc nghiệm và tự luận trong giao diện học thuật, hỗ trợ Markdown.",
  },
  {
    num: "03",
    title: "Xem kết quả",
    desc: "Chấm điểm tức thì, lưu lịch sử, theo dõi tiến bộ qua biểu đồ.",
  },
] as const;


export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] bg-[#E8E4F2]">
      {/* ── HERO — Cinematic background ── */}
      <section className="relative min-h-[100dvh] overflow-hidden">
        {/* Background image — unoptimized Next.js Image */}
        <Image
          src="/background.webp"
          alt="Dreamy cinematic app background"
          fill
          priority
          sizes="100vw"
          unoptimized
          className="object-cover"
        />

        {/* Gradient overlay — darken edges for frosted card legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,27,58,0.30) 0%, rgba(30,27,58,0.08) 20%, rgba(30,27,58,0.08) 60%, rgba(30,27,58,0.60) 100%)",
          }}
        />

        {/* Floating pink petals — decorative */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="petal absolute top-[20%] left-[10%] w-3 h-3 rounded-full" style={{ background: "rgba(244,137,154,0.3)", filter: "blur(2px)", animationDelay: "0s" }} />
          <div className="petal absolute top-[60%] left-[15%] w-4 h-4 rounded-full" style={{ background: "rgba(159,122,234,0.2)", filter: "blur(3px)", animationDelay: "1.5s" }} />
          <div className="petal absolute top-[30%] right-[12%] w-3 h-3 rounded-full" style={{ background: "rgba(244,137,154,0.25)", filter: "blur(2px)", animationDelay: "3s" }} />
          <div className="petal absolute top-[70%] right-[18%] w-5 h-5 rounded-full" style={{ background: "rgba(159,122,234,0.15)", filter: "blur(4px)", animationDelay: "2s" }} />
        </div>

        {/* Nav bar — transparent over illustration */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <div className="flex items-center gap-2.5">
            <LogoImage width={28} height={28} priority />
            <span className="font-sans font-semibold text-[15px] text-white">
              Crambox
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="font-sans text-[14px] font-normal transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Tính năng
            </a>
            <a
              href="#how"
              className="font-sans text-[14px] font-normal transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Cách hoạt động
            </a>
            <Link
              href="/pricing"
              className="font-sans text-[14px] font-normal transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Bảng giá
            </Link>
          </div>
          <Link
            href="/login"
            className="font-sans font-medium text-[14px] rounded-[999px] px-5 py-2.5 transition-all duration-200 btn-press"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "white",
              backdropFilter: "blur(4px)",
            }}
          >
            Đăng nhập
          </Link>
        </nav>

        {/* Hero content — frosted glass card for readability */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6"
          style={{ minHeight: "calc(100dvh - 80px)" }}
        >
          {/* Frosted glass card */}
          <div
            className="rounded-[24px] px-8 md:px-14 py-10 md:py-14 max-w-[680px]"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 8px 40px rgba(30,27,58,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 rounded-[999px] px-4 py-2"
              style={{
                background: "rgba(244,137,154,0.15)",
                border: "1px solid rgba(244,137,154,0.25)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#FBCFE0" }} />
              <span className="font-sans text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.9)" }}>
                150 đề thi · 3,000 câu hỏi · 5 môn học
              </span>
            </div>

            {/* H1 — dreamy headline */}
            <h1
              className="font-serif font-normal leading-[1.08] tracking-[-0.02em] mb-5 text-white"
              style={{ fontSize: "clamp(36px, 5.5vw, 64px)" }}
            >
              Học sâu,{" "}
              <span style={{ background: "linear-gradient(135deg, #F4899A 0%, #FBCFE0 50%, #9F7AEA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              thi chắc
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="font-sans font-normal leading-[1.6] mb-8 max-w-[460px] mx-auto"
              style={{ fontSize: "15px", color: "rgba(255,255,255,0.85)" }}
            >
              Kho đề thi được sàng lọc, AI tìm đề phù hợp syllabus, và giao diện làm bài học thuật, tất cả trong một nền tảng.
            </p>

            {/* Email capture + signup CTAs */}
            <div className="flex flex-col gap-3 items-center">
              <div className="flex items-center gap-2 w-full max-w-[420px]">
                <input
                  type="email"
                  placeholder="email@sinhvien.edu.vn"
                  className="flex-1 font-sans text-[14px] rounded-[999px] px-5 py-3.5 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    color: "white",
                    backdropFilter: "blur(4px)",
                  }}
                />
                <button
                  className="font-sans font-semibold text-[14px] rounded-[999px] px-6 py-3.5 transition-all duration-200 btn-press whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)",
                    color: "white",
                    boxShadow: "0 4px 20px rgba(244,137,154,0.30)",
                  }}
                >
                  Tham gia
                </button>
              </div>
              <Link
                href="/signup"
                className="font-sans font-semibold text-[14px] rounded-[999px] px-7 py-3.5 transition-all duration-200 btn-press inline-flex items-center gap-2"
                style={{
                  background: "white",
                  color: "#1E1B3A",
                  boxShadow: "0 4px 24px rgba(30,27,58,0.15)",
                }}
              >
                Bắt đầu miễn phí
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: "80px",
            background: "linear-gradient(180deg, transparent, #E8E4F2)",
          }}
        />
      </section>

      {/* ── TESTIMONIAL MARQUEE (moved up for early social proof) ── */}
      <section className="py-16 md:py-20 overflow-hidden" style={{ background: "#E8E4F2" }}>
        <div className="mb-8 text-center px-6">
          <h2
            className="font-serif font-normal leading-[1.15] tracking-[-0.01em] mb-2"
            style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#1E1B3A" }}
          >
            Sinh viên từ NEU, FTU, UEL, RMIT
          </h2>
          <p
            className="font-sans leading-[1.6]"
            style={{ fontSize: "14px", color: "#5C5875" }}
          >
            Hàng nghìn lượt luyện đề mỗi tháng.
          </p>
        </div>

        <div className="marquee-track gap-4 px-2">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] rounded-[16px] p-5"
              style={{
                background: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(244,137,154,0.12)",
                boxShadow: "0 4px 16px rgba(244,137,154,0.05)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={t.face}
                  alt={t.name}
                  width={44}
                  height={44}
                  unoptimized
                  className="rounded-full object-cover flex-shrink-0"
                  style={{ width: 44, height: 44 }}
                />
                <div>
                  <div className="font-sans font-bold" style={{ fontSize: "13px", color: "#1E1B3A" }}>
                    {t.name}
                  </div>
                  <div className="font-sans" style={{ fontSize: "11px", color: "#8F8AA3" }}>
                    {t.school}
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-current" style={{ color: "#F4899A" }} />
                ))}
              </div>
              <p className="font-sans leading-[1.5]" style={{ fontSize: "12px", color: "#5C5875" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES — asymmetric bento ── */}
      <section id="features" className="py-20 md:py-28 px-6 md:px-12" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-14 max-w-[560px]">
            <h2
              className="font-serif font-normal leading-[1.15] tracking-[-0.01em] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#1E1B3A" }}
            >
              Mọi thứ bạn cần để ôn thi hiệu quả
            </h2>
            <p
              className="font-sans leading-[1.6]"
              style={{ fontSize: "15px", color: "#5C5875" }}
            >
              Từ tìm đề phù hợp đến phân tích kết quả, tất cả trong một nền tảng.
            </p>
          </div>

          {/* Bento grid: 2-col row + full-width row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Large card: AI chat mockup */}
            <div
              className="reveal rounded-[16px] p-7 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(244,137,154,0.06) 0%, rgba(159,122,234,0.04) 100%)",
                border: "1px solid rgba(244,137,154,0.12)",
                boxShadow: "0 4px 20px rgba(244,137,154,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5" style={{ color: "#F4899A" }} />
                <h3 className="font-sans font-bold" style={{ fontSize: "17px", color: "#1E1B3A" }}>
                  AI tìm đề phù hợp
                </h3>
              </div>
              <p className="font-sans leading-[1.6] mb-5" style={{ fontSize: "14px", color: "#5C5875" }}>
                Chat với AI, nói môn học và chủ đề bạn cần ôn. Hệ thống gợi ý đề thi phù hợp nhất.
              </p>
              {/* Chat bubble mockup */}
              <div className="space-y-2.5">
                <div className="flex justify-end">
                  <div
                    className="rounded-[12px] rounded-tr-[4px] px-4 py-2.5 max-w-[80%] font-sans"
                    style={{ fontSize: "13px", background: "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)", color: "white" }}
                  >
                    Mình cần ôn Kế toán, phần BCTC
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="rounded-[12px] rounded-tl-[4px] px-4 py-2.5 max-w-[85%] font-sans"
                    style={{ fontSize: "13px", background: "white", color: "#1E1B3A", border: "1px solid rgba(244,137,154,0.15)" }}
                  >
                    Gợi ý 3 đề phù hợp: Đề 12 (BCTC cơ bản), Đề 18 (BCTC nâng cao), Đề 23 (Phân tích BCTC).
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 font-sans font-semibold"
                    style={{ fontSize: "12px", background: "rgba(244,137,154,0.10)", color: "#F4899A" }}
                  >
                    <ArrowRight className="w-3 h-3" />
                    Bắt đầu luyện đề 12
                  </div>
                </div>
              </div>
            </div>

            {/* Smaller card: Mini bar chart */}
            <div
              className="reveal rounded-[16px] p-7 relative overflow-hidden"
              style={{
                animationDelay: "100ms",
                background: "linear-gradient(135deg, rgba(244,137,154,0.05) 0%, rgba(244,137,154,0.02) 100%)",
                border: "1px solid rgba(244,137,154,0.12)",
                boxShadow: "0 4px 20px rgba(244,137,154,0.06)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5" style={{ color: "#F4899A" }} />
                <h3 className="font-sans font-bold" style={{ fontSize: "17px", color: "#1E1B3A" }}>
                  Đề thi cấp độ đại học
                </h3>
              </div>
              <p className="font-sans leading-[1.6] mb-5" style={{ fontSize: "14px", color: "#5C5875" }}>
                1,200 câu hỏi khó, bám sát chương trình các trường hàng đầu.
              </p>
              {/* Mini bar chart */}
              <div className="flex items-end gap-2 h-20">
                {[
                  { h: "40%", label: "NEU" },
                  { h: "55%", label: "FTU" },
                  { h: "35%", label: "UEL" },
                  { h: "70%", label: "RMIT" },
                  { h: "50%", label: "Mở" },
                ].map((bar, bi) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-[4px] graph-bar" style={{
                      height: bar.h,
                      background: "linear-gradient(180deg, #F4899A 0%, #E8788A 100%)",
                      animationDelay: `${bi * 80}ms`,
                    }} />
                    <span className="font-sans" style={{ fontSize: "10px", color: "#8F8AA3" }}>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full-width card: Analytics preview */}
          <div
            className="reveal rounded-[16px] p-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
            style={{
              animationDelay: "200ms",
              background: "linear-gradient(135deg, rgba(244,137,154,0.05) 0%, rgba(244,137,154,0.02) 100%)",
              border: "1px solid rgba(244,137,154,0.12)",
              boxShadow: "0 4px 20px rgba(244,137,154,0.06)",
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5" style={{ color: "#F4899A" }} />
                <h3 className="font-sans font-bold" style={{ fontSize: "17px", color: "#1E1B3A" }}>
                  Phân tích kết quả
                </h3>
              </div>
              <p className="font-sans leading-[1.6]" style={{ fontSize: "14px", color: "#5C5875" }}>
                Xem lịch sử làm bài, biểu đồ tiến bộ, điểm trung bình theo từng môn học. Biết mình yếu ở đâu để ôn lại.
              </p>
            </div>
            {/* Inline sparkline */}
            <div className="relative">
              <svg viewBox="0 0 300 100" className="w-full h-auto">
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F4899A" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#F4899A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,80 C40,70 60,55 100,50 C140,45 160,30 200,25 C240,20 260,15 300,10 L300,100 L0,100 Z" fill="url(#sparkGrad)" />
                <path d="M0,80 C40,70 60,55 100,50 C140,45 160,30 200,25 C240,20 260,15 300,10" fill="none" stroke="#F4899A" strokeWidth="2.5" strokeLinecap="round" className="graph-path" />
                {[
                  { x: 0, y: 80 },
                  { x: 100, y: 50 },
                  { x: 200, y: 25 },
                  { x: 300, y: 10 },
                ].map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r="4" fill="#F4899A" stroke="white" strokeWidth="1.5" className="graph-dot" style={{ animationDelay: `${400 + i * 150}ms` }} />
                ))}
              </svg>
              <div className="flex items-center justify-between mt-2">
                <span className="font-sans text-[11px]" style={{ color: "#8F8AA3" }}>Tuần 1</span>
                <span className="font-sans font-bold text-[12px]" style={{ color: "#F4899A" }}>+27% tiến bộ</span>
                <span className="font-sans text-[11px]" style={{ color: "#8F8AA3" }}>Tuần 8</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANALYTICS GRAPH SECTION ── */}
      <section className="py-20 md:py-28 px-6 md:px-12" style={{ background: "linear-gradient(180deg, #FFF0F5 0%, #FCE8F1 50%, #E8E4F2 100%)" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-10 text-center">
            <h2
              className="font-serif font-normal leading-[1.15] tracking-[-0.01em] mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#1E1B3A" }}
            >
              Số liệu nói lên sự tiến bộ
            </h2>
            <p
              className="font-sans leading-[1.6] max-w-none mx-auto mb-6 whitespace-nowrap"
              style={{ fontSize: "15px", color: "#5C5875" }}
            >
              Theo dõi điểm số, phân tích theo môn, và nhìn thấy mình tốt lên mỗi ngày.
            </p>
            {/* Inline stats row (merged from old stats bar) */}
            <div className="inline-flex items-center gap-6 rounded-[999px] px-6 py-3" style={{ background: "rgba(255,255,255,0.60)", border: "1px solid rgba(244,137,154,0.12)" }}>
              {[
                { num: "60", label: "đề thi" },
                { num: "1,200", label: "câu hỏi" },
                { num: "3", label: "môn học" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-serif font-normal" style={{ fontSize: "22px", color: "#F4899A" }}>{s.num}</span>
                  <span className="font-sans" style={{ fontSize: "13px", color: "#5C5875" }}>{s.label}</span>
                  {i < 2 && <span style={{ color: "#D9D3E6" }}>·</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Soft glow behind cards */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-[40px]"
              style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(244,137,154,0.10) 0%, transparent 70%)" }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress line chart card */}
              <div
                className="rounded-[20px] p-7"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(244,137,154,0.15)",
                  boxShadow: "0 8px 32px rgba(244,137,154,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-sans font-bold mb-1" style={{ fontSize: "16px", color: "#1E1B3A" }}>
                      Điểm trung bình
                    </h3>
                    <span className="font-sans" style={{ fontSize: "13px", color: "#8F8AA3" }}>
                      8 tuần gần nhất
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-[999px] px-3 py-1.5" style={{ background: "rgba(244,137,154,0.10)" }}>
                    <TrendingUp className="w-3.5 h-3.5" style={{ color: "#F4899A" }} />
                    <span className="font-sans font-semibold text-[12px]" style={{ color: "#F4899A" }}>+27%</span>
                  </div>
                </div>
                {/* SVG line chart */}
                <svg viewBox="0 0 400 180" className="w-full h-auto" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F4899A" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F4899A" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#9F7AEA" />
                      <stop offset="100%" stopColor="#F4899A" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  {[40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#E8E4F2" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  {/* Area fill */}
                  <path
                    d="M0,140 C50,130 80,110 120,95 C160,80 200,70 240,55 C280,40 320,35 360,25 L400,20 L400,180 L0,180 Z"
                    fill="url(#lineGrad)"
                  />
                  {/* Line path */}
                  <path
                    d="M0,140 C50,130 80,110 120,95 C160,80 200,70 240,55 C280,40 320,35 360,25 L400,20"
                    fill="none"
                    stroke="url(#strokeGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="graph-path"
                  />
                  {/* Data dots */}
                  {[
                    { x: 0, y: 140 },
                    { x: 120, y: 95 },
                    { x: 240, y: 55 },
                    { x: 400, y: 20 },
                  ].map((d, i) => (
                    <circle
                      key={i}
                      cx={d.x}
                      cy={d.y}
                      r="5"
                      fill="#F4899A"
                      stroke="white"
                      strokeWidth="2"
                      className="graph-dot"
                      style={{ animationDelay: `${500 + i * 200}ms` }}
                    />
                  ))}
                </svg>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-sans text-[12px]" style={{ color: "#8F8AA3" }}>Tuần 1</span>
                  <span className="font-sans text-[12px]" style={{ color: "#8F8AA3" }}>Tuần 8</span>
                </div>
              </div>

              {/* Subject breakdown bars card */}
              <div
                className="rounded-[20px] p-7"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(159,122,234,0.15)",
                  boxShadow: "0 8px 32px rgba(159,122,234,0.08)",
                }}
              >
                <div className="mb-5">
                  <h3 className="font-sans font-bold mb-1" style={{ fontSize: "16px", color: "#1E1B3A" }}>
                    Phân tích theo môn
                  </h3>
                  <span className="font-sans" style={{ fontSize: "13px", color: "#8F8AA3" }}>
                    Điểm trung bình từng môn
                  </span>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "Kế toán", score: 8.2, color: "linear-gradient(90deg, #9F7AEA 0%, #7C6FDB 100%)", delay: "0ms" },
                    { label: "Tài chính – Ngân hàng", score: 7.5, color: "linear-gradient(90deg, #7C6FDB 0%, #9F7AEA 100%)", delay: "150ms" },
                    { label: "Quản trị Kinh doanh", score: 7.8, color: "linear-gradient(90deg, #F4899A 0%, #E8788A 100%)", delay: "300ms" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans font-medium" style={{ fontSize: "14px", color: "#1E1B3A" }}>
                          {s.label}
                        </span>
                        <span className="font-sans font-bold" style={{ fontSize: "14px", color: "#F4899A" }}>
                          {s.score.toFixed(1)}/10
                        </span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(244,137,154,0.08)" }}>
                        <div
                          className="h-full rounded-full graph-bar"
                          style={{
                            width: `${s.score * 10}%`,
                            background: s.color,
                            animationDelay: s.delay,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mini stat row */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-5" style={{ borderTop: "1px solid rgba(244,137,154,0.10)" }}>
                  {[
                    { icon: Zap, label: "Streak", value: "12 ngày" },
                    { icon: Calendar, label: "Đề đã làm", value: "23 đề" },
                    { icon: Star, label: "Hoàn thành", value: "78%" },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <m.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: "#F4899A" }} />
                      <div className="font-sans font-bold" style={{ fontSize: "14px", color: "#1E1B3A" }}>{m.value}</div>
                      <div className="font-sans" style={{ fontSize: "11px", color: "#8F8AA3" }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — split layout ── */}
      <section
        id="how"
        className="py-20 md:py-28 px-6 md:px-12 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 20%, rgba(168,230,207,0.18) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 85% 80%, rgba(159,122,234,0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 50% 50%, rgba(186,220,255,0.15) 0%, transparent 60%), #F7F5FB",
        }}
      >
        <div
          className="max-w-[1040px] mx-auto rounded-[28px] px-8 md:px-14 py-14 md:py-20"
          style={{
            background: "#FFFFFF",
            boxShadow: "0 8px 60px rgba(159,122,234,0.06)",
          }}
        >
          {/* Heading area */}
          <div className="mb-12 md:mb-16 text-center">
            <span
              className="font-sans font-semibold text-[13px] uppercase tracking-[0.08em] mb-3 block"
              style={{ color: "#B8A4E8" }}
            >
              Cách hoạt động
            </span>
            <h2
              className="font-serif font-normal leading-[1.15] tracking-[-0.01em] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#1E1B3A" }}
            >
              Ba bước đơn giản
            </h2>
            <p
              className="font-sans leading-[1.6] max-w-[420px] mx-auto"
              style={{ fontSize: "14px", color: "#8F8AA3" }}
            >
              Ôn thi nhanh hơn, làm bài rõ ràng hơn, theo dõi tiến bộ dễ dàng hơn.
            </p>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch">
            {/* Left — pastel study dashboard illustration */}
            <div className="relative pt-8">
              {/* Pink glow behind */}
              <div
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 40% 40%, rgba(244,137,154,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Pill badge — placed above the card, outside content */}
              <div
                className="relative inline-flex items-center gap-2 mb-4"
                style={{ transform: "rotate(-3deg)" }}
              >
                <span
                  className="font-sans font-semibold rounded-full px-4 py-2"
                  style={{
                    fontSize: "12px",
                    color: "#9F7AEA",
                    background: "#FFFFFF",
                    boxShadow: "0 4px 16px rgba(159,122,234,0.15)",
                  }}
                >
                  Bắt đầu ôn thi
                </span>
                <svg width="40" height="28" viewBox="0 0 40 28" fill="none" style={{ marginLeft: -4 }}>
                  <path
                    d="M2 2 C 12 2, 22 10, 34 22"
                    stroke="#9F7AEA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M29 19 L 35 23 L 31 27"
                    stroke="#9F7AEA"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Dashboard card */}
              <div
                className="relative rounded-[20px] p-5 md:p-6"
                style={{
                  background: "linear-gradient(160deg, #FDF6F8 0%, #F5F0FA 100%)",
                  border: "1px solid rgba(159,122,234,0.08)",
                  boxShadow: "0 8px 32px rgba(30,27,58,0.06)",
                }}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                      style={{ background: "rgba(244,137,154,0.12)" }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: "#F4899A" }} />
                    </div>
                    <span
                      className="font-sans font-bold"
                      style={{ fontSize: "14px", color: "#1E1B3A" }}
                    >
                      Dashboard ôn thi
                    </span>
                  </div>
                  <span
                    className="font-sans font-medium rounded-full px-2.5 py-1"
                    style={{
                      fontSize: "10px",
                      color: "#9F7AEA",
                      background: "rgba(159,122,234,0.08)",
                    }}
                  >
                    5 môn
                  </span>
                </div>

                {/* Quiz cards */}
                <div className="space-y-2.5 mb-4">
                  {[
                    { label: "Kế toán · BCTC", progress: 72, color: "#9F7AEA" },
                    { label: "Tài chính · Tín dụng", progress: 45, color: "#F4899A" },
                    { label: "QTKD · Marketing", progress: 88, color: "#A8E6CF" },
                  ].map((quiz, j) => (
                    <div
                      key={j}
                      className="rounded-[12px] p-3 flex items-center gap-3"
                      style={{ background: "#FFFFFF", border: "1px solid rgba(159,122,234,0.06)" }}
                    >
                      <div
                        className="rounded-[6px] flex-shrink-0 flex items-center justify-center"
                        style={{ width: 32, height: 32, background: `${quiz.color}18` }}
                      >
                        <FileText className="w-4 h-4" style={{ color: quiz.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="font-sans font-medium mb-1.5 truncate"
                          style={{ fontSize: "12px", color: "#1E1B3A" }}
                        >
                          {quiz.label}
                        </div>
                        <div
                          className="rounded-full h-1.5 overflow-hidden"
                          style={{ background: "rgba(30,27,58,0.06)" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${quiz.progress}%`, background: quiz.color }}
                          />
                        </div>
                      </div>
                      <span
                        className="font-sans font-bold flex-shrink-0"
                        style={{ fontSize: "11px", color: "#8F8AA3" }}
                      >
                        {quiz.progress}%
                      </span>
                    </div>
                  ))}
                </div>

                {/* PDF upload chip + subject tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-[8px] px-2.5 py-1.5"
                    style={{ background: "rgba(244,137,154,0.08)" }}
                  >
                    <FileText className="w-3.5 h-3.5" style={{ color: "#F4899A" }} />
                    <span className="font-sans font-medium" style={{ fontSize: "11px", color: "#F4899A" }}>
                      PDF đã upload
                    </span>
                  </div>
                  {["Kế toán", "Tài chính", "QTKD"].map((tag) => (
                    <span
                      key={tag}
                      className="font-sans font-medium rounded-full px-2.5 py-1"
                      style={{
                        fontSize: "10px",
                        color: "#8F8AA3",
                        background: "rgba(159,122,234,0.06)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating "Bộ đề ôn tập" mini card */}
              <div
                className="absolute rounded-[14px] p-3.5"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 8px 28px rgba(30,27,58,0.10)",
                  width: 180,
                  bottom: -16,
                  right: -8,
                }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-6 h-6 rounded-[7px] flex items-center justify-center"
                    style={{ background: "rgba(244,137,154,0.10)" }}
                  >
                    <FileText className="w-3.5 h-3.5" style={{ color: "#F4899A" }} />
                  </div>
                  <span
                    className="font-sans font-bold"
                    style={{ fontSize: "12px", color: "#1E1B3A" }}
                  >
                    Bộ đề ôn tập
                  </span>
                </div>
                <div className="space-y-1.5">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="rounded-[6px] h-5 flex items-center px-2 gap-1.5"
                      style={{ background: "rgba(159,122,234,0.04)" }}
                    >
                      <div
                        className="rounded-[3px] flex-shrink-0"
                        style={{
                          width: 10,
                          height: 10,
                          background:
                            j === 0
                              ? "rgba(244,137,154,0.30)"
                              : j === 1
                                ? "rgba(159,122,234,0.22)"
                                : "rgba(168,230,207,0.35)",
                        }}
                      />
                      <div
                        className="rounded-[2px] flex-1"
                        style={{
                          height: 4,
                          background: "rgba(30,27,58,0.07)",
                          width: `${70 - j * 12}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — vertical step list */}
            <div className="relative pt-8">
              <div className="relative pl-10">
                {/* Connector line — spans from step 01 to step 03 only */}
                <div
                  className="absolute w-[2px] rounded-full"
                  style={{
                    left: "19px",
                    top: "20px",
                    bottom: "20px",
                    background: "#E8E4F2",
                  }}
                />
                {/* Active line section (step 01) */}
                <div
                  className="absolute w-[2px] rounded-full"
                  style={{
                    left: "19px",
                    top: "20px",
                    height: "calc(33.33% + 12px)",
                    background: "#9F7AEA",
                  }}
                />

                <div className="space-y-14">
                  {steps.map((step, i) => {
                    const icons = [MessageSquare, FileText, BarChart3];
                    const Icon = icons[i];
                    const active = i === 0;
                    return (
                      <div key={step.num} className="relative flex items-start gap-4">
                        {/* Icon box */}
                        <div
                          className="flex-shrink-0 w-10 h-10 rounded-[12px] flex items-center justify-center relative z-10"
                          style={{
                            background: active ? "rgba(159,122,234,0.12)" : "#FFFFFF",
                            border: active
                              ? "1px solid rgba(159,122,234,0.20)"
                              : "1px solid #E8E4F2",
                          }}
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: active ? "#9F7AEA" : "#8F8AA3" }}
                          />
                        </div>
                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-baseline gap-2 mb-1.5">
                            <span
                              className="font-sans font-bold"
                              style={{ fontSize: "11px", color: "#B8A4E8", letterSpacing: "0.04em" }}
                            >
                              {step.num}
                            </span>
                            <h3
                              className="font-sans font-bold"
                              style={{ fontSize: "16px", color: "#1E1B3A" }}
                            >
                              {step.title}
                            </h3>
                          </div>
                          <p
                            className="font-sans leading-[1.6]"
                            style={{ fontSize: "13px", color: "#8F8AA3" }}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 md:py-28 px-6 md:px-12" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-12 text-center">
            <span
              className="font-sans font-semibold text-[13px] uppercase tracking-[0.08em] mb-3 block"
              style={{ color: "#F4899A" }}
            >
              Bảng giá
            </span>
            <h2
              className="font-serif font-normal leading-[1.15] tracking-[-0.01em] mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 42px)", color: "#1E1B3A" }}
            >
              Học miễn phí, nâng cấp khi sẵn sàng
            </h2>
            <p
              className="font-sans leading-[1.6] max-w-[460px] mx-auto"
              style={{ fontSize: "15px", color: "#5C5875" }}
            >
              Bắt đầu với gói Free. Nâng cấp Plus hoặc Pro khi bạn cần thêm sức mạnh AI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <div
                key={tier.name}
                className="reveal rounded-[20px] p-7 relative flex flex-col"
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
                <div className="mb-5">
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
                      style={{ fontSize: "36px", color: tier.highlight ? "#FFFFFF" : "#1E1B3A" }}
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
                    style={{ fontSize: "13px", color: tier.highlight ? "rgba(255,255,255,0.7)" : "#5C5875" }}
                  >
                    {tier.desc}
                  </p>
                </div>
                <Link
                  href={tier.href}
                  className="block w-full text-center font-sans font-semibold text-[14px] rounded-[12px] px-6 py-3.5 transition-all duration-200 btn-press mb-6"
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
                <div className="space-y-2.5 flex-1">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: tier.highlight ? "#F4899A" : "#F4899A" }}
                      />
                      <span
                        className="font-sans leading-[1.4]"
                        style={{
                          fontSize: "13px",
                          color: tier.highlight ? "rgba(255,255,255,0.85)" : "#1E1B3A",
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                  {tier.integrations && (
                    <div className="pt-3 mt-1" style={{ borderTop: "1px solid rgba(244,137,154,0.12)" }}>
                      <div className="font-sans font-semibold mb-2.5" style={{ fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.5)" : "#8F8AA3" }}>
                        Tích hợp
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tier.integrations.map((int) => (
                          <div
                            key={int.name}
                            className="inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5"
                            style={{
                              background: tier.highlight ? "rgba(255,255,255,0.06)" : "rgba(244,137,154,0.06)",
                              border: "1px solid rgba(244,137,154,0.10)",
                            }}
                          >
                            {int.logo ? (
                              <Image src={int.logo} alt={int.name} width={14} height={14} unoptimized style={{ width: 14, height: 14 }} />
                            ) : (
                              <span className="font-sans font-bold" style={{ fontSize: "10px", color: "#F4899A" }}>Z</span>
                            )}
                            <span className="font-sans font-medium" style={{ fontSize: "11px", color: tier.highlight ? "rgba(255,255,255,0.8)" : "#1E1B3A" }}>
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
          <p
            className="font-sans text-center mt-8"
            style={{ fontSize: "13px", color: "#8F8AA3" }}
          >
            Giá học kỳ và năm học tiết kiệm đến 25%. Không cần thẻ tín dụng để bắt đầu.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-32 px-6 md:px-12" style={{ background: "linear-gradient(180deg, #FCE8F1 0%, #E8E4F2 100%)" }}>
        <div className="max-w-[700px] mx-auto text-center">
          <h2
            className="font-serif font-normal leading-[1.15] tracking-[-0.01em] mb-5"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "#1E1B3A" }}
          >
            Bắt đầu luyện thi hôm nay
          </h2>
          <p
            className="font-sans mb-10 leading-[1.6]"
            style={{ fontSize: "16px", color: "#5C5875" }}
          >
            Tạo tài khoản miễn phí. Làm bài ngay. Xem kết quả tức thì.
          </p>
          <Link
            href="/signup"
            className="font-sans font-semibold text-[15px] rounded-[999px] px-8 py-4 transition-all duration-200 btn-press inline-flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #F4899A 0%, #E8788A 100%)",
              color: "white",
              boxShadow: "0 4px 24px rgba(244,137,154,0.25)",
            }}
          >
            Tham gia ngay
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p
            className="font-sans mt-6"
            style={{ fontSize: "13px", color: "#8F8AA3" }}
          >
            Miễn phí. Không cần thẻ tín dụng.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="px-6 md:px-12 py-8 border-t"
        style={{ borderColor: "#D9D3E6", background: "#FFFFFF" }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <LogoImage width={24} height={24} />
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
