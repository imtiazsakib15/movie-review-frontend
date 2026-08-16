"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboardStats, getRecentActivity } from "./admin.api";

export const adminQueryKeys = {
  all: ["admin"] as const,

  dashboard: () => [...adminQueryKeys.all, "dashboard"] as const,

  stats: () => [...adminQueryKeys.dashboard(), "stats"] as const,

  recentActivity: (limit: number) =>
    [...adminQueryKeys.dashboard(), "recent-activity", limit] as const,
};

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: adminQueryKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAdminRecentActivity(limit = 5) {
  return useQuery({
    queryKey: adminQueryKeys.recentActivity(limit),
    queryFn: () => getRecentActivity(limit),
    staleTime: 2 * 60 * 1000,
  });
}
