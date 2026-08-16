"use client";

import { useRouter } from "next/navigation";
import { useCreateGenre } from "@/features/genres/genres.hooks";
import { GenreForm } from "@/components/admin/genres/GenreForm";
import type { GenreFormValues } from "@/features/genres/genres.schema";

export default function CreateGenrePage() {
  const router = useRouter();

  const mutation = useCreateGenre();

  const handleSubmit = (values: GenreFormValues) => {
    mutation.mutate(
      {
        name: values.name,
        slug: values.slug || undefined,
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
          Create genre
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Add a new genre to Cinevoo.
        </p>
      </header>

      <div className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <GenreForm
          isSubmitting={mutation.isPending}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/genres")}
        />
      </div>
    </section>
  );
}
