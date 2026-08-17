import { apiFetch } from "@/lib/api";
import type { PaginationMeta } from "@/types/pagination";

import type {
  CreateReviewInput,
  ListReviewsForMediaParams,
  Review,
  ReviewListResponse,
  UpdateReviewInput,
  ListMyReviewsParams,
  MyReview,
  MyReviewListResponse,
  ListModerationParams,
  ModerationReviewListResponse,
  ReviewStatus,
  ReviewWithMedia,
} from "./reviews.types";

export async function getReviewsForMedia(
  mediaId: string,
  params: ListReviewsForMediaParams = {},
): Promise<ReviewListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();

  const response = await apiFetch<Review[], PaginationMeta>(
    `/reviews/media/${encodeURIComponent(mediaId)}${query ? `?${query}` : ""}`,
  );

  return {
    items: response.data,
    meta: response.meta as PaginationMeta,
  };
}

export async function getMyReviews(
  params: ListMyReviewsParams = {},
): Promise<MyReviewListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  const query = searchParams.toString();

  const response = await apiFetch<MyReview[], PaginationMeta>(
    `/reviews/mine${query ? `?${query}` : ""}`,
  );

  return {
    items: response.data,
    meta: response.meta as PaginationMeta,
  };
}

export async function getReviewById(reviewId: string): Promise<Review> {
  const response = await apiFetch<Review>(
    `/reviews/${encodeURIComponent(reviewId)}`,
  );

  return response.data;
}

export async function getModerationReviews(
  params: ListModerationParams = {},
): Promise<ModerationReviewListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.mediaId) {
    searchParams.set("mediaId", params.mediaId);
  }

  const query = searchParams.toString();

  const response = await apiFetch<ReviewWithMedia[], PaginationMeta>(
    `/reviews/moderation${query ? `?${query}` : ""}`,
  );

  return {
    items: response.data,
    meta: response.meta as PaginationMeta,
  };
}

export async function createReview(
  payload: CreateReviewInput,
): Promise<Review> {
  const response = await apiFetch<Review>("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateReview(
  reviewId: string,
  payload: UpdateReviewInput,
): Promise<Review> {
  const response = await apiFetch<Review>(
    `/reviews/${encodeURIComponent(reviewId)}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );

  return response.data;
}

export async function updateReviewStatus(
  reviewId: string,
  status: Extract<ReviewStatus, "APPROVED" | "REJECTED">,
): Promise<ReviewWithMedia> {
  const response = await apiFetch<ReviewWithMedia>(
    `/reviews/${encodeURIComponent(reviewId)}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    },
  );

  return response.data;
}

export async function deleteReview(reviewId: string): Promise<void> {
  await apiFetch<null>(`/reviews/${encodeURIComponent(reviewId)}`, {
    method: "DELETE",
  });
}
