import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { Media } from "@/features/media/media.types";

interface HomeMediaCardProps {
  media: Media;
}

export function HomeMediaCard({ media }: HomeMediaCardProps) {
  return (
    <Link href={`/media/${media.slug}`} className="group block">
      <article className="overflow-hidden rounded-xl border border-white/10 bg-white/3 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/5">
        <div className="relative aspect-2/3 overflow-hidden bg-neutral-900">
          {media.posterUrl ? (
            <Image
              src={media.posterUrl}
              alt={media.title}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-600">
              No poster
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent" />

          <div className="absolute left-3 top-3">
            <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {media.type}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-sm font-medium text-white">
            <Star className="size-3.5 fill-yellow-400 text-yellow-400" />

            <span>
              {media.ratingCount > 0 ? media.avgRating.toFixed(1) : "N/A"}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-1 font-semibold text-white">
            {media.title}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
            <span>{media.releaseYear}</span>

            <span>•</span>

            <span>
              {media.reviewCount}{" "}
              {media.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
