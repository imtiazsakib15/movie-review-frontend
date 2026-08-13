"use client";

import Link from "next/link";
import { ChevronDown, LogOut, UserRound } from "lucide-react";

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
    return <div className="h-9 w-24 animate-pulse rounded-md bg-white/5" />;
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link
          href="/login"
          className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
        >
          Sign in
        </Link>

        <Link
          href="/register"
          className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
        >
          Get started
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="gap-2 text-neutral-200 hover:bg-white/5 hover:text-white"
          />
        }
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
          {(user.name ?? user.email).charAt(0).toUpperCase()}
        </span>

        <span className="hidden max-w-28 truncate sm:inline">
          {user.name ?? user.email}
        </span>

        <ChevronDown className="size-4 text-neutral-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border-white/10 bg-neutral-900 text-neutral-100"
      >
        <div className="px-2 py-2">
          <p className="truncate text-sm font-medium">{user.name ?? "User"}</p>

          <p className="truncate text-xs text-neutral-500">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem render={<Link href="/dashboard" />}>
          <UserRound />
          Dashboard
        </DropdownMenuItem>

        {user.role === "ADMIN" && (
          <DropdownMenuItem render={<Link href="/admin" />}>
            Admin dashboard
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
        >
          <LogOut />
          {logoutMutation.isPending ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
