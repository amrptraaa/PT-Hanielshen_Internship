// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Sidebar from "@/components/Sidebar";
import ThemeWrapper from "@/components/ThemeWrapper";
import TopNav from "@/components/TopNav";

// Impor komponen client-side
import LayoutSwitcher from "./LayoutSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - PT Hanielshen Indonesia",
  description:
    "Dashboard untuk memantau kinerja dan statistik PT Hanielshen Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        {/* Gunakan komponen client-side untuk logika tampilan */}
        <LayoutSwitcher>{children}</LayoutSwitcher>
      </body>
    </html>
  );
}
