"use client";

import { MoreHorizontal, Star } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import type { Review } from "@/features/reviews/reviews.types";

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  isDeleting?: boolean;
}

export function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
}: ReviewCardProps) {
  const isOwner = currentUserId === review.userId;

  const displayName = review.user?.name ?? "Anonymous";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
            {initial}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-white">{displayName}</p>

            <p className="text-xs text-neutral-600">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {isOwner && (onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-500 hover:bg-white/5 hover:text-white"
                />
              }
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {onEdit && review.status !== "APPROVED" && (
                <DropdownMenuItem onClick={() => onEdit(review)}>
                  Edit review
                </DropdownMenuItem>
              )}

              {onDelete && (
                <DropdownMenuItem
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={() => onDelete(review.id)}
                >
                  {isDeleting ? "Deleting..." : "Delete review"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />

        <span className="font-semibold text-white">{review.rating}/10</span>

        {review.hasSpoiler && (
          <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-400">
            Spoiler
          </span>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-neutral-400">
        {review.content}
      </p>
    </article>
  );
}
