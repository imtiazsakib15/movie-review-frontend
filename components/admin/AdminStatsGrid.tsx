import {
  AlertCircle,
  Film,
  Library,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { AdminDashboardStats } from "@/features/admin/admin.types";

import { AdminStatCard } from "./AdminStatCard";

interface AdminStatsGridProps {
  stats: AdminDashboardStats;
}

export function AdminStatsGrid({ stats }: AdminStatsGridProps) {
  return (
    <div className="space-y-4">
      {/* Primary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard
          label="Users"
          value={stats.users.total}
          icon={Users}
          description={`${stats.users.regular} users · ${stats.users.admins} admins`}
        />

        <AdminStatCard
          label="Media"
          value={stats.media.total}
          icon={Film}
          description={`${stats.media.published} published`}
        />

        <AdminStatCard
          label="Reviews"
          value={stats.reviews.total}
          icon={MessageSquareText}
          description={`${stats.reviews.approved} approved`}
        />

        <AdminStatCard
          label="Pending reviews"
          value={stats.reviews.pending}
          icon={AlertCircle}
          description="Waiting for moderation"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <AdminStatCard label="Movies" value={stats.media.movies} icon={Film} />

        <AdminStatCard
          label="Series"
          value={stats.media.series}
          icon={Library}
        />

        <AdminStatCard
          label="Genres"
          value={stats.genres.total}
          icon={Library}
        />

        <AdminStatCard
          label="Watchlist"
          value={stats.watchlist.totalEntries}
          icon={Library}
        />

        <AdminStatCard
          label="Completed"
          value={stats.completedMedia.totalEntries}
          icon={ShieldCheck}
        />
      </div>
    </div>
  );
}
