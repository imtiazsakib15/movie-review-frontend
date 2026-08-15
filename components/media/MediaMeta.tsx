import { CalendarDays, Clock3, Globe2, Star } from "lucide-react";

import type { Media } from "@/features/media/media.types";

interface MediaMetaProps {
  media: Media;
}

export function MediaMeta({ media }: MediaMetaProps) {
  const hasRating = media.ratingCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-neutral-400">
      <span className="inline-flex items-center gap-2">
        <CalendarDays className="size-4 text-neutral-500" />
        {media.releaseYear}
      </span>

      {media.runtimeMinutes && (
        <span className="inline-flex items-center gap-2">
          <Clock3 className="size-4 text-neutral-500" />
          {media.runtimeMinutes} min
        </span>
      )}

      {media.language && (
        <span className="inline-flex items-center gap-2">
          <Globe2 className="size-4 text-neutral-500" />
          {media.language}
        </span>
      )}

      <span className="inline-flex items-center gap-2">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />

        {hasRating ? media.avgRating.toFixed(1) : "Not rated"}

        <span className="text-neutral-600">({media.ratingCount})</span>
      </span>
    </div>
  );
}
