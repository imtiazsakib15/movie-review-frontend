"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useGenreById, useUpdateGenre } from "@/features/genres/genres.hooks";

import { GenreForm } from "@/components/admin/genres/GenreForm";

import type { GenreFormValues } from "@/features/genres/genres.schema";

export default function EditGenrePage() {
  const params = useParams<{ id: string }>();

  const router = useRouter();

  const id = params.id;

  const genreQuery = useGenreById(id);

  const mutation = useUpdateGenre();

  if (genreQuery.isLoading) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="h-72 animate-pulse rounded-2xl border border-white/10 bg-white/3" />
      </div>
    );
  }

  if (genreQuery.isError || !genreQuery.data) {
    return (
      <section className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-white">Genre not found</h1>

          <p className="mt-2 text-sm text-neutral-500">
            The genre you're trying to edit doesn't exist.
          </p>

          <Button
            type="button"
            nativeButton={false}
            render={<Link href="/admin/genres" />}
            className="mt-5 bg-white text-black hover:bg-neutral-200"
          >
            Back to genres
          </Button>
        </div>
      </section>
    );
  }

  const handleSubmit = (values: GenreFormValues) => {
    mutation.mutate(
      {
        id,
        data: {
          name: values.name,
          slug: values.slug || undefined,
        },
      },
      {
        onSuccess: () => {
          router.push("/admin/genres");
        },
      },
    );
  };

  return (
    <section className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
          Edit genre
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Update {genreQuery.data.name}.
        </p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <GenreForm
          genre={genreQuery.data}
          isSubmitting={mutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/genres")}
        />
      </div>
    </section>
  );
}
