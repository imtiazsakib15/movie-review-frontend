"use client";

import { useState } from "react";

import { useMyReviews } from "@/features/reviews/reviews.hooks";

import type { ReviewStatus } from "@/features/reviews/reviews.types";

import { MyReviewCard } from "./MyReviewCard";
import { MyReviewsEmptyState } from "./MyReviewsEmptyState";
import { MyReviewsSkeleton } from "./MyReviewsSkeleton";
import { MyReviewsFilters } from "./MyReviewsFilters";

export function MyReviewsList() {
  const [status, setStatus] = useState<ReviewStatus | undefined>(undefined);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } = useMyReviews({
    page,
    limit: 8,
    ...(status ? { status } : {}),
  });

  const reviews = data?.items ?? [];
  const meta = data?.meta;

  const handleStatusChange = (nextStatus?: ReviewStatus) => {
    setStatus(nextStatus);
    setPage(1);
  };

  if (isLoading) {
    return <MyReviewsSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
        <h2 className="font-semibold text-white">Couldn't load your reviews</h2>

        <p className="mt-2 text-sm text-neutral-500">
          Something went wrong while loading your reviews.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/8 hover:text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <MyReviewsFilters status={status} onChange={handleStatusChange} />

        {isFetching && (
          <span className="text-xs text-neutral-600">Updating...</span>
        )}
      </div>

      {reviews.length === 0 ? (
        <MyReviewsEmptyState status={status} />
      ) : (
        <>
          <div className="space-y-4">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/8 hover:text-white disabled:pointer-events-none disabled:opacity-40"
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
                disabled={page >= meta.totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/8 hover:text-white disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
