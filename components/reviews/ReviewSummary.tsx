import { Star } from "lucide-react";

interface ReviewSummaryProps {
  averageRating: number;
  ratingCount: number;
  reviewCount: number;
}

export function ReviewSummary({
  averageRating,
  ratingCount,
  reviewCount,
}: ReviewSummaryProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
            Community rating
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Star className="size-6 fill-yellow-400 text-yellow-400" />

            <span className="text-3xl font-bold text-white">
              {ratingCount > 0 ? averageRating.toFixed(1) : "—"}
            </span>

            <span className="text-sm text-neutral-500">/ 10</span>
          </div>

          <p className="mt-1 text-xs text-neutral-600">
            {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
          </p>
        </div>

        <div className="hidden h-12 w-px bg-white/10 sm:block" />

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
            Reviews
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {reviewCount}
          </p>

          <p className="text-xs text-neutral-600">Approved reviews</p>
        </div>
      </div>
    </div>
  );
}
