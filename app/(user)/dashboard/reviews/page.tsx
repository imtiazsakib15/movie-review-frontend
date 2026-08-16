import { MessageSquareText } from "lucide-react";

import { MyReviewsList } from "@/components/reviews/MyReviewsList";

export default function MyReviewsPage() {
  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
            <MessageSquareText className="size-5 text-neutral-300" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Your activity
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              My Reviews
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          Manage your reviews, check moderation status, and update reviews that
          haven't been approved yet.
        </p>
      </div>

      <MyReviewsList />
    </section>
  );
}
