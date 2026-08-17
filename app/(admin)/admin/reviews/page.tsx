"use client";

import { MessageSquareText } from "lucide-react";

import { ModerationReviewList } from "@/components/admin/reviews/ModerationReviewList";

export default function AdminReviewsPage() {
  return (
    <section className="space-y-8">
      <header>
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
            <MessageSquareText className="size-5 text-neutral-200" />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
              Administration
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Review moderation
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          Review user submissions, approve or reject them, and keep
          Cinevoo&apos;s ratings trustworthy.
        </p>
      </header>

      <ModerationReviewList />
    </section>
  );
}
