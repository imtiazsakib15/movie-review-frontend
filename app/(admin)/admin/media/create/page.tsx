"use client";

import { useRouter } from "next/navigation";

import { useCreateMedia } from "@/features/media/media.hooks";

import { MediaForm } from "@/components/admin/media/MediaForm";

import { useGenres } from "@/features/genres/genres.hooks";

import type { MediaFormValues } from "@/features/media/media.schema";

export default function CreateMediaPage() {
  const router = useRouter();

  const { data: genres = [], isLoading: isGenresLoading } = useGenres();

  const mutation = useCreateMedia();

  const handleSubmit = (values: MediaFormValues) => {
    mutation.mutate(
      {
        ...values,
        slug: values.slug || undefined,

        description: values.description || undefined,

        runtimeMinutes: !values.runtimeMinutes
          ? undefined
          : values.runtimeMinutes,

        language: values.language || undefined,

        posterUrl: values.posterUrl || undefined,
        trailerUrl: values.trailerUrl || undefined,
        streamingUrl: values.streamingUrl || undefined,
      },
      {
        onSuccess: () => {
          router.push(`/admin/media`);
        },
      },
    );
  };

  return (
    <section>
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
          Create media
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Add a new movie or series to Cinevoo.
        </p>
      </header>

      {isGenresLoading ? (
        <div className="h-150 animate-pulse rounded-2xl border border-white/10 bg-white/3]" />
      ) : (
        <MediaForm
          genres={genres}
          isSubmitting={mutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/media")}
        />
      )}
    </section>
  );
}
