import type { PaginationMeta } from "@/types/pagination";
import type { User } from "@/features/auth/auth.types";

export interface UserActivityCounts {
  reviews: number;
  watchlistItems: number;
  completedMedia: number;
}

export type AdminUser = User & {
  _count: UserActivityCounts;
};

export interface AdminUserListResponse {
  items: AdminUser[];
  meta: PaginationMeta;
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  role?: "USER" | "ADMIN";
  search?: string;
}

export interface UpdateUserRoleInput {
  role: "USER" | "ADMIN";
}
