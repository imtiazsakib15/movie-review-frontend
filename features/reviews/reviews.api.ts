import { apiFetch } from "@/lib/api";

import type {
  CreateReviewInput,
  Review,
  UpdateReviewInput,
} from "./reviews.types";

export async function getReviewsForMedia(mediaId: string): Promise<Review[]> {
  const response = await apiFetch<Review[]>(
    `/reviews/media/${encodeURIComponent(mediaId)}`,
  );

  return response.data;
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
