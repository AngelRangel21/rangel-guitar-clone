// ============================================
// components/admin/admin-nav.tsx
// ============================================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import {
  LayoutDashboard,
  Music2,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Cifras",
    href: "/admin/cifras",
    icon: Music2,
  },
  {
    title: "Artistas",
    href: "/admin/artistas",
    icon: Users,
  },
  {
    title: "Estadísticas",
    href: "/admin/estadisticas",
    icon: BarChart3,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                : "hover:bg-[var(--color-accent)] text-[var(--color-foreground)]"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
