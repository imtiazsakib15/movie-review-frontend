"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { CompletedItem } from "@/features/completed/completed.types";
import { useRemoveFromCompleted } from "@/features/completed/completed.hooks";

interface CompletedCardProps {
  item: CompletedItem;
}

export function CompletedCard({ item }: CompletedCardProps) {
  const removeMutation = useRemoveFromCompleted();

  const { media } = item;

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-white/3 transition-all hover:border-white/20 hover:bg-white/5">
      <Link href={`/media/${media.slug}`}>
        <div className="relative aspect-2/3 overflow-hidden bg-neutral-900">
          {media.posterUrl ? (
            <Image
              src={media.posterUrl}
              alt={media.title}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 220px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-600">
              No poster
            </div>
          )}

          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1.5 text-xs font-semibold text-white">
            <Check className="size-3.5" />
            Completed
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm font-medium text-white">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />

            {media.ratingCount > 0 ? media.avgRating.toFixed(1) : "N/A"}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/media/${media.slug}`}>
          <h2 className="line-clamp-1 font-semibold text-white hover:text-neutral-300">
            {media.title}
          </h2>
        </Link>

        <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
          <span>{media.releaseYear}</span>

          <span>•</span>

          <span>{media.type}</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={removeMutation.isPending}
          onClick={() => removeMutation.mutate(media.id)}
          className="mt-3 w-full text-neutral-400 hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 className="size-4" />

          {removeMutation.isPending ? "Removing..." : "Remove"}
        </Button>
      </div>
    </article>
  );
}
