"use client";

import { CheckCircle2 } from "lucide-react";

import { CompletedEmptyState } from "@/components/completed/CompletedEmptyState";
import { CompletedGrid } from "@/components/completed/CompletedGrid";
import { CompletedSkeleton } from "@/components/completed/CompletedSkeleton";

import { useCompleted } from "@/features/completed/completed.hooks";

export default function CompletedPage() {
  const { data: completed, isLoading, isError, refetch } = useCompleted();

  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
            <CheckCircle2 className="size-5 text-neutral-300" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Your library
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              Completed
            </h1>
          </div>
        </div>

        {!isLoading && !isError && completed && (
          <p className="mt-3 text-sm text-neutral-500">
            {completed.length} {completed.length === 1 ? "title" : "titles"}{" "}
            completed
          </p>
        )}
      </div>

      {isLoading && <CompletedSkeleton />}

      {!isLoading && isError && (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
          <h2 className="font-semibold text-white">
            Couldn't load your completed media
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading your completed titles.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/8 hover:text-white"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && completed && completed.length === 0 && (
        <CompletedEmptyState />
      )}

      {!isLoading && !isError && completed && completed.length > 0 && (
        <CompletedGrid items={completed} />
      )}
    </section>
  );
}
