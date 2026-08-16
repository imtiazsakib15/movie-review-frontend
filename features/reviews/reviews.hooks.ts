"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createReview,
  deleteReview,
  getMyReviews,
  getReviewsForMedia,
  updateReview,
} from "./reviews.api";

import type {
  ListMyReviewsParams,
  ListReviewsForMediaParams,
  UpdateReviewInput,
} from "./reviews.types";

export const reviewQueryKeys = {
  all: ["reviews"] as const,

  media: (mediaId: string, params?: Omit<ListReviewsForMediaParams, "page">) =>
    [...reviewQueryKeys.all, "media", mediaId, params ?? {}] as const,

  mine: (params: ListMyReviewsParams) =>
    [...reviewQueryKeys.all, "mine", params] as const,

  detail: (reviewId: string) =>
    [...reviewQueryKeys.all, "detail", reviewId] as const,
};

export function useReviewsForMedia(mediaId: string) {
  return useInfiniteQuery({
    queryKey: reviewQueryKeys.media(mediaId, {
      limit: 6,
      sortBy: "createdAt",
      sortOrder: "desc",
    }),

    queryFn: ({ pageParam }) =>
      getReviewsForMedia(mediaId, {
        page: pageParam,
        limit: 6,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page >= lastPage.meta.totalPages) {
        return undefined;
      }
      return lastPage.meta.page + 1;
    },
    enabled: Boolean(mediaId),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.media(variables.mediaId),
      });

      queryClient.invalidateQueries({
        queryKey: ["media"],
      });

      toast.success("Review submitted successfully.", {
        description: "Your review will appear after moderation.",
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit review.",
      );
    },
  });
}

export function useMyReviews(params: ListMyReviewsParams) {
  return useQuery({
    queryKey: reviewQueryKeys.mine(params),
    queryFn: () => getMyReviews(params),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

export function useUpdateReview(mediaId: string, reviewId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateReviewInput) => updateReview(reviewId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "mine"],
      });

      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.media(mediaId),
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
        queryKey: [...reviewQueryKeys.all, "mine"],
      });

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
