"use client";

import { Bookmark } from "lucide-react";

import { WatchlistEmptyState } from "@/components/watchlist/WatchlistEmptyState";
import { WatchlistGrid } from "@/components/watchlist/WatchlistGrid";
import { WatchlistSkeleton } from "@/components/watchlist/WatchlistSkeleton";

import { useWatchlist } from "@/features/watchlist/watchlist.hooks";

export default function WatchlistPage() {
  const { data: watchlist, isLoading, isError, refetch } = useWatchlist(true);

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
              <Bookmark className="size-5 text-neutral-300" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
                Your library
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Watchlist
              </h1>
            </div>
          </div>

          {!isLoading && !isError && watchlist && (
            <p className="mt-3 text-sm text-neutral-500">
              {watchlist.length} {watchlist.length === 1 ? "title" : "titles"}{" "}
              saved
            </p>
          )}
        </div>
      </div>

      {isLoading && <WatchlistSkeleton />}

      {!isLoading && isError && (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
          <h2 className="font-semibold text-white">
            Couldn't load your watchlist
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading your saved titles.
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

      {!isLoading && !isError && watchlist && watchlist.length === 0 && (
        <WatchlistEmptyState />
      )}

      {!isLoading && !isError && watchlist && watchlist.length > 0 && (
        <WatchlistGrid items={watchlist} />
      )}
    </section>
  );
}
