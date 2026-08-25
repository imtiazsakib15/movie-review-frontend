"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Home,
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
    label: "My Reviews",
    icon: MessageSquareText,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/[0.07] bg-neutral-950 md:block">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
        {/* Header */}
        <div className="border-b border-white/[0.07] px-4 py-5">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/4"
          >
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Home className="size-4 text-white transition-transform duration-200 group-hover:scale-110" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                Cinevoo
              </p>

              <p className="truncate text-sm font-semibold text-neutral-300 group-hover:text-white">
                Back to home
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <div className="mb-3 px-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Your Cinevoo
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
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all",
                    active
                      ? "bg-white/[0.07] text-white"
                      : "text-neutral-500 hover:bg-white/4 hover:text-neutral-200",
                  )}
                >
                  {/* Active indicator */}
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full transition-all",
                      active ? "w-0.5 bg-white" : "w-0 bg-transparent",
                    )}
                  />

                  {/* Icon */}
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-white/10 text-white"
                        : "bg-white/2.5 text-neutral-600 group-hover:bg-white/6 group-hover:text-neutral-300",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>

                  <span>{item.label}</span>

                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.07] px-4 py-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-2 text-xs font-medium text-neutral-700 transition-colors hover:text-neutral-300"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Return to Cinevoo
          </Link>
        </div>
      </div>
    </aside>
  );
}
