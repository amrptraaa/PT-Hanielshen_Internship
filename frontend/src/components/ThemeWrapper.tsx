"use client";

import { useTheme } from "@/store/useTheme";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, primaryColor, fontSize } = useTheme();

  // Use environment defaults to ensure values are never undefined
  const safeTheme = theme || process.env.NEXT_PUBLIC_DEFAULT_THEME || "light";
  const safePrimaryColor =
    primaryColor || process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_COLOR || "blue";
  const safeFontSize =
    fontSize || process.env.NEXT_PUBLIC_DEFAULT_FONT_SIZE || "md";

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;

    root.classList.remove("light", "dark");
    root.classList.add(safeTheme);

    body.classList.forEach((className) => {
      if (className.startsWith("text-")) {
        body.classList.remove(className);
      }
    });

    body.classList.add(`text-${safeFontSize}`);
  }, [safeTheme, safeFontSize]);

  return (
    <div
      className={cn(
        safeTheme === "dark" ? "theme-dark" : "",
        `primary-${safePrimaryColor}`,
      )}
    >
      <div className="min-h-screen bg-background text-foreground transition-colors">
        {children}
      </div>
    </div>
  );
}
