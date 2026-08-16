"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useMediaById, useUpdateMedia } from "@/features/media/media.hooks";

import { useGenres } from "@/features/genres/genres.hooks";

import { MediaForm } from "@/components/admin/media/MediaForm";

import type { MediaFormValues } from "@/features/media/media.schema";

export default function EditMediaPage() {
  const params = useParams<{ id: string }>();

  const router = useRouter();

  const id = params.id;

  const mediaQuery = useMediaById(id);

  const genresQuery = useGenres();

  const mutation = useUpdateMedia();

  if (mediaQuery.isLoading || genresQuery.isLoading) {
    return (
      <div className="h-162.5 animate-pulse rounded-2xl border border-white/10 bg-white/3" />
    );
  }

  if (mediaQuery.isError || !mediaQuery.data) {
    return (
      <section className="flex min-h-125 items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-white">Media not found</h1>

          <p className="mt-2 text-sm text-neutral-500">
            The media you're trying to edit doesn't exist.
          </p>

          <Button
            type="button"
            className="mt-5 bg-white text-black hover:bg-neutral-200"
            nativeButton={false}
            render={<Link href="/admin/media" />}
          >
            Back to media
          </Button>
        </div>
      </section>
    );
  }

  const handleSubmit = (values: MediaFormValues) => {
    mutation.mutate(
      {
        id,
        data: {
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
      },
      {
        onSuccess: () => {
          router.push("/admin/media");
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
          Edit media
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Update {mediaQuery.data.title}.
        </p>
      </header>

      <MediaForm
        media={mediaQuery.data}
        genres={genresQuery.data ?? []}
        isSubmitting={mutation.isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/media")}
      />
    </section>
  );
}
