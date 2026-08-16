import { apiFetch } from "@/lib/api";

import type { AdminDashboardStats, RecentActivity } from "./admin.types";

export async function getDashboardStats(): Promise<AdminDashboardStats> {
  const response = await apiFetch<AdminDashboardStats>(
    "/admin/dashboard/stats",
  );

  return response.data;
}

export async function getRecentActivity(limit = 5): Promise<RecentActivity> {
  const searchParams = new URLSearchParams({
    limit: String(limit),
  });

  const response = await apiFetch<RecentActivity>(
    `/admin/dashboard/recent-activity?${searchParams.toString()}`,
  );

  return response.data;
}
