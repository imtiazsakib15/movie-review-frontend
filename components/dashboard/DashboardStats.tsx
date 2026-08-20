import {
  Bookmark,
  CheckCircle2,
  MessageSquareText,
  Clock3,
} from "lucide-react";

import type { ProfileStats } from "@/features/profile/profile.types";

interface DashboardStatsProps {
  stats: ProfileStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards = [
    {
      label: "Reviews",
      value: stats.totalReviews,
      icon: MessageSquareText,
      description: `${stats.approvedReviews} approved`,
    },
    {
      label: "Watchlist",
      value: stats.watchlistCount,
      icon: Bookmark,
      description: "Saved titles",
    },
    {
      label: "Completed",
      value: stats.completedCount,
      icon: CheckCircle2,
      description: "Finished titles",
    },
    {
      label: "Pending reviews",
      value: stats.pendingReviews,
      icon: Clock3,
      description:
        stats.rejectedReviews > 0
          ? `${stats.rejectedReviews} rejected`
          : "Waiting for moderation",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-white/10 bg-white/2.5 p-5 transition-colors hover:border-white/15 hover:bg-white/4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
                <Icon className="size-5 text-neutral-300" />
              </div>

              <span className="text-2xl font-bold tracking-tight text-white">
                {card.value.toLocaleString()}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-neutral-300">
              {card.label}
            </p>

            <p className="mt-1 text-xs text-neutral-600">{card.description}</p>
          </div>
        );
      })}
    </div>
  );
}
