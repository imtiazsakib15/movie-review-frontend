"use client";

import { ShieldCheck } from "lucide-react";

import {
  useAdminDashboardStats,
  useAdminRecentActivity,
} from "@/features/admin/admin.hooks";

import { AdminStatsGrid } from "@/components/admin/AdminStatsGrid";
import { RecentUsers } from "@/components/admin/RecentUsers";
import { PendingReviews } from "@/components/admin/PendingReviews";
import { RecentMedia } from "@/components/admin/RecentMedia";
import { AdminDashboardSkeleton } from "@/components/admin/AdminDashboardSkeleton";

export default function AdminDashboardPage() {
  const statsQuery = useAdminDashboardStats();

  const activityQuery = useAdminRecentActivity(5);

  const isLoading = statsQuery.isLoading || activityQuery.isLoading;

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (
    statsQuery.isError ||
    activityQuery.isError ||
    !statsQuery.data ||
    !activityQuery.data
  ) {
    return (
      <section className="flex min-h-125 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-500/10">
            <ShieldCheck className="size-5 text-red-400" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-white">
            Couldn't load admin dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Something went wrong while loading the dashboard data.
          </p>

          <button
            type="button"
            onClick={() => {
              statsQuery.refetch();
              activityQuery.refetch();
            }}
            className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  const activity = activityQuery.data;

  return (
    <section className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
            <ShieldCheck className="size-5 text-neutral-300" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          Overview of Cinevoo's users, media library, reviews, and activity.
        </p>
      </header>

      <AdminStatsGrid stats={statsQuery.data} />

      <div className="grid gap-6 lg:grid-cols-3">
        <PendingReviews reviews={activity.pendingReviews} />

        <RecentUsers users={activity.recentUsers} />

        <RecentMedia media={activity.recentMedia} />
      </div>
    </section>
  );
}
