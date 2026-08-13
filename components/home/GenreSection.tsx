"use client";

import Link from "next/link";

import { useGenres } from "@/features/genres/genres.hooks";

export function GenreSection() {
  const { data: genres, isLoading } = useGenres();

  return (
    <section className="border-t border-white/10 bg-white/1.5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Find your mood
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Browse by Genre
          </h2>
        </div>

        {isLoading ? (
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-24 animate-pulse rounded-full bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {genres?.map((genre) => (
              <Link
                key={genre.id}
                href={`/media?genre=${genre.slug}`}
                className="rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
