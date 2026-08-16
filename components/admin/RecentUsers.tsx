import Link from "next/link";

import type { RecentUserSummary } from "@/features/admin/admin.types";

interface RecentUsersProps {
  users: RecentUserSummary[];
}

export function RecentUsers({ users }: RecentUsersProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/3">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="font-semibold text-white">Recent users</h2>

        <p className="mt-1 text-xs text-neutral-600">
          Newly registered accounts
        </p>
      </div>

      <div className="divide-y divide-white/5">
        {users.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-neutral-500">
            No users yet.
          </p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 px-5 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                  {(user.name ?? user.email).charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {user.name ?? "Unnamed user"}
                  </p>

                  <p className="truncate text-xs text-neutral-600">
                    {user.email}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-[10px] font-medium text-neutral-500">
                {user.role}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
