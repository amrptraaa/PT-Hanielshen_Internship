import { create } from "zustand";

type Theme = "light" | "dark";
type PrimaryColor = "blue" | "green" | "red" | "purple";
type FontSize = "sm" | "md" | "lg";

interface ThemeState {
  theme: Theme;
  primaryColor: PrimaryColor;
  fontSize: FontSize;
  setTheme: (theme: Theme) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
  setFontSize: (size: FontSize) => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: (process.env.NEXT_PUBLIC_DEFAULT_THEME as Theme) || "light",
  primaryColor:
    (process.env.NEXT_PUBLIC_DEFAULT_PRIMARY_COLOR as PrimaryColor) || "blue",
  fontSize: (process.env.NEXT_PUBLIC_DEFAULT_FONT_SIZE as FontSize) || "md",

  setTheme: (theme) => set({ theme }),
  setPrimaryColor: (color) => set({ primaryColor: color }),
  setFontSize: (size) => set({ fontSize: size }),
}));
