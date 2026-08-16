"use client";

import Link from "next/link";
import { CalendarDays, Pencil, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { MyReview } from "@/features/reviews/reviews.types";

import {
  useDeleteReview,
  useUpdateReview,
} from "@/features/reviews/reviews.hooks";

import { ReviewForm } from "./ReviewForm";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

import { useState } from "react";

interface MyReviewCardProps {
  review: MyReview;
}

export function MyReviewCard({ review }: MyReviewCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const updateMutation = useUpdateReview(review.mediaId, review.id);

  const deleteMutation = useDeleteReview(review.mediaId);

  const canEdit = review.status !== "APPROVED";

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) {
      return;
    }

    deleteMutation.mutate(review.id);
  };

  if (isEditing) {
    return (
      <article className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
            Editing review
          </p>

          <Link
            href={`/media/${review.media.slug}`}
            className="mt-2 block text-lg font-semibold text-white transition-colors hover:text-neutral-300"
          >
            {review.media.title}
          </Link>
        </div>

        <ReviewForm
          existingReview={review}
          isSubmitting={updateMutation.isPending}
          onSubmit={(data) => {
            updateMutation.mutate(data, {
              onSuccess: () => {
                setIsEditing(false);
              },
            });
          }}
          onCancel={() => setIsEditing(false)}
        />
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-white/15 sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <Link
              href={`/media/${review.media.slug}`}
              className="text-lg font-semibold text-white transition-colors hover:text-neutral-300"
            >
              {review.media.title}
            </Link>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <ReviewStatusBadge status={review.status} />

              <span className="inline-flex items-center gap-1.5 text-sm text-neutral-500">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                {review.rating}/10
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600">
                <CalendarDays className="size-3.5" />
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            {canEdit && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="border-white/10 bg-white/3 text-neutral-300 hover:bg-white/10 hover:text-white"
              >
                <Pencil className="size-4" />
                Edit
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={deleteMutation.isPending}
              onClick={handleDelete}
              className="text-neutral-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="size-4" />
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/10 p-4">
          <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-400">
            {review.content}
          </p>

          {review.hasSpoiler && (
            <span className="mt-4 inline-block rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-medium text-red-400">
              Contains spoilers
            </span>
          )}
        </div>

        {review.status === "REJECTED" && (
          <p className="text-sm text-red-300">
            This review was rejected by moderation. You can edit it and resubmit
            it for moderation.
          </p>
        )}

        {review.status === "PENDING" && (
          <p className="text-sm text-yellow-300/80">
            Your review is waiting for moderation.
          </p>
        )}

        {review.status === "APPROVED" && (
          <p className="text-sm text-emerald-300/80">
            Your review is publicly visible.
          </p>
        )}
      </div>
    </article>
  );
}
