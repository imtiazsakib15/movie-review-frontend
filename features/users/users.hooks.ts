"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getAdminUserById,
  getAdminUsers,
  updateAdminUserRole,
} from "./users.api";

import type { ListUsersParams, UpdateUserRoleInput } from "./users.types";

export const adminUserQueryKeys = {
  all: ["admin-users"] as const,

  list: (params: ListUsersParams) =>
    [...adminUserQueryKeys.all, "list", params] as const,

  detail: (id: string) => [...adminUserQueryKeys.all, "detail", id] as const,
};

export function useAdminUsers(params: ListUsersParams) {
  return useQuery({
    queryKey: adminUserQueryKeys.list(params),

    queryFn: () => getAdminUsers(params),

    staleTime: 2 * 60 * 1000,

    placeholderData: (previousData) => previousData,
  });
}

export function useAdminUserById(id: string) {
  return useQuery({
    queryKey: adminUserQueryKeys.detail(id),

    queryFn: () => getAdminUserById(id),

    enabled: Boolean(id),

    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdateAdminUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRoleInput }) =>
      updateAdminUserRole(id, data),

    onSuccess: (user) => {
      queryClient.invalidateQueries({
        queryKey: adminUserQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["admin"],
      });

      queryClient.setQueryData(adminUserQueryKeys.detail(user.id), user);

      toast.success("User role updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user role.",
      );
    },
  });
}
