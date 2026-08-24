"use client";

import Link from "next/link";
import {
  BarChart3,
  ChevronLeft,
  Clapperboard,
  Film,
  Home,
  MessageSquareText,
  Tags,
  Users,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { useCurrentUser } from "@/features/auth/auth.hooks";
import { SidebarSection } from "./SidebarSection";
import { SidebarItem } from "./SidebarItem";
import { SidebarDivider } from "./SidebarDivider";

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({
  collapsed = false,
  onToggle,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-white/[0.07] bg-neutral-950 transition-all duration-300 ${
        collapsed ? "w-19" : "w-64"
      }`}
    >
      {/* Top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* Brand */}
      <div className="flex h-18 items-center border-b border-white/[0.07] px-4">
        <Link
          href="/"
          className={`group flex min-w-0 items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/6">
            <div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-transparent" />

            <Film className="relative size-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                Administration
              </span>

              <span className="block truncate text-lg font-bold tracking-tight text-white">
                Cinevoo
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {/* Cinevoo */}
        <SidebarSection title="Cinevoo" collapsed={collapsed}>
          <SidebarItem
            href="/"
            label="Home"
            icon={Home}
            collapsed={collapsed}
            active={pathname === "/"}
          />
        </SidebarSection>

        <SidebarDivider />

        {/* Overview */}
        <SidebarSection title="Overview" collapsed={collapsed}>
          <SidebarItem
            href="/admin"
            label="Dashboard"
            icon={BarChart3}
            collapsed={collapsed}
            active={pathname === "/admin"}
          />
        </SidebarSection>

        <SidebarDivider />

        {/* Content */}
        <SidebarSection title="Content" collapsed={collapsed}>
          <SidebarItem
            href="/admin/media"
            label="Media"
            icon={Clapperboard}
            collapsed={collapsed}
            active={
              pathname === "/admin/media" ||
              pathname.startsWith("/admin/media/")
            }
          />

          <SidebarItem
            href="/admin/genres"
            label="Genres"
            icon={Tags}
            collapsed={collapsed}
            active={
              pathname === "/admin/genres" ||
              pathname.startsWith("/admin/genres/")
            }
          />

          <SidebarItem
            href="/admin/reviews"
            label="Reviews"
            icon={MessageSquareText}
            collapsed={collapsed}
            active={
              pathname === "/admin/reviews" ||
              pathname.startsWith("/admin/reviews/")
            }
          />
        </SidebarSection>

        <SidebarDivider />

        {/* Users */}
        <SidebarSection title="Users" collapsed={collapsed}>
          <SidebarItem
            href="/admin/users"
            label="User management"
            icon={Users}
            collapsed={collapsed}
            active={
              pathname === "/admin/users" ||
              pathname.startsWith("/admin/users/")
            }
          />
        </SidebarSection>
      </nav>

      {/* Bottom account area */}
      <div className="border-t border-white/[0.07] p-3">
        {!collapsed && user && (
          <div className="mb-3 rounded-xl border border-white/6 bg-white/2.5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white">
                {(user.name ?? user.email).charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {user.name ?? "Admin"}
                </p>

                <p className="truncate text-xs text-neutral-600">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className={`flex h-10 w-full items-center rounded-xl text-neutral-600 transition-colors hover:bg-white/5 hover:text-white ${
              collapsed ? "justify-center" : "justify-between px-3"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {!collapsed && (
              <span className="text-xs font-medium">Collapse sidebar</span>
            )}

            <ChevronLeft
              className={`size-4 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </aside>
  );
}
