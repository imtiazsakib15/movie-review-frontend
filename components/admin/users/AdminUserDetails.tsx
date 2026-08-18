import {
  CheckCircle2,
  MessageSquareText,
  Bookmark,
  CalendarDays,
  Mail,
} from "lucide-react";

import type { AdminUser } from "@/features/users/users.types";

import { UserRoleBadge } from "./UserRoleBadge";

interface AdminUserDetailsProps {
  user: AdminUser;
}

export function AdminUserDetails({ user }: AdminUserDetailsProps) {
  const displayName = user.name ?? "Unnamed user";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Profile */}
      <section className="rounded-2xl border border-white/10 bg-white/2.5 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/4 text-xl font-semibold text-neutral-200">
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold text-white">
                {displayName}
              </h2>

              <UserRoleBadge role={user.role} />
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" />
                {user.email}
              </span>

              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Activity */}
      <section>
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
            Activity
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            User activity
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
              <MessageSquareText className="size-5 text-neutral-300" />
            </div>

            <p className="mt-4 text-sm text-neutral-500">Reviews</p>

            <p className="mt-1 text-2xl font-bold text-white">
              {user?._count?.reviews}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
              <Bookmark className="size-5 text-neutral-300" />
            </div>

            <p className="mt-4 text-sm text-neutral-500">Watchlist</p>

            <p className="mt-1 text-2xl font-bold text-white">
              {user?._count?.watchlistItems}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/2.5 p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
              <CheckCircle2 className="size-5 text-neutral-300" />
            </div>

            <p className="mt-4 text-sm text-neutral-500">Completed</p>

            <p className="mt-1 text-2xl font-bold text-white">
              {user?._count?.completedMedia}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
