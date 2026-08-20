"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import { useProfileOverview } from "@/features/profile/profile.hooks";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

import { DashboardStats } from "@/components/dashboard/DashboardStats";

import { RecentReviews } from "@/components/dashboard/RecentReviews";

import { RecentMediaList } from "@/components/dashboard/RecentMediaList";

import { DashboardAccountCard } from "@/components/dashboard/DashboardAccountCard";

import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function DashboardPage() {
  const router = useRouter();

  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const {
    data: overview,
    isLoading: isOverviewLoading,
    isError,
    refetch,
  } = useProfileOverview();

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, isUserLoading, router]);

  if (isUserLoading || isOverviewLoading || !currentUser) {
    return <DashboardSkeleton />;
  }

  if (isError || !overview) {
    return (
      <section className="flex min-h-125 items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-white">
            Couldn't load your dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Something went wrong while loading your Cinevoo activity.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/8 hover:text-white"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <DashboardHeader name={overview.user.name} email={overview.user.email} />

      <DashboardStats stats={overview.stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentReviews reviews={overview.recentReviews} />

        <RecentMediaList
          title="Recent watchlist"
          items={overview.recentWatchlist}
          emptyMessage="Your watchlist is empty."
          viewAllHref="/dashboard/watchlist"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentMediaList
          title="Recently completed"
          items={overview.recentCompleted}
          emptyMessage="You haven't completed any titles yet."
          viewAllHref="/dashboard/completed"
        />

        <DashboardAccountCard user={overview.user} />
      </div>
    </section>
  );
}
