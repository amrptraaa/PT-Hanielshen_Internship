// src/app/LayoutSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import Providers from "./providers";
import ThemeWrapper from "@/components/ThemeWrapper";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function LayoutSwitcher({ children }: Props) {
  const pathname = usePathname();

  // Daftar path yang TIDAK ingin menampilkan Sidebar dan TopNav
  const noNavPaths = ["/login"]; // Tambahkan path lain jika diperlukan

  const hideNav = noNavPaths.includes(pathname);

  if (hideNav) {
    // Jika path ada di daftar noNavPaths, kembalikan layout minimal
    return (
      <main className="ml-0 flex-1 transition-all">
        {" "}
        {/* ml-0 karena sidebar tidak ditampilkan */}
        <Providers>
          <ThemeWrapper>
            {/* TopNav tidak dirender */}
            <main className="px-6 mt-3">{children}</main>
          </ThemeWrapper>
        </Providers>
      </main>
    );
  }

  // Jika path *bukan* di daftar noNavPaths, gunakan layout normal
  return (
    <>
      <Sidebar />
      <main className="ml-[80px] flex-1 transition-all">
        {" "}
        {/* ml-[80px] karena sidebar ditampilkan */}
        <Providers>
          <ThemeWrapper>
            <TopNav />
            <main className="px-6 mt-3">{children}</main>
          </ThemeWrapper>
        </Providers>
      </main>
    </>
  );
}
