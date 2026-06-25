"use client";

import { useActionState } from "react";
import { login, type AuthState } from "../actions";
import { AuthCard, AuthInput, AuthSubmit } from "../auth-ui";

export default function LoginPage() {
  const [state, formAction] = useActionState<AuthState, FormData>(login, {});

  return (
    <AuthCard
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay lại! Đăng nhập để tiếp tục luyện đề."
      altHref="/signup"
      altText="Chưa có tài khoản? Đăng ký ngay"
    >
      <form action={formAction} className="flex flex-col gap-3.5">
        {state.error && (
          <p className="px-4 py-3 rounded-[14px] bg-bad/30 text-bad-ink text-[13px] font-semibold">
            {state.error}
          </p>
        )}
        <AuthInput
          name="username"
          type="text"
          placeholder="Tên đăng nhập"
          autoComplete="username"
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Mật khẩu"
          autoComplete="current-password"
        />
        <AuthSubmit label="Đăng nhập" />
      </form>

      {/* demo hint */}
      <div className="mt-5 px-4 py-3 rounded-[14px] bg-c-cream border border-ink/[0.07] text-[12.5px] font-semibold text-ink/70 leading-snug">
        <span className="font-bold text-ink">Tài khoản demo:</span>{" "}
        demo / demo1234
      </div>
    </AuthCard>
  );
}
