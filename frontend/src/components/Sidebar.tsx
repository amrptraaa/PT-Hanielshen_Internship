"use client";

import { sidebarMenu, sidebarBottomMenu } from "@/config/sidebarMenu";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SettingsModal from "@/components/SettingsModal";
import { usePathname } from "next/navigation"; // ✅ untuk active state
import { useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const [openSettings, setOpenSettings] = useState(false);
  const pathname = usePathname(); // ✅ deteksi halaman aktif

  return (
    <>
      <motion.aside
        initial={{ width: 80 }}
        whileHover={{ width: 240 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-[95vh] m-3 bg-sidebar text-sidebar-foreground shadow-lg rounded-2xl flex flex-col justify-between fixed left-0 top-0 z-50 overflow-hidden group border border-sidebar-border"
      >
        <div>
          {/* Logo - lebih proporsional dan responsif */}
          <div className="flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logo_PT2_edit.svg"
                alt="Logo Perusahaan"
                width={100}
                height={100}
                className="rounded-md"
                priority
              />
            </motion.div>
          </div>

          {/* Menu Utama */}
          <nav className="mt-6 flex flex-col gap-1.5 px-2">
            {sidebarMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl transition-all duration-200",
                    "text-base font-medium", // ✅ ukuran teks lebih besar
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive ? "text-sidebar-accent-foreground" : ""
                    )}
                  />
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    whileHover={{ opacity: 1, width: "auto" }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="ml-4 whitespace-nowrap overflow-hidden text-base font-medium"
                  >
                    {item.label}
                  </motion.span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Menu Bawah (Settings) */}
        <div className="p-3 border-t border-sidebar-border/30">
          {sidebarBottomMenu.map((item) => {
            if (item.action === "openSettings") {
              return (
                <button
                  key={item.label}
                  onClick={() => setOpenSettings(true)}
                  className="w-full flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    whileHover={{ opacity: 1, width: "auto" }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            }
            return null;
          })}
        </div>
      </motion.aside>

      <SettingsModal
        open={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </>
  );
}
