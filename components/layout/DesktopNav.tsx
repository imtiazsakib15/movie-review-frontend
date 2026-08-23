"use client";

import Link from "next/link";
import { Clapperboard, Home, Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
  match: () => boolean;
}

export function DesktopNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const items: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      match: () => pathname === "/",
    },
    {
      label: "Browse",
      href: "/media",
      icon: Clapperboard,
      match: () => pathname === "/media" && !type,
    },
    {
      label: "Movies",
      href: "/media?type=MOVIE",
      match: () => pathname === "/media" && type === "MOVIE",
    },
    {
      label: "Series",
      href: "/media?type=SERIES",
      match: () => pathname === "/media" && type === "SERIES",
    },
  ];

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {items.map((item) => {
        const active = item.match();
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group relative inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium transition-all ${
              active
                ? "bg-white/[0.07] text-white"
                : "text-neutral-500 hover:bg-white/4 hover:text-white"
            }`}
          >
            {Icon && (
              <Icon
                className={`size-3.5 transition-colors ${
                  active
                    ? "text-white"
                    : "text-neutral-600 group-hover:text-neutral-300"
                }`}
              />
            )}

            <span>{item.label}</span>

            {/* Active indicator */}
            <span
              className={`absolute inset-x-3 bottom-0 h-px origin-center rounded-full bg-white transition-transform duration-300 ${
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
