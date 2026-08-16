import Link from "next/link";
import { MessageSquareText } from "lucide-react";

interface MyReviewsEmptyStateProps {
  status?: string;
}

export function MyReviewsEmptyState({ status }: MyReviewsEmptyStateProps) {
  const message = status
    ? `You don't have any ${status.toLowerCase()} reviews.`
    : "You haven't written any reviews yet.";

  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-white/5">
        <MessageSquareText className="size-6 text-neutral-500" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        No reviews found
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        {message}
      </p>

      {!status && (
        <Link
          href="/media"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
        >
          Explore media
        </Link>
      )}
    </div>
  );
}
