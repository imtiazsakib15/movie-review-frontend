"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "./watchlist.api";

export const watchlistQueryKey = ["watchlist"] as const;

export function useWatchlist(enabled = true) {
  return useQuery({
    queryKey: watchlistQueryKey,
    queryFn: getWatchlist,
    enabled,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWatchlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistQueryKey,
      });

      toast.success("Added to your watchlist.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to watchlist.",
      );
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromWatchlist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistQueryKey,
      });

      toast.success("Removed from your watchlist.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to remove from watchlist.",
      );
    },
  });
}
