import Link from "next/link";
import { Star } from "lucide-react";

import type { ReviewWithMedia } from "@/features/reviews/reviews.types";

interface PendingReviewsProps {
  reviews: ReviewWithMedia[];
}

export function PendingReviews({ reviews }: PendingReviewsProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/3">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="font-semibold text-white">Pending reviews</h2>

        <p className="mt-1 text-xs text-neutral-600">Waiting for moderation</p>
      </div>

      <div className="divide-y divide-white/5">
        {reviews.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-neutral-500">
            No pending reviews.
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {review.user.name ?? "Anonymous"}
                  </p>

                  <Link
                    href={`/media/${review.media.slug}`}
                    className="mt-1 block truncate text-xs text-neutral-500 hover:text-white"
                  >
                    {review.media.title}
                  </Link>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-neutral-300">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  {review.rating}/10
                </span>
              </div>

              <p className="mt-3 line-clamp-2 text-xs leading-5 text-neutral-500">
                {review.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
