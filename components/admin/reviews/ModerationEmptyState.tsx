import { CheckCircle2, MessageSquareText } from "lucide-react";

import type { ReviewStatus } from "@/features/reviews/reviews.types";

interface ModerationEmptyStateProps {
  status: ReviewStatus;
}

export function ModerationEmptyState({ status }: ModerationEmptyStateProps) {
  const content = {
    PENDING: {
      title: "No pending reviews",
      description: "There are no reviews waiting for moderation.",
    },

    APPROVED: {
      title: "No approved reviews",
      description: "No approved reviews were found.",
    },

    REJECTED: {
      title: "No rejected reviews",
      description: "No rejected reviews were found.",
    },
  }[status];

  return (
    <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5">
        {status === "PENDING" ? (
          <MessageSquareText className="size-6 text-neutral-500" />
        ) : (
          <CheckCircle2 className="size-6 text-neutral-500" />
        )}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">{content.title}</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        {content.description}
      </p>
    </div>
  );
}
