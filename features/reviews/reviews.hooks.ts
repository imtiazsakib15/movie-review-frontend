"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createReview,
  deleteReview,
  getReviewsForMedia,
  updateReview,
} from "./reviews.api";

import type { CreateReviewInput, UpdateReviewInput } from "./reviews.types";

export const reviewQueryKeys = {
  all: ["reviews"] as const,

  media: (mediaId: string) =>
    [...reviewQueryKeys.all, "media", mediaId] as const,

  detail: (reviewId: string) =>
    [...reviewQueryKeys.all, "detail", reviewId] as const,
};

export function useReviewsForMedia(mediaId: string) {
  return useQuery({
    queryKey: reviewQueryKeys.media(mediaId),
    queryFn: () => getReviewsForMedia(mediaId),
    enabled: Boolean(mediaId),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateReview(mediaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewInput) =>
      createReview({
        ...payload,
        mediaId,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.media(mediaId),
      });

      queryClient.invalidateQueries({
        queryKey: ["media"],
      });

      toast.success("Review submitted successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review.",
      );
    },
  });
}

export function useUpdateReview(mediaId: string, reviewId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateReviewInput) => updateReview(reviewId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.media(mediaId),
      });

      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.detail(reviewId),
      });

      queryClient.invalidateQueries({
        queryKey: ["media"],
      });

      toast.success("Review updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update review.",
      );
    },
  });
}

export function useDeleteReview(mediaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.media(mediaId),
      });

      queryClient.invalidateQueries({
        queryKey: ["media"],
      });

      toast.success("Review deleted successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete review.",
      );
    },
  });
}
