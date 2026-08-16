"use client";

import Link from "next/link";
import { Plus, Search, Tags, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDeleteGenre, useGenres } from "@/features/genres/genres.hooks";

import { GenreTable } from "@/components/admin/genres/GenreTable";
import { GenreEmptyState } from "@/components/admin/genres/GenreEmptyState";
import { GenreSkeleton } from "@/components/admin/genres/GenreSkeleton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export default function AdminGenresPage() {
  const { data: genres = [], isLoading, isError, refetch } = useGenres();

  const deleteMutation = useDeleteGenre();

  const [search, setSearch] = useState("");

  const [deleteGenre, setDeleteGenre] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filteredGenres = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return genres;
    }

    return genres.filter(
      (genre) =>
        genre.name.toLowerCase().includes(normalizedSearch) ||
        genre.slug.toLowerCase().includes(normalizedSearch),
    );
  }, [genres, search]);

  const handleDelete = () => {
    if (!deleteGenre) {
      return;
    }

    deleteMutation.mutate(deleteGenre.id, {
      onSuccess: () => {
        setDeleteGenre(null);
      },
    });
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/4 shadow-sm">
              <Tags className="size-5 text-neutral-200" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Genres
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
            Organize movies and series with reusable genres that power
            Cinevoo&apos;s discovery experience.
          </p>
        </div>

        <Button
          type="button"
          nativeButton={false}
          render={<Link href="/admin/genres/create" />}
          className="h-10 shrink-0 bg-white px-4 font-semibold text-black shadow-sm hover:bg-neutral-200"
        >
          <Plus className="size-4" />
          Add genre
        </Button>
      </header>

      {/* Content */}
      {isLoading ? (
        <GenreSkeleton />
      ) : isError ? (
        <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/5">
            <Tags className="size-5 text-red-400" />
          </div>

          <h2 className="mt-5 font-semibold text-white">
            Couldn&apos;t load genres
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            Something went wrong while loading the genre library.
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            className="mt-5 border-white/10 bg-white/3 text-neutral-300 hover:bg-white/8 hover:text-white"
          >
            Try again
          </Button>
        </div>
      ) : genres.length === 0 ? (
        <GenreEmptyState />
      ) : (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="rounded-2xl border border-white/10 bg-white/2.5 p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-600" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search genres..."
                  className="h-10 border-white/10 bg-neutral-950/70 pl-9 pr-9 text-sm text-white placeholder:text-neutral-600 focus-visible:border-white/20 focus-visible:ring-white/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-white/5 hover:text-neutral-300"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="text-sm text-neutral-500">
                  <span className="font-medium text-white">
                    {filteredGenres.length}
                  </span>{" "}
                  {filteredGenres.length === 1 ? "genre" : "genres"}
                </div>

                {search && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-xs text-neutral-600 transition-colors hover:text-neutral-300"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          {filteredGenres.length > 0 ? (
            <GenreTable
              genres={filteredGenres}
              onDelete={(id, name) => {
                setDeleteGenre({
                  id,
                  name,
                });
              }}
            />
          ) : (
            <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/5">
                <Search className="size-5 text-neutral-500" />
              </div>

              <h2 className="mt-4 font-semibold text-white">
                No matching genres
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                No genre matches &quot;{search}&quot;.
              </p>

              <Button
                type="button"
                variant="ghost"
                onClick={clearSearch}
                className="mt-4 text-neutral-400 hover:bg-white/5 hover:text-white"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete dialog */}
      <ConfirmDialog
        open={Boolean(deleteGenre)}
        title="Delete genre"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium text-neutral-200">
              &quot;{deleteGenre?.name}&quot;
            </span>
            ?
            <span className="mt-2 block">
              A genre that is still linked to media cannot be deleted.
            </span>
          </>
        }
        confirmLabel="Delete genre"
        isLoading={deleteMutation.isPending}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setDeleteGenre(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </section>
  );
}
