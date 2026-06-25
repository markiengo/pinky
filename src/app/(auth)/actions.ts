"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";

export interface AuthState {
  error?: string;
}

export async function signup(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;

  if (!username || username.length < 3) {
    return { error: "Tên đăng nhập phải có ít nhất 3 ký tự" };
  }
  if (!password || password.length < 6) {
    return { error: "Mật khẩu phải có ít nhất 6 ký tự" };
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return { error: "Tên đăng nhập đã tồn tại" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, passwordHash },
  });

  await createSession(user.id, user.username);
  redirect("/");
}

export async function login(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Vui lòng nhập đầy đủ thông tin" };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return { error: "Tên đăng nhập hoặc mật khẩu không đúng" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Tên đăng nhập hoặc mật khẩu không đúng" };
  }

  await createSession(user.id, user.username);
  redirect("/");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
