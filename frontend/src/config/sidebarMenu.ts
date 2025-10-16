import {
  LayoutDashboard,
  Users,
  Utensils,
  ReceiptText,
  Settings,
  Book,
  Calendar,
  UserCog,
  CalendarRange,
  BookText,
  CircleGauge,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  action?: "openSettings";
}

export const sidebarMenu: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/home",
    icon: CircleGauge,
  },
  {
    label: "Absensi Pekerja",
    href: "/absensi",
    icon: BookText,
  },
  {
    label: "Jadwal Pekerja",
    href: "/jadwal",
    icon: CalendarRange,
  },
  {
    label: "Manajemen Pekerja",
    href: "/pekerja",
    icon: UserCog,
  },
];

export const sidebarBottomMenu: SidebarItem[] = [
  {
    label: "Settings",
    action: "openSettings", // bukan href
    icon: Settings,
  },
];
