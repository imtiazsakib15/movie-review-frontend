"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCompleted,
  markAsCompleted,
  removeFromCompleted,
} from "./completed.api";

export const completedQueryKey = ["completed"] as const;

export function useCompleted(enabled = true) {
  return useQuery({
    queryKey: completedQueryKey,
    queryFn: getCompleted,
    enabled,
    staleTime: 2 * 60 * 1000,
  });
}

export function useMarkAsCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsCompleted,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: completedQueryKey,
      });

      toast.success("Marked as completed.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to mark as completed.",
      );
    },
  });
}

export function useRemoveFromCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCompleted,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: completedQueryKey,
      });

      toast.success("Removed from completed.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove from completed.",
      );
    },
  });
}
