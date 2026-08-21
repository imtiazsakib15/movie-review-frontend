"use client";

import Link from "next/link";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useCurrentUser, useLogout } from "@/features/auth/auth.hooks";

export function UserMenu() {
  const { data: user, isLoading } = useCurrentUser();

  const logoutMutation = useLogout();

  if (isLoading) {
    return (
      <div className="hidden h-10 w-32 animate-pulse rounded-xl bg-white/4 sm:block" />
    );
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/4 hover:text-white"
        >
          Sign in
        </Link>

        <Link
          href="/register"
          className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-neutral-200"
        >
          Get started
        </Link>
      </div>
    );
  }

  const displayName = user.name?.trim() || user.email;

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="group h-10 gap-2 rounded-xl border border-white/10 bg-white/2.5 px-2.5 text-neutral-200 transition-colors hover:border-white/15 hover:bg-white/5 hover:text-white"
          />
        }
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white ring-1 ring-inset ring-white/10">
          {initial}
        </span>

        <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
          {displayName}
        </span>

        <ChevronDown className="size-4 text-neutral-600 transition-transform group-data-popup-open:rotate-180 group-hover:text-neutral-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-1.5 text-neutral-100 shadow-2xl shadow-black/40"
      >
        {/* Profile header */}
        <div className="rounded-xl bg-white/3 p-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-semibold text-white ring-1 ring-inset ring-white/10">
              {initial}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {displayName}
              </p>

              <p className="mt-0.5 truncate text-xs text-neutral-600">
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-700">
              Account
            </span>

            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                user.role === "ADMIN"
                  ? "border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
                  : "border-white/10 bg-white/4 text-neutral-500"
              }`}
            >
              {user.role === "ADMIN" ? "Administrator" : "Member"}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1.5 bg-white/10" />

        {/* Main navigation */}
        <DropdownMenuItem
          render={<Link href="/dashboard" />}
          className="rounded-xl px-3 py-2.5"
        >
          <LayoutDashboard className="size-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          render={<Link href="/dashboard/reviews" />}
          className="rounded-xl px-3 py-2.5"
        >
          <UserRound className="size-4" />
          <span>My Reviews</span>
        </DropdownMenuItem>

        {user.role === "ADMIN" && (
          <>
            <DropdownMenuSeparator className="my-1.5 bg-white/10" />

            <DropdownMenuItem
              render={<Link href="/admin" />}
              className="rounded-xl px-3 py-2.5 text-indigo-300 focus:text-indigo-200"
            >
              <ShieldCheck className="size-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="my-1.5 bg-white/10" />

        {/* Logout */}
        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          className="rounded-xl px-3 py-2.5 text-red-400 focus:bg-red-500/10 focus:text-red-300"
        >
          <LogOut className="size-4" />

          <span>{logoutMutation.isPending ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
