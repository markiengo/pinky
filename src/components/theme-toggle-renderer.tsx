"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const HIDDEN_PATHS = ["/", "/pricing"];

export function ThemeToggleRenderer() {
  // Theme toggle is now in the sidebar (app-shell.tsx)
  return null;
}
