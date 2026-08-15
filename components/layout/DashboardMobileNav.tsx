"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  CheckCircle2,
  LayoutDashboard,
  MessageSquareText,
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
    label: "Reviews",
    icon: MessageSquareText,
  },
];

export function DashboardMobileNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-white/10 bg-neutral-950 md:hidden">
      <div className="flex overflow-x-auto px-4">
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
                "flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm",
                active
                  ? "border-white text-white"
                  : "border-transparent text-neutral-500",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
