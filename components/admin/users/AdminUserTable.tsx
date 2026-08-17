"use client";

import Link from "next/link";

import { Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { AdminUser } from "@/features/users/users.types";

import { UserRoleBadge } from "./UserRoleBadge";

interface AdminUserTableProps {
  users: AdminUser[];
}

export function AdminUserTable({ users }: AdminUserTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/2.5">
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/2">
              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                User
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Role
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Reviews
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Watchlist
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Completed
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Joined
              </th>

              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {users.map((user) => {
              const displayName = user.name ?? "Unnamed user";

              const initial = displayName.charAt(0).toUpperCase();

              return (
                <tr
                  key={user.id}
                  className="group transition-colors hover:bg-white/2"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-sm font-semibold text-neutral-200">
                        {initial}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {displayName}
                        </p>

                        <p className="mt-0.5 max-w-56 truncate text-xs text-neutral-600">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <UserRoleBadge role={user.role} />
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {user._count.reviews}
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {user._count.watchlistItems}
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {user._count.completedMedia}
                  </td>

                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-600 opacity-70 hover:bg-white/5 hover:text-white group-hover:opacity-100"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          render={<Link href={`/admin/users/${user.id}`} />}
                        >
                          <Eye />
                          View details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-white/5 lg:hidden">
        {users.map((user) => {
          const displayName = user.name ?? "Unnamed user";

          const initial = displayName.charAt(0).toUpperCase();

          return (
            <div key={user.id} className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-sm font-semibold text-neutral-200">
                  {initial}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {displayName}
                      </p>

                      <p className="mt-1 truncate text-xs text-neutral-600">
                        {user.email}
                      </p>
                    </div>

                    <UserRoleBadge role={user.role} />
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-white/5 bg-white/2 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-700">
                        Reviews
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {user._count.reviews}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/2 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-700">
                        Watchlist
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {user._count.watchlistItems}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/2 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-neutral-700">
                        Completed
                      </p>

                      <p className="mt-1 text-sm font-semibold text-white">
                        {user._count.completedMedia}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/users/${user.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                  >
                    View details
                    <Eye className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
