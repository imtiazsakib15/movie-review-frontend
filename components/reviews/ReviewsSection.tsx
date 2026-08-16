"use client";

import { useState } from "react";
import { MessageSquareText } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import { useCreateReview } from "@/features/reviews/reviews.hooks";

import type { CreateReviewFormValues } from "@/features/reviews/reviews.schema";

import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { ReviewSummary } from "./ReviewSummary";

interface ReviewsSectionProps {
  mediaId: string;
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
}

export function ReviewsSection({
  mediaId,
  averageRating,
  ratingCount,
  reviewCount,
}: ReviewsSectionProps) {
  const { data: user } = useCurrentUser();

  const [isWriting, setIsWriting] = useState(false);

  const createMutation = useCreateReview();

  const handleCreateReview = (data: CreateReviewFormValues) => {
    createMutation.mutate(
      {
        ...data,
        mediaId,
      },
      {
        onSuccess: () => {
          setIsWriting(false);
        },
      },
    );
  };

  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
            <MessageSquareText className="size-5 text-neutral-300" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Community
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">Reviews</h2>
          </div>
        </div>

        <ReviewSummary
          averageRating={averageRating}
          ratingCount={ratingCount}
          reviewCount={reviewCount}
        />

        {user ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            {!isWriting ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    Share your opinion
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Tell the Cinevoo community what you think.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => setIsWriting(true)}
                  className="bg-white text-black hover:bg-neutral-200"
                >
                  Write a review
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-white">
                    Write a review
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    Share your thoughts about this title.
                  </p>
                </div>

                <ReviewForm
                  isSubmitting={createMutation.isPending}
                  onSubmit={handleCreateReview}
                  onCancel={() => setIsWriting(false)}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-semibold text-white">
                Have something to say?
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Sign in to leave your review.
              </p>
            </div>

            <Button
              type="button"
              nativeButton={false}
              render={<a href="/login" />}
              className="bg-white text-black hover:bg-neutral-200"
            >
              Sign in
            </Button>
          </div>
        )}

        <div className="mt-8">
          <ReviewList mediaId={mediaId} />
        </div>
      </div>
    </section>
  );
}
