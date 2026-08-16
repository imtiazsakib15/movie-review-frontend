"use client";

import { useState } from "react";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import {
  useDeleteReview,
  useUpdateReview,
} from "@/features/reviews/reviews.hooks";

import type { Review } from "@/features/reviews/reviews.types";

import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { ReviewListSkeleton } from "./ReviewListSkeleton";

interface ReviewListProps {
  mediaId: string;
  reviews: Review[];
  isLoading?: boolean;
}

export function ReviewList({ mediaId, reviews, isLoading }: ReviewListProps) {
  const { data: user } = useCurrentUser();

  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const updateMutation = useUpdateReview(mediaId, editingReview?.id ?? "");

  const deleteMutation = useDeleteReview(mediaId);

  if (isLoading) {
    return <ReviewListSkeleton />;
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-12 text-center">
        <h3 className="font-semibold text-white">No reviews yet</h3>

        <p className="mt-2 text-sm text-neutral-500">
          Be the first person to review this title.
        </p>
      </div>
    );
  }

  if (editingReview) {
    return (
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <h3 className="mb-5 text-lg font-semibold text-white">
          Edit your review
        </h3>

        <ReviewForm
          existingReview={editingReview}
          isSubmitting={updateMutation.isPending}
          onSubmit={(data) => {
            updateMutation.mutate(data, {
              onSuccess: () => {
                setEditingReview(null);
              },
            });
          }}
          onCancel={() => setEditingReview(null)}
        />
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
    </div>
  );
}
