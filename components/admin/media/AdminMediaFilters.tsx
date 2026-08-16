"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type {
  GetMediaParams,
  MediaAccess,
  MediaType,
} from "@/features/media/media.types";

interface AdminMediaFiltersProps {
  filters: GetMediaParams;
  onChange: (updates: Partial<GetMediaParams>) => void;
  onReset: () => void;
}

export function AdminMediaFilters({
  filters,
  onChange,
  onReset,
}: AdminMediaFiltersProps) {
  const [search, setSearch] = useState(filters.search ?? "");

  useEffect(() => {
    setSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (search !== (filters.search ?? "")) {
        onChange({
          search,
          page: 1,
        });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [search, filters.search, onChange]);

  const hasFilters =
    Boolean(filters.search) ||
    Boolean(filters.type) ||
    Boolean(filters.access) ||
    filters.isFeatured !== undefined ||
    filters.sortBy !== "createdAt" ||
    filters.sortOrder !== "desc";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(240px,1fr)_auto_auto_auto_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search media..."
            className="h-10 border-white/10 bg-neutral-950 pl-9 text-white placeholder:text-neutral-600"
          />
        </div>

        <select
          value={filters.type ?? "ALL"}
          onChange={(event) =>
            onChange({
              type:
                event.target.value === "ALL"
                  ? undefined
                  : (event.target.value as MediaType),
              page: 1,
            })
          }
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none"
        >
          <option value="ALL">All types</option>
          <option value="MOVIE">Movies</option>
          <option value="SERIES">Series</option>
        </select>

        <select
          value={filters.access ?? "ALL"}
          onChange={(event) =>
            onChange({
              access:
                event.target.value === "ALL"
                  ? undefined
                  : (event.target.value as MediaAccess),
              page: 1,
            })
          }
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none"
        >
          <option value="ALL">All access</option>
          <option value="FREE">Free</option>
          <option value="PREMIUM">Premium</option>
        </select>

        <select
          value={
            filters.isFeatured === undefined
              ? "ALL"
              : String(filters.isFeatured)
          }
          onChange={(event) => {
            const value = event.target.value;

            onChange({
              isFeatured: value === "ALL" ? undefined : value === "true",
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none"
        >
          <option value="ALL">Featured</option>
          <option value="true">Featured only</option>
          <option value="false">Not featured</option>
        </select>

        <select
          value={`${filters.sortBy ?? "createdAt"}:${filters.sortOrder ?? "desc"}`}
          onChange={(event) => {
            const [sortBy, sortOrder] = event.target.value.split(":");

            onChange({
              sortBy: sortBy as GetMediaParams["sortBy"],
              sortOrder: sortOrder as GetMediaParams["sortOrder"],
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none"
        >
          <option value="createdAt:desc">Recently added</option>

          <option value="releaseYear:desc">Newest release</option>

          <option value="avgRating:desc">Top rated</option>

          <option value="reviewCount:desc">Most reviewed</option>

          <option value="title:asc">Title A–Z</option>
        </select>

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
