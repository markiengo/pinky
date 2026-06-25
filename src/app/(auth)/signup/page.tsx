"use client";

import { useActionState } from "react";
import { signup, type AuthState } from "../actions";
import { AuthCard, AuthInput, AuthSubmit } from "../auth-ui";

export default function SignupPage() {
  const [state, formAction] = useActionState<AuthState, FormData>(signup, {});

  return (
    <AuthCard
      title="Tạo tài khoản"
      subtitle="Đăng ký để bắt đầu luyện thi THPT Quốc Gia."
      altHref="/login"
      altText="Đã có tài khoản? Đăng nhập"
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
          placeholder="Tên đăng nhập (tối thiểu 3 ký tự)"
          autoComplete="username"
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="Mật khẩu (tối thiểu 6 ký tự)"
          autoComplete="new-password"
        />
        <AuthSubmit label="Đăng ký" />
      </form>
    </AuthCard>
  );
}
