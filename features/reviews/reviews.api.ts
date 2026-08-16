import { apiFetch } from "@/lib/api";
import type { PaginationMeta } from "@/types/pagination";

import type {
  CreateReviewInput,
  ListReviewsForMediaParams,
  Review,
  ReviewListResponse,
  UpdateReviewInput,
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

export async function getReviewById(reviewId: string): Promise<Review> {
  const response = await apiFetch<Review>(
    `/reviews/${encodeURIComponent(reviewId)}`,
  );

  return response.data;
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

export async function deleteReview(reviewId: string): Promise<void> {
  await apiFetch<null>(`/reviews/${encodeURIComponent(reviewId)}`, {
    method: "DELETE",
  });
}
