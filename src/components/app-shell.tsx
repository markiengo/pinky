"use client";

import Link from "next/link";
import { LogoImage } from "@/components/logo-image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  MessageSquare,
  History,
  User,
  LogOut,
  CalendarClock,
  FileSearch,
  HeartPulse,
  Layers,
} from "lucide-react";
import { logoutAction as logout } from "@/lib/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/library", icon: Library, label: "Thư viện" },
  { href: "/practice", icon: MessageSquare, label: "Chatbox" },
  { href: "/history", icon: History, label: "Lịch sử" },
  { href: "/profile", icon: User, label: "Hồ sơ" },
] as const;

const comingSoonItems = [
  { icon: Layers, label: "Flashcards" },
  { icon: CalendarClock, label: "Lịch ôn thi" },
  { icon: FileSearch, label: "Phân tích đề cương" },
  { icon: HeartPulse, label: "Chăm sóc tinh thần" },
] as const;

export function AppShell({
  children,
  username,
}: {
  children: React.ReactNode;
  username?: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* ── Desktop icon rail ── */}
      <aside
        className="hidden md:flex flex-col gap-2.5 w-52 py-4 m-4 mr-0 rounded-[20px]"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, rgba(244,137,154,0.06) 100%)",
          boxShadow: "0 4px 20px rgba(244,137,154,0.08), 0 1px 4px rgba(30,27,58,0.06)",
          border: "1px solid rgba(244,137,154,0.12)",
        }}
      >
        {/* brand */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 mx-3 mb-1 rounded-[14px]"
          title="Crambox"
        >
          <LogoImage width={40} height={40} />
          <span
            className="font-sans font-bold text-[15px]"
            style={{ color: "#1E1B3A" }}
          >
            Crambox
          </span>
        </Link>

        {/* nav items */}
        <nav className="flex flex-col gap-1 mx-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={label}
                className="flex items-center gap-3 h-10 px-3 rounded-[10px] transition-all duration-150"
                style={{
                  background: active ? "#F4899A" : "transparent",
                  color: active ? "#FFFFFF" : "#5C5875",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.color = "#1E1B3A";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(244,137,154,0.20)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#5C5875";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <Icon className="w-[17px] h-[17px] flex-shrink-0" />
                <span className="font-sans font-semibold text-[13px]">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* coming soon items */}
        <div className="flex flex-col gap-1 mx-2 mt-1">
          <div
            className="px-3 py-1 font-sans font-bold text-[10px] uppercase tracking-wider"
            style={{ color: "#8F8AA3" }}
          >
            Sắp ra mắt
          </div>
          {comingSoonItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              title={`${label} — Sắp ra mắt`}
              className="flex items-center gap-3 h-10 px-3 rounded-[10px] relative"
              style={{ color: "#8F8AA3", background: "transparent" }}
            >
              <Icon className="w-[17px] h-[17px] flex-shrink-0" />
              <span className="font-sans font-semibold text-[13px] flex-1">{label}</span>
              <span
                className="px-1.5 py-px rounded-full font-sans font-bold text-[8px] uppercase tracking-wider leading-none"
                style={{ background: "rgba(159,122,234,0.15)", color: "#9F7AEA" }}
              >
                Soon
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1" />

        {/* user avatar + logout */}
        <div className="flex items-center gap-2.5 mx-3 mb-1">
          {username && (
            <div
              className="grid place-items-center w-9 h-9 rounded-full font-sans font-bold flex-shrink-0"
              title={username}
              style={{
                background: "rgba(244,137,154,0.12)",
                color: "#1E1B3A",
                fontSize: "13px",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
          )}
          {username && (
            <span
              className="font-sans font-semibold text-[13px] flex-1 truncate"
              style={{ color: "#1E1B3A" }}
            >
              {username}
            </span>
          )}
          <form action={logout}>
            <button
              type="submit"
              title="Đăng xuất"
              className="grid place-items-center w-9 h-9 rounded-full transition-all duration-150 flex-shrink-0"
              style={{ color: "#5C5875", background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.color = "#1E1B3A";
                e.currentTarget.style.boxShadow = "0 0 12px rgba(244,137,154,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#5C5875";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <LogOut className="w-[17px] h-[17px]" />
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-4 md:px-6 pt-5 pb-24 md:pb-7 scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(30,27,58,0.4)_transparent] aurora-bg [content-visibility:auto]">
        {children}
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="md:hidden fixed inset-x-0 bottom-0 z-50 flex items-center justify-around h-16 safe-area-pb"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(6px)",
          borderTop: "1px solid rgba(244,137,154,0.15)",
        }}
      >
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-colors"
              style={{
                color: active ? "#F4899A" : "#5C5875",
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
        {/* mobile logout */}
        <form action={logout}>
          <button
            type="submit"
            className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-colors"
            style={{ color: "#5C5875" }}
          >
            <LogOut className="w-5 h-5" />
            <span>Thoát</span>
          </button>
        </form>
      </nav>
    </div>
  );
}
