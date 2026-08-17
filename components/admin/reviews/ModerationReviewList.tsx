"use client";

import { useState } from "react";

import {
  useDeleteReview,
  useModerationReviews,
  useUpdateReviewStatus,
} from "@/features/reviews/reviews.hooks";

import type { ReviewStatus } from "@/features/reviews/reviews.types";

import { ModerationEmptyState } from "./ModerationEmptyState";
import { ModerationReviewCard } from "./ModerationReviewCard";
import { ModerationSkeleton } from "./ModerationSkeleton";
import { ModerationFilters } from "./ModerationFilters";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export function ModerationReviewList() {
  const [status, setStatus] = useState<ReviewStatus>("PENDING");

  const [page, setPage] = useState(1);

  const [deleteReview, setDeleteReview] = useState<{
    id: string;
    mediaTitle: string;
  } | null>(null);

  const { data, isLoading, isError, isFetching, refetch } =
    useModerationReviews({
      page,
      limit: 8,
      status,
    });

  const statusMutation = useUpdateReviewStatus();

  const deleteMutation = useDeleteReview();

  const reviews = data?.items ?? [];

  const meta = data?.meta;

  const handleStatusChange = (nextStatus: ReviewStatus) => {
    setStatus(nextStatus);
    setPage(1);
  };

  const handleModerate = (
    reviewId: string,
    nextStatus: "APPROVED" | "REJECTED",
  ) => {
    statusMutation.mutate({
      reviewId,
      status: nextStatus,
    });
  };

  const handleDelete = () => {
    if (!deleteReview) {
      return;
    }

    deleteMutation.mutate(deleteReview.id, {
      onSuccess: () => {
        setDeleteReview(null);
      },
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ModerationFilters status={status} onChange={handleStatusChange} />

        {isFetching && (
          <span className="text-xs text-neutral-600">Updating...</span>
        )}
      </div>

      {isLoading ? (
        <ModerationSkeleton />
      ) : isError ? (
        <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
          <h2 className="font-semibold text-white">Couldn't load reviews</h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading the moderation queue.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 hover:text-white"
          >
            Try again
          </button>
        </div>
      ) : reviews.length === 0 ? (
        <ModerationEmptyState status={status} />
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ModerationReviewCard
                key={review.id}
                review={review}
                isUpdating={statusMutation.isPending}
                isDeleting={deleteMutation.isPending}
                onApprove={() => handleModerate(review.id, "APPROVED")}
                onReject={() => handleModerate(review.id, "REJECTED")}
                onDelete={() =>
                  setDeleteReview({
                    id: review.id,
                    mediaTitle: review.media.title,
                  })
                }
              />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page === 1 || isFetching}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 disabled:pointer-events-none disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-neutral-500">
                Page <span className="font-medium text-white">{page}</span> of{" "}
                <span className="font-medium text-white">
                  {meta.totalPages}
                </span>
              </span>

              <button
                type="button"
                disabled={page >= meta.totalPages || isFetching}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteReview)}
        title="Delete review"
        description={
          <>
            Are you sure you want to delete this review for{" "}
            <span className="font-medium text-neutral-200">
              &quot;
              {deleteReview?.mediaTitle}
              &quot;
            </span>
            ?
            <span className="mt-2 block">
              Approved review deletion can change the media&apos;s rating
              statistics.
            </span>
          </>
        }
        confirmLabel="Delete review"
        isLoading={deleteMutation.isPending}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setDeleteReview(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
