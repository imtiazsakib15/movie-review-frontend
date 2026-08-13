"use client";

import Link from "next/link";

import { useTopRatedMedia } from "@/features/media/media.hooks";
import { HomeMediaCard } from "./HomeMediaCard";
import { HomeMediaSkeleton } from "./HomeSkeleton";

export function TopRatedSection() {
  const { data, isLoading, isError } = useTopRatedMedia();

  const media = data?.items ?? [];

  return (
    <section className="border-y border-white/10 bg-white/1.5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              Community favorites
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Top Rated
            </h2>
          </div>

          <Link
            href="/media?sortBy=avgRating&sortOrder=desc"
            className="hidden text-sm font-medium text-neutral-400 hover:text-white sm:block"
          >
            Explore top rated
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <HomeMediaSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && !isError && media.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {media.map((item) => (
              <HomeMediaCard key={item.id} media={item} />
            ))}
          </div>
        )}

        {!isLoading && !isError && media.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral-500">
            No rated titles yet.
          </p>
        )}

        {isError && (
          <p className="py-12 text-center text-sm text-neutral-500">
            Unable to load top-rated titles.
          </p>
        )}
      </div>
    </section>
  );
}
