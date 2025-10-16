import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  theme: "light" | "dark";
  primaryColor: "blue" | "green" | "red" | "purple";
  fontSize: "sm" | "md" | "lg";
  setTheme: (theme: "light" | "dark") => void;
  setPrimaryColor: (color: "blue" | "green" | "red" | "purple") => void;
  setFontSize: (size: "sm" | "md" | "lg") => void;
}

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme:
        (process.env.NEXT_PUBLIC_DEFAULT_THEME as "light" | "dark") || "light",
      primaryColor:
        (process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_COLOR as
          | "blue"
          | "green"
          | "red"
          | "purple") || "blue",
      fontSize:
        (process.env.NEXT_PUBLIC_DEFAULT_FONT_SIZE as "sm" | "md" | "lg") ||
        "md",
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
