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
  getModerationReviews,
  getMyReviews,
  getReviewsForMedia,
  updateReview,
  updateReviewStatus,
} from "./reviews.api";

import type {
  ListMyReviewsParams,
  ListReviewsForMediaParams,
  UpdateReviewInput,
  ListModerationParams,
  ReviewStatus,
} from "./reviews.types";

export const reviewQueryKeys = {
  all: ["reviews"] as const,

  media: (mediaId: string, params?: Omit<ListReviewsForMediaParams, "page">) =>
    [...reviewQueryKeys.all, "media", mediaId, params ?? {}] as const,

  mine: (params: ListMyReviewsParams) =>
    [...reviewQueryKeys.all, "mine", params] as const,

  moderation: (params: ListModerationParams) =>
    [...reviewQueryKeys.all, "moderation", params] as const,

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

export function useModerationReviews(params: ListModerationParams) {
  return useQuery({
    queryKey: reviewQueryKeys.moderation(params),

    queryFn: () => getModerationReviews(params),

    staleTime: 30 * 1000,

    placeholderData: (previousData) => previousData,
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

export function useUpdateReviewStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      status,
    }: {
      reviewId: string;
      status: Extract<ReviewStatus, "APPROVED" | "REJECTED">;
    }) => updateReviewStatus(reviewId, status),

    onSuccess: (review) => {
      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "moderation"],
      });

      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "mine"],
      });

      queryClient.invalidateQueries({
        queryKey: ["media"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin"],
      });

      queryClient.setQueryData(reviewQueryKeys.detail(review.id), review);

      toast.success(`Review ${review.status.toLowerCase()}.`);
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update review status.",
      );
    },
  });
}

export function useDeleteReview(mediaId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "mine"],
      });

      queryClient.invalidateQueries({
        queryKey: [...reviewQueryKeys.all, "moderation"],
      });

      if (mediaId) {
        queryClient.invalidateQueries({
          queryKey: [...reviewQueryKeys.all, "media", mediaId],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["media"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin"],
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
