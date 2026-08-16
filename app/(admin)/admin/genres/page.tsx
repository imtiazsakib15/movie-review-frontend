"use client";

import Link from "next/link";
import { Plus, Tags } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDeleteGenre, useGenres } from "@/features/genres/genres.hooks";

import { GenreTable } from "@/components/admin/genres/GenreTable";
import { GenreEmptyState } from "@/components/admin/genres/GenreEmptyState";
import { GenreSkeleton } from "@/components/admin/genres/GenreSkeleton";
import { useState } from "react";
import { DeleteGenreDialog } from "@/components/admin/genres/DeleteGenreDialog";

export default function AdminGenresPage() {
  const { data: genres = [], isLoading, isError, refetch } = useGenres();
  const deleteMutation = useDeleteGenre();

  const [deleteGenreId, setDeleteGenreId] = useState<string | null>(null);
  const [deleteGenreName, setDeleteGenreName] = useState<string | null>(null);

  const openDeleteDialog = (genreId: string, genreName: string) => {
    setDeleteGenreId(genreId);
    setDeleteGenreName(genreName);
  };

  const closeDeleteDialog = () => {
    if (deleteMutation.isPending) {
      return;
    }

    setDeleteGenreId(null);
    setDeleteGenreName(null);
  };

  const handleDelete = () => {
    if (!deleteGenreId) {
      return;
    }

    deleteMutation.mutate(deleteGenreId, {
      onSuccess: () => {
        closeDeleteDialog();
      },
    });
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
              <Tags className="size-5 text-neutral-300" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Genres
              </h1>
            </div>
          </div>

          <p className="mt-3 text-sm text-neutral-500">
            Manage the genres used to organize Cinevoo's movies and series.
          </p>
        </div>

        <Button
          type="button"
          nativeButton={false}
          render={<Link href="/admin/genres/create" />}
          className="bg-white text-black hover:bg-neutral-200"
        >
          <Plus className="size-4" />
          Add genre
        </Button>
      </header>

      {isLoading ? (
        <GenreSkeleton />
      ) : isError ? (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
          <h2 className="font-semibold text-white">Couldn't load genres</h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading the genres.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8"
          >
            Try again
          </button>
        </div>
      ) : genres.length === 0 ? (
        <GenreEmptyState />
      ) : (
        <GenreTable genres={genres} onDelete={openDeleteDialog} />
      )}

      <DeleteGenreDialog
        open={Boolean(deleteGenreId)}
        genreName={deleteGenreName ?? undefined}
        isDeleting={deleteMutation.isPending}
        onOpenChange={(open) => {
          if (!open) {
            closeDeleteDialog();
          }
        }}
        onConfirm={handleDelete}
      />

      {deleteMutation.isPending && (
        <p className="text-right text-xs text-neutral-600">
          Updating genres...
        </p>
      )}
    </section>
  );
}
