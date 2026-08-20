import { CalendarDays, Mail, Shield, UserRound } from "lucide-react";

import type { User } from "@/features/auth/auth.types";

interface DashboardAccountCardProps {
  user: User;
}

export function DashboardAccountCard({ user }: DashboardAccountCardProps) {
  const displayName = user.name ?? "Unnamed user";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <section className="rounded-2xl border border-white/10 bg-white/2.5 p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/4 text-sm font-semibold text-neutral-200">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="text-lg font-semibold text-white">{displayName}</p>

          <p className="mt-1 text-sm text-neutral-500">Your Cinevoo account</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <Mail className="size-4 shrink-0" />

          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <UserRound className="size-4 shrink-0" />

          <span>
            Role: <span className="text-neutral-300">{user.role}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <Shield className="size-4 shrink-0" />

          <span>Account access enabled</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <CalendarDays className="size-4 shrink-0" />

          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </section>
  );
}
