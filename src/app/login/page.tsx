"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { X, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, null);
  const [dismissed, setDismissed] = useState(false);
  const showError = !!state?.error && !dismissed;

  useEffect(() => {
    if (!state?.error) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDismissed(false);
    const timer = setTimeout(() => setDismissed(true), 5000);
    return () => clearTimeout(timer);
  }, [state?.error]);

  return (
    <div
      className="min-h-dvh flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F2F0F7 0%, #E8E4F2 100%)" }}
    >
      {/* Soft decorative orbs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "rgba(159,122,234,0.12)", filter: "blur(100px)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "rgba(124,111,219,0.10)", filter: "blur(100px)" }}
      />

      {/* ── Centered split-login card ── */}
      <div
        className="relative z-10 w-full max-w-[920px] md:w-[75%] lg:w-[65%] rounded-[28px] overflow-hidden flex flex-col md:flex-row"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(159,122,234,0.25)",
          boxShadow:
            "0 24px 70px rgba(30,27,58,0.10), 0 0 0 1px rgba(159,122,234,0.08), 0 0 40px rgba(159,122,234,0.12)",
        }}
      >
        {/* Left: dreamy illustration */}
        <div className="relative w-full md:w-1/2 min-h-[240px] md:min-h-[560px]">
          <Image
            src="/login-artwork.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(159,122,234,0.25) 0%, rgba(124,111,219,0.15) 50%, rgba(30,27,58,0.20) 100%)",
            }}
          />
        </div>

        {/* Right: white login form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 bg-white">
          <div className="mb-8 flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Crambox logo"
              width={48}
              height={48}
              priority
              className="flex-shrink-0"
              style={{ mixBlendMode: "multiply" }}
            />
            <div>
              <h1
                className="font-sans text-[28px] font-bold tracking-[-0.01em] mb-2"
                style={{ color: "#1E1B3A" }}
              >
                Đăng nhập
              </h1>
              <p
                className="text-sm"
                style={{ color: "#6B6686" }}
              >
                Chào mừng bạn quay lại Crambox
              </p>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              disabled
              className="h-11 rounded-[12px] text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background: "#F7F7FA",
                color: "#1E1B3A",
                border: "1px solid rgba(30,27,58,0.08)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              disabled
              className="h-11 rounded-[12px] text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background: "#F7F7FA",
                color: "#1E1B3A",
                border: "1px solid rgba(30,27,58,0.08)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "rgba(30,27,58,0.08)" }} />
            <span className="text-xs font-semibold" style={{ color: "#8F8AA3" }}>
              hoặc đăng nhập với
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(30,27,58,0.08)" }} />
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-xs font-semibold"
                style={{ color: "#1E1B3A" }}
              >
                Tên đăng nhập
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                className="w-full h-12 px-4 rounded-[12px] text-sm font-medium outline-none transition-all"
                style={{
                  background: "#F7F7FA",
                  border: "1px solid rgba(30,27,58,0.08)",
                  color: "#1E1B3A",
                }}
                placeholder="Nhập tên đăng nhập"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(159,122,234,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(159,122,234,0.10)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(30,27,58,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold"
                style={{ color: "#1E1B3A" }}
              >
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="w-full h-12 px-4 rounded-[12px] text-sm font-medium outline-none transition-all"
                style={{
                  background: "#F7F7FA",
                  border: "1px solid rgba(30,27,58,0.08)",
                  color: "#1E1B3A",
                }}
                placeholder="Nhập mật khẩu"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(159,122,234,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(159,122,234,0.10)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(30,27,58,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full h-12 rounded-[12px] text-sm font-extrabold transition-all hover:-translate-y-px disabled:opacity-60 disabled:translate-y-0 mt-2"
              style={{
                background: "#1E1B3A",
                color: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(30,27,58,0.15)",
              }}
            >
              {pending ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          {/* Demo credentials */}
          <div
            className="mt-6 rounded-[12px] px-4 py-3"
            style={{
              background: "rgba(159,122,234,0.06)",
              border: "1px solid rgba(159,122,234,0.15)",
            }}
          >
            <p
              className="text-xs font-bold"
              style={{ color: "#8F8AA3" }}
            >
              Tài khoản demo:
            </p>
            <div className="mt-2 space-y-1.5 text-xs font-semibold" style={{ color: "#8F8AA3" }}>
              <p>
                <span className="font-bold" style={{ color: "#1E1B3A" }}>huyenmy</span> / my1234 (premium)
              </p>
              <p>
                <span className="font-bold" style={{ color: "#1E1B3A" }}>pinky</span> / pinky1234 (basic)
              </p>
            </div>
          </div>

          {/* Footer link */}
          <p
            className="text-center text-xs font-semibold mt-6"
            style={{ color: "#8F8AA3" }}
          >
            Chưa có tài khoản?{" "}
            <Link
              href="/signup"
              className="font-bold hover:underline"
              style={{ color: "#7C6FDB" }}
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>

      {/* Floating error toast */}
      {showError && state?.error && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-[14px] px-5 py-3.5"
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(192,86,86,0.25)",
            boxShadow: "0 12px 40px rgba(192,86,86,0.15)",
            animation: "float-reveal 0.3s ease-out",
          }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#C05656" }} />
          <span className="font-sans font-semibold text-sm" style={{ color: "#C05656" }}>
            {state.error}
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 p-1 rounded-[6px] transition-colors hover:bg-[rgba(192,86,86,0.08)]"
          >
            <X className="w-4 h-4" style={{ color: "#C05656" }} />
          </button>
        </div>
      )}
    </div>
  );
}
