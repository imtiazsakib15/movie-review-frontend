import Image from "next/image";
import { Crown } from "lucide-react";

import type { Media } from "@/features/media/media.types";

import { MediaActions } from "./MediaActions";
import { MediaGenres } from "./MediaGenres";
import { MediaMeta } from "./MediaMeta";

interface MediaHeroProps {
  media: Media;
}

export function MediaHero({ media }: MediaHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0">
        {media.posterUrl && (
          <Image
            src={media.posterUrl}
            alt={media.title}
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover opacity-[0.08] blur-3xl"
          />
        )}

        <div className="absolute inset-0 bg-neutral-950/90" />

        <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-center xl:grid-cols-[360px_1fr]">
          {/* Poster */}
          <div className="mx-auto w-full max-w-70 lg:max-w-none">
            <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/50">
              {media.posterUrl ? (
                <Image
                  src={media.posterUrl}
                  alt={media.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 280px, 360px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-neutral-600">
                  No poster available
                </div>
              )}

              {media.access === "PREMIUM" && (
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/20 bg-black/60 px-3 py-1.5 text-xs font-semibold text-yellow-300 backdrop-blur-md">
                  <Crown className="size-3.5" />
                  Premium
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-neutral-300">
                {media.type}
              </span>

              {media.isFeatured && (
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {media.title}
            </h1>

            <div className="mt-6">
              <MediaMeta media={media} />
            </div>

            <div className="mt-6">
              <MediaGenres genres={media.genres} />
            </div>

            {media.description && (
              <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-400">
                {media.description}
              </p>
            )}

            <div className="mt-8">
              <MediaActions
                mediaId={media.id}
                streamingUrl={media.streamingUrl}
              />
            </div>

            <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Reviews
                </p>

                <p className="mt-1 font-medium text-white">
                  {media.reviewCount}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Ratings
                </p>

                <p className="mt-1 font-medium text-white">
                  {media.ratingCount}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-600">
                  Access
                </p>

                <p className="mt-1 font-medium text-white">
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
