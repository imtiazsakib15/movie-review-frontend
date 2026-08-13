"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Genre } from "@/features/genres/genres.types";
import type { MediaAccess, MediaType } from "@/features/media/media.types";
import type { MediaQuery } from "@/features/media/media.schema";

interface MediaFiltersProps {
  filters: MediaQuery;
  genres: Genre[];
  onChange: (updates: Partial<MediaQuery>) => void;
  onReset: () => void;
}

export function MediaFilters({
  filters,
  genres,
  onChange,
  onReset,
}: MediaFiltersProps) {
  const [search, setSearch] = useState(filters.search);

  const [year, setYear] = useState(
    filters.releaseYear ? String(filters.releaseYear) : "",
  );

  useEffect(() => {
    setSearch(filters.search);
  }, [filters.search]);

  useEffect(() => {
    setYear(filters.releaseYear ? String(filters.releaseYear) : "");
  }, [filters.releaseYear]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (search !== filters.search) {
        onChange({
          search,
          page: 1,
        });
      }
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [search, filters.search, onChange]);

  const hasFilters =
    Boolean(filters.search) ||
    Boolean(filters.type) ||
    Boolean(filters.access) ||
    Boolean(filters.genre) ||
    Boolean(filters.releaseYear) ||
    filters.sortBy !== "createdAt" ||
    filters.sortOrder !== "desc";

  const handleYearChange = (value: string) => {
    setYear(value);

    const parsedYear = Number(value);

    onChange({
      releaseYear:
        value && Number.isInteger(parsedYear) ? parsedYear : undefined,
      page: 1,
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(240px,1fr)_repeat(5,minmax(0,1fr))_auto]">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search movies and series..."
            className="h-10 border-white/10 bg-neutral-950 pl-9 text-white placeholder:text-neutral-600 focus-visible:border-white/20 focus-visible:ring-white/10"
          />
        </div>

        {/* Type */}
        <select
          value={filters.type ?? "ALL"}
          onChange={(event) => {
            const value = event.target.value;

            onChange({
              type: value === "ALL" ? undefined : (value as MediaType),
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none focus:border-white/20"
        >
          <option value="ALL">All types</option>
          <option value="MOVIE">Movies</option>
          <option value="SERIES">Series</option>
        </select>

        {/* Access */}
        <select
          value={filters.access ?? "ALL"}
          onChange={(event) => {
            const value = event.target.value;

            onChange({
              access: value === "ALL" ? undefined : (value as MediaAccess),
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none focus:border-white/20"
        >
          <option value="ALL">All access</option>
          <option value="FREE">Free</option>
          <option value="PREMIUM">Premium</option>
        </select>

        {/* Genre */}
        <select
          value={filters.genre ?? "ALL"}
          onChange={(event) => {
            const value = event.target.value;

            onChange({
              genre: value === "ALL" ? undefined : value,
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none focus:border-white/20"
        >
          <option value="ALL">All genres</option>

          {genres.map((genre) => (
            <option key={genre.id} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </select>

        {/* Release year */}
        <Input
          type="number"
          inputMode="numeric"
          min={1888}
          max={new Date().getFullYear() + 5}
          value={year}
          onChange={(event) => handleYearChange(event.target.value)}
          placeholder="Year"
          className="h-10 border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600 focus-visible:border-white/20 focus-visible:ring-white/10"
        />

        {/* Sort */}
        <select
          value={`${filters.sortBy}:${filters.sortOrder}`}
          onChange={(event) => {
            const [sortBy, sortOrder] = event.target.value.split(":");

            onChange({
              sortBy: sortBy as MediaQuery["sortBy"],
              sortOrder: sortOrder as MediaQuery["sortOrder"],
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none focus:border-white/20"
        >
          <option value="createdAt:desc">Recently added</option>

          <option value="releaseYear:desc">Newest release</option>

          <option value="releaseYear:asc">Oldest release</option>

          <option value="avgRating:desc">Top rated</option>

          <option value="reviewCount:desc">Most reviewed</option>

          <option value="title:asc">Title A–Z</option>

          <option value="title:desc">Title Z–A</option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={onReset}
            className="h-10 text-neutral-400 hover:bg-white/5 hover:text-white"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
