import Link from "next/link";
import { Star } from "lucide-react";

import type { MyReview } from "@/features/reviews/reviews.types";

interface RecentReviewsProps {
  reviews: MyReview[];
}

export function RecentReviews({ reviews }: RecentReviewsProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/2.5">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
            Activity
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            Recent reviews
          </h2>
        </div>

        <Link
          href="/dashboard/reviews"
          className="text-xs font-medium text-neutral-500 transition-colors hover:text-white"
        >
          View all
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-sm text-neutral-500">
            You haven't written any reviews yet.
          </p>

          <Link
            href="/media"
            className="mt-4 inline-block text-sm font-medium text-white hover:text-neutral-300"
          >
            Explore media
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {reviews.map((review) => (
            <div key={review.id} className="px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={`/media/${review.media.slug}`}
                    className="block truncate text-sm font-medium text-white hover:text-neutral-300"
                  >
                    {review.media.title}
                  </Link>

                  <p className="mt-1 text-xs text-neutral-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="inline-flex shrink-0 items-center gap-1 text-sm text-neutral-300">
                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                  {review.rating}/10
                </span>
              </div>

              <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-500">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
