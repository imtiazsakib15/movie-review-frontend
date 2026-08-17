"use client";

import Link from "next/link";
import { Check, Clock3, Star, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { ReviewWithMedia } from "@/features/reviews/reviews.types";

import { ReviewStatusBadge } from "@/components/reviews/ReviewStatusBadge";

interface ModerationReviewCardProps {
  review: ReviewWithMedia;
  isUpdating: boolean;
  isDeleting: boolean;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export function ModerationReviewCard({
  review,
  isUpdating,
  isDeleting,
  onApprove,
  onReject,
  onDelete,
}: ModerationReviewCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-white/15 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            {(review.user.name ?? "U").charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-white">
              {review.user.name ?? "Unnamed user"}
            </p>

            <p className="mt-1 text-xs text-neutral-600">
              Submitted {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <ReviewStatusBadge status={review.status} />
      </div>

      {/* Media */}
      <div className="mt-5 rounded-xl border border-white/5 bg-black/10 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-700">
          Media
        </p>

        <Link
          href={`/media/${review.media.slug}`}
          className="mt-1 block font-medium text-white hover:text-neutral-300"
        >
          {review.media.title}
        </Link>
      </div>

      {/* Rating */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/10 bg-yellow-400/5 px-3 py-1.5 text-sm font-medium text-yellow-300">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          {review.rating}/10
        </span>

        {review.hasSpoiler && (
          <span className="rounded-full border border-red-400/10 bg-red-400/5 px-3 py-1.5 text-xs text-red-300">
            Contains spoilers
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-5 rounded-xl border border-white/5 bg-white/1.5 p-4">
        <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-400">
          {review.content}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {review.status === "PENDING" && (
          <>
            <Button
              type="button"
              disabled={isUpdating || isDeleting}
              onClick={onApprove}
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <Check className="size-4" />
              Approve
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={isUpdating || isDeleting}
              onClick={onReject}
              className="border-red-400/20 bg-red-400/5 text-red-300 hover:bg-red-400/10 hover:text-red-200"
            >
              <X className="size-4" />
              Reject
            </Button>
          </>
        )}

        {review.status === "APPROVED" && (
          <Button
            type="button"
            variant="outline"
            disabled={isUpdating || isDeleting}
            onClick={onReject}
            className="border-red-400/20 bg-red-400/5 text-red-300 hover:bg-red-400/10 hover:text-red-200"
          >
            <X className="size-4" />
            Reject
          </Button>
        )}

        {review.status === "REJECTED" && (
          <Button
            type="button"
            disabled={isUpdating || isDeleting}
            onClick={onApprove}
            className="bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Check className="size-4" />
            Approve
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          disabled={isUpdating || isDeleting}
          onClick={onDelete}
          className="text-neutral-500 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="size-4" />
          Delete
        </Button>

        {(isUpdating || isDeleting) && (
          <span className="inline-flex items-center gap-2 text-xs text-neutral-600">
            <Clock3 className="size-3.5 animate-pulse" />
            Updating...
          </span>
        )}
      </div>
    </article>
  );
}
