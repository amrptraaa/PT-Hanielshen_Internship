"use client";

import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HelpCircle, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function TopNav() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  let accumulatedPath = "";

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "h-14 mx-6 mt-4 flex items-center px-6 z-40",
        "rounded-xl border border-border bg-background/80 backdrop-blur-md shadow-md"
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm font-medium">
          <span
            className="text-foreground cursor-pointer"
            onClick={() => (window.location.href = "/home")}
          >
            Dashboard
          </span>

          {paths.map((segment, i) => {
            accumulatedPath += `/${segment.toLowerCase()}`;

            return (
              <div
                key={i}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Separator orientation="vertical" className="h-4" />
                <Link
                  href={accumulatedPath}
                  className="capitalize hover:underline"
                >
                  {segment}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right - Help & Avatar */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
