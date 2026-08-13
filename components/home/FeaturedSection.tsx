"use client";

import Link from "next/link";

import { useFeaturedMedia } from "@/features/media/media.hooks";
import { HomeMediaCard } from "./HomeMediaCard";
import { HomeMediaSkeleton } from "./HomeSkeleton";

export function FeaturedSection() {
  const { data, isLoading, isError } = useFeaturedMedia();

  const media = data?.items ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Curated
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Featured on Cinevoo
          </h2>
        </div>

        <Link
          href="/media"
          className="hidden text-sm font-medium text-neutral-400 transition-colors hover:text-white sm:block"
        >
          View all
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <HomeMediaSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && !isError && media.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {media.map((item) => (
            <HomeMediaCard key={item.id} media={item} />
          ))}
        </div>
      )}

      {!isLoading && !isError && media.length === 0 && (
        <p className="py-12 text-center text-sm text-neutral-500">
          No featured titles yet.
        </p>
      )}

      {isError && (
        <p className="py-12 text-center text-sm text-neutral-500">
          Unable to load featured titles.
        </p>
      )}
    </section>
  );
}
