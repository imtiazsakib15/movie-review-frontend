"use client";

import Link from "next/link";
import { Bookmark, Check, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
} from "@/features/watchlist/watchlist.hooks";

import {
  useMarkAsCompleted,
  useRemoveFromCompleted,
} from "@/features/completed/completed.hooks";

interface MediaActionsProps {
  mediaId: string;
  streamingUrl?: string | null;
}

export function MediaActions({ mediaId, streamingUrl }: MediaActionsProps) {
  const { data: user } = useCurrentUser();

  const addWatchlistMutation = useAddToWatchlist();

  const removeWatchlistMutation = useRemoveFromWatchlist();

  const markCompletedMutation = useMarkAsCompleted();

  const removeCompletedMutation = useRemoveFromCompleted();

  const isWatchlistPending =
    addWatchlistMutation.isPending || removeWatchlistMutation.isPending;

  const isCompletedPending =
    markCompletedMutation.isPending || removeCompletedMutation.isPending;

  if (!user) {
    return (
      <div className="flex flex-wrap gap-3">
        {streamingUrl && (
          <Button
            type="button"
            nativeButton={false}
            render={
              <a
                href={streamingUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            className="bg-white text-black hover:bg-neutral-200"
          >
            <Play className="size-4" />
            Watch
          </Button>
        )}

        <Button
          type="button"
          nativeButton={false}
          render={<Link href="/login" />}
          variant="outline"
          className="border-white/10 bg-white/3 text-white hover:bg-white/10"
        >
          <Bookmark className="size-4" />
          Sign in to save
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {streamingUrl && (
        <Button
          type="button"
          nativeButton={false}
          render={
            <a href={streamingUrl} target="_blank" rel="noopener noreferrer" />
          }
          className="bg-white text-black hover:bg-neutral-200"
        >
          <Play className="size-4" />
          Watch
        </Button>
      )}

      <Button
        type="button"
        disabled={isWatchlistPending}
        onClick={() =>
          addWatchlistMutation.mutate({
            mediaId,
          })
        }
        variant="outline"
        className="border-white/10 bg-white/3 text-white hover:bg-white/10"
      >
        <Bookmark className="size-4" />
        {isWatchlistPending ? "Saving..." : "Add to Watchlist"}
      </Button>

      <Button
        type="button"
        disabled={isCompletedPending}
        onClick={() =>
          markCompletedMutation.mutate({
            mediaId,
          })
        }
        variant="outline"
        className="border-white/10 bg-white/3 text-white hover:bg-white/10"
      >
        <Check className="size-4" />
        {isCompletedPending ? "Saving..." : "Mark as Completed"}
      </Button>
    </div>
  );
}
