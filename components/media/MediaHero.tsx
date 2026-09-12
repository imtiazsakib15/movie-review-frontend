import Image from "next/image";
import { Crown, Star } from "lucide-react";

import type { Media } from "@/features/media/media.types";

import { MediaActions } from "./MediaActions";
import { MediaGenres } from "./MediaGenres";
import { MediaMeta } from "./MediaMeta";

interface MediaHeroProps {
  media: Media;
}

export function MediaHero({ media }: MediaHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Background */}
      <div className="absolute inset-0">
        {media.posterUrl && (
          <Image
            src={media.posterUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover opacity-[0.07] blur-3xl"
          />
        )}

        <div className="absolute inset-0 bg-neutral-950/95" />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/80 via-neutral-950 to-neutral-950" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-16">
          {/* Poster */}
          <div className="lg:sticky lg:top-24">
            <div className="mx-auto w-full max-w-65 sm:max-w-72 lg:max-w-none">
              <div className="group relative aspect-2/3 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/40">
                {media.posterUrl ? (
                  <Image
                    src={media.posterUrl}
                    alt={media.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 288px, 340px"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-neutral-600">
                    No poster available
                  </div>
                )}

                {/* Poster overlay */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 to-transparent" />

                {media.access === "PREMIUM" && (
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-black/60 px-3 py-1.5 text-xs font-semibold text-yellow-300 backdrop-blur-md">
                    <Crown className="size-3.5" />
                    Premium
                  </div>
                )}

                {/* Rating */}
                {media.avgRating > 0 && (
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                    <Star className="size-4 fill-current text-yellow-400" />
                    {media.avgRating.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="min-w-0 max-w-4xl">
            {/* Type / featured */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-300">
                {media.type}
              </span>

              {media.isFeatured && (
                <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-semibold text-indigo-300">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              {media.title}
            </h1>

            {/* Metadata */}
            <div className="mt-6">
              <MediaMeta media={media} />
            </div>

            {/* Genres */}
            {media.genres?.length > 0 && (
              <div className="mt-5">
                <MediaGenres genres={media.genres} />
              </div>
            )}

            {/* Description */}
            {media.description && (
              <div className="mt-8 max-w-3xl border-l border-white/10 pl-5">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-600">
                  Overview
                </p>

                <p className="mt-3 text-base leading-8 text-neutral-400 sm:text-[17px]">
                  {media.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8">
              <MediaActions
                mediaId={media.id}
                streamingUrl={media.streamingUrl}
              />
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/2.5">
              <div className="border-r border-white/10 p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                  Reviews
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  {media.reviewCount}
                </p>
              </div>

              <div className="border-r border-white/10 p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                  Ratings
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  {media.ratingCount}
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-600">
                  Access
                </p>

                <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                  {media.access === "PREMIUM" ? "Premium" : "Free"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
