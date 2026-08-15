"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckCircle2,
  LayoutDashboard,
  MessageSquareText,
  Bookmark,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/watchlist",
    label: "Watchlist",
    icon: Bookmark,
  },
  {
    href: "/dashboard/completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    href: "/dashboard/reviews",
    label: "My Reviews",
    icon: MessageSquareText,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-neutral-950 md:block">
      <div className="sticky top-16 p-4">
        <div className="mb-6 px-3">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Account
          </p>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-white text-black"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
