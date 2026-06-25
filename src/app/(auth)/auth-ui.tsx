"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export function AuthCard({
  title,
  subtitle,
  children,
  altHref,
  altText,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  altHref: string;
  altText: string;
}) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-5 py-10">
      {/* brand */}
      <Link
        href="/"
        className="flex items-center gap-2.5 mb-8"
      >
        <span className="grid place-items-center w-10 h-10 rounded-[14px] bg-ink text-on-ink">
          <GraduationCap className="w-[18px] h-[18px]" />
        </span>
        <span className="font-display text-[17px] font-bold tracking-tight">
          AI Exam Prep
        </span>
      </Link>

      {/* card */}
      <div className="w-full max-w-[400px] bg-surface rounded-card shadow-[var(--shadow-panel)] p-7">
        <h1 className="font-display text-[26px] font-bold leading-tight tracking-[-0.01em] mb-1">
          {title}
        </h1>
        <p className="text-[13.5px] font-medium text-text-muted leading-snug mb-6">
          {subtitle}
        </p>
        {children}
        <p className="mt-6 text-center text-[13px] font-semibold text-text-muted">
          <Link
            href={altHref}
            className="text-ink font-bold hover:underline underline-offset-2"
          >
            {altText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export function AuthInput({
  name,
  type,
  placeholder,
  defaultValue,
  autoComplete,
}: {
  name: string;
  type: string;
  placeholder: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      className="w-full h-12 px-4 rounded-[14px] bg-surface-2 border border-line text-[14.5px] font-medium text-ink placeholder:text-text-faint outline-none transition-all duration-150 focus:border-accent-pink focus:bg-surface focus:ring-2 focus:ring-accent-pink/20"
    />
  );
}

export function AuthSubmit({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="w-full h-12 rounded-pill bg-ink text-on-ink font-display text-[14px] font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-px hover:shadow-[var(--shadow-pop)]"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
