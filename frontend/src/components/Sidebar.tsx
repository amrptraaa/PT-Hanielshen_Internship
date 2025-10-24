"use client";

import { sidebarMenu, sidebarBottomMenu } from "@/config/sidebarMenu";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SettingsModal from "@/components/SettingsModal";
import { useState } from "react";
import Image from "next/image"; // ✅ ditambahkan

export default function Sidebar() {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <motion.aside
        initial={{ width: 80 }}
        whileHover={{ width: 240 }}
        transition={{ duration: 0.3 }}
        className="h-[95vh] m-3 bg-sidebar text-sidebar-foreground shadow-xl rounded-2xl flex flex-col justify-between fixed left-0 top-0 z-50 overflow-hidden group border border-sidebar-border"
      >
        <div>
          {/* ✅ Bagian ini diganti jadi gambar */}
          <div className="flex items-center justify-center p-4">
            <Image
              src="/logo_PT2.svg"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>

          <nav className="mt-8 flex flex-col gap-2 px-2">
            {sidebarMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 whitespace-nowrap overflow-hidden text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-sidebar-border flex flex-col gap-2">
          {sidebarBottomMenu.map((item) => {
            if (item.action === "openSettings") {
              return (
                <button
                  key={item.label}
                  onClick={() => setOpenSettings(true)}
                  className="flex items-center px-4 py-3 rounded-xl hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 whitespace-nowrap overflow-hidden text-sm font-medium"
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
