import { apiFetch } from "@/lib/api";
import type { PaginationMeta } from "@/types/pagination";

import type {
  AdminUser,
  AdminUserListResponse,
  ListUsersParams,
  UpdateUserRoleInput,
} from "./users.types";

export async function getAdminUsers(
  params: ListUsersParams = {},
): Promise<AdminUserListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.role) {
    searchParams.set("role", params.role);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  const query = searchParams.toString();

  const response = await apiFetch<AdminUser[], PaginationMeta>(
    `/admin/users${query ? `?${query}` : ""}`,
  );

  return {
    items: response.data,
    meta: response.meta as PaginationMeta,
  };
}

export async function getAdminUserById(id: string): Promise<AdminUser> {
  const response = await apiFetch<AdminUser>(
    `/admin/users/${encodeURIComponent(id)}`,
  );

  return response.data;
}

export async function updateAdminUserRole(
  id: string,
  payload: UpdateUserRoleInput,
): Promise<AdminUser> {
  const response = await apiFetch<AdminUser>(
    `/admin/users/${encodeURIComponent(id)}/role`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}
