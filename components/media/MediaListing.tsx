"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGenres } from "@/features/genres/genres.hooks";

import {
  mediaQuerySchema,
  type MediaQuery,
} from "@/features/media/media.schema";

import { useMedia } from "@/features/media/media.hooks";

import { MediaEmptyState } from "./MediaEmptyState";
import { MediaFilters } from "./MediaFilters";
import { MediaGrid } from "./MediaGrid";
import { MediaGridSkeleton } from "./MediaGridSkeleton";
import { MediaPagination } from "./MediaPagination";

export function MediaListing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<MediaQuery>(() => {
    const raw = {
      page: searchParams.get("page") ?? undefined,

      limit: searchParams.get("limit") ?? undefined,

      search: searchParams.get("search") ?? "",

      type: searchParams.get("type") ?? undefined,

      access: searchParams.get("access") ?? undefined,

      genre: searchParams.get("genre") ?? undefined,

      releaseYear: searchParams.get("releaseYear") ?? undefined,

      sortBy: searchParams.get("sortBy") ?? undefined,

      sortOrder: searchParams.get("sortOrder") ?? undefined,
    };

    const result = mediaQuerySchema.safeParse(raw);

    if (result.success) {
      return result.data;
    }

    return mediaQuerySchema.parse({});
  }, [searchParams]);

  const { data, isLoading, isFetching, isError, refetch } = useMedia(filters);

  const { data: genres = [], isLoading: isGenresLoading } = useGenres();

  const updateFilters = useCallback(
    (updates: Partial<MediaQuery>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      router.push(
        next.toString() ? `${pathname}?${next.toString()}` : pathname,
        {
          scroll: false,
        },
      );
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, {
      scroll: false,
    });
  }, [pathname, router]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilters({ page });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [updateFilters],
  );

  const media = data?.items ?? [];
  const meta = data?.meta;

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Header */}
      <section className="border-b border-white/10 bg-white/1.5">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Discover
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Movies & Series
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
            Discover movies and series, explore ratings, and find something
            worth watching.
          </p>
        </div>
      </section>

      {/* Filters & results */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MediaFilters
          filters={filters}
          genres={genres}
          onChange={updateFilters}
          onReset={resetFilters}
        />

        {isGenresLoading && (
          <div className="mt-2 text-right text-xs text-neutral-700">
            Loading genres...
          </div>
        )}

        <div className="mt-8">
          {isLoading ? (
            <MediaGridSkeleton />
          ) : isError ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
              <h2 className="font-semibold text-white">Couldn't load media</h2>

              <p className="mt-2 text-sm text-neutral-500">
                Something went wrong while loading the media library.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/8 hover:text-white"
              >
                Try again
              </button>
            </div>
          ) : media.length === 0 ? (
            <MediaEmptyState search={filters.search} />
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-neutral-500">
                  {meta?.total ?? 0} {meta?.total === 1 ? "title" : "titles"}
                </p>

                {isFetching && (
                  <span className="text-xs text-neutral-600">Updating...</span>
                )}
              </div>
              <MediaGrid media={media} />

              {meta && (
                <MediaPagination meta={meta} onPageChange={handlePageChange} />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
