"use client";

import Link from "next/link";
import { Bookmark, Check, Play } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useWatchlist,
} from "@/features/watchlist/watchlist.hooks";

import {
  useCompleted,
  useMarkAsCompleted,
  useRemoveFromCompleted,
} from "@/features/completed/completed.hooks";

interface MediaActionsProps {
  mediaId: string;
  streamingUrl?: string | null;
}

export function MediaActions({ mediaId, streamingUrl }: MediaActionsProps) {
  const { data: user } = useCurrentUser();

  const { data: watchlist, isLoading: isWatchlistLoading } = useWatchlist(
    Boolean(user),
  );

  const { data: completed, isLoading: isCompletedLoading } = useCompleted(
    Boolean(user),
  );

  const addWatchlistMutation = useAddToWatchlist();
  const removeWatchlistMutation = useRemoveFromWatchlist();

  const markCompletedMutation = useMarkAsCompleted();
  const removeCompletedMutation = useRemoveFromCompleted();

  const isInWatchlist = Boolean(
    watchlist?.some((item) => item.mediaId === mediaId),
  );

  const isCompleted = Boolean(
    completed?.some((item) => item.mediaId === mediaId),
  );

  const isWatchlistPending =
    isWatchlistLoading ||
    addWatchlistMutation.isPending ||
    removeWatchlistMutation.isPending;

  const isCompletedPending =
    isCompletedLoading ||
    markCompletedMutation.isPending ||
    removeCompletedMutation.isPending;

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

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeWatchlistMutation.mutate(mediaId);
      return;
    }

    addWatchlistMutation.mutate({
      mediaId,
    });
  };

  const handleCompletedToggle = () => {
    if (isCompleted) {
      removeCompletedMutation.mutate(mediaId);
      return;
    }

    markCompletedMutation.mutate({
      mediaId,
    });
  };

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
        variant="outline"
        disabled={isWatchlistPending}
        onClick={handleWatchlistToggle}
        className="border-white/10 bg-white/3 text-white hover:bg-white/10"
      >
        <Bookmark
          className={isInWatchlist ? "size-4 fill-current" : "size-4"}
        />

        {isWatchlistLoading
          ? "Checking..."
          : isInWatchlist
            ? "Remove from Watchlist"
            : "Add to Watchlist"}
      </Button>

      <Button
        type="button"
        variant={isCompleted ? "default" : "outline"}
        disabled={isCompletedPending}
        onClick={handleCompletedToggle}
        className={
          isCompleted
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "border-white/10 bg-white/3 text-white hover:bg-white/10"
        }
      >
        <Check className="size-4" />

        {isCompletedLoading
          ? "Checking..."
          : isCompleted
            ? "Completed"
            : "Mark as Completed"}
      </Button>
    </div>
  );
}
