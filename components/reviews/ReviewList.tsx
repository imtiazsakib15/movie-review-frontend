"use client";

import { useState } from "react";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import {
  useDeleteReview,
  useReviewsForMedia,
  useUpdateReview,
} from "@/features/reviews/reviews.hooks";

import type { Review } from "@/features/reviews/reviews.types";

import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { ReviewListSkeleton } from "./ReviewListSkeleton";

interface ReviewListProps {
  mediaId: string;
}

export function ReviewList({ mediaId }: ReviewListProps) {
  const { data: user } = useCurrentUser();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useReviewsForMedia(mediaId);

  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const updateMutation = useUpdateReview(mediaId, editingReview?.id ?? "");

  const deleteMutation = useDeleteReview(mediaId);

  if (isLoading) {
    return <ReviewListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] px-6 py-12 text-center">
        <h3 className="font-semibold text-white">Couldn't load reviews</h3>

        <p className="mt-2 text-sm text-neutral-500">
          Something went wrong while loading the reviews.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const reviews = data?.pages.flatMap((page) => page.items) ?? [];

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
        <h3 className="font-semibold text-white">No reviews yet</h3>

        <p className="mt-2 text-sm text-neutral-500">
          Be the first person to review this title.
        </p>
      </div>
    );
  }

  if (editingReview) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <h3 className="mb-5 text-lg font-semibold text-white">
            Edit your review
          </h3>

          <ReviewForm
            existingReview={editingReview}
            isSubmitting={updateMutation.isPending}
            onSubmit={(values) => {
              updateMutation.mutate(values, {
                onSuccess: () => {
                  setEditingReview(null);
                },
              });
            }}
            onCancel={() => setEditingReview(null)}
          />
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={user?.id}
              onDelete={(reviewId) => deleteMutation.mutate(reviewId)}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          currentUserId={user?.id}
          onEdit={review.status !== "APPROVED" ? setEditingReview : undefined}
          onDelete={(reviewId) => deleteMutation.mutate(reviewId)}
          isDeleting={deleteMutation.isPending}
        />
      ))}

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="rounded-md border border-white/10 bg-white/4 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white disabled:pointer-events-none disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading reviews..." : "Load more reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
