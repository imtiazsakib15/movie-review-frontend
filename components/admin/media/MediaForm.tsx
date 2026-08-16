"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  mediaFormSchema,
  type MediaFormInput,
  type MediaFormValues,
} from "@/features/media/media.schema";

import type { Media } from "@/features/media/media.types";
import type { Genre } from "@/features/genres/genres.types";

interface MediaFormProps {
  media?: Media | null;
  genres: Genre[];
  isSubmitting: boolean;
  onSubmit: (values: MediaFormValues) => void;
  onCancel?: () => void;
}

export function MediaForm({
  media,
  genres,
  isSubmitting,
  onSubmit,
  onCancel,
}: MediaFormProps) {
  const form = useForm<MediaFormInput, unknown, MediaFormValues>({
    resolver: zodResolver(mediaFormSchema),

    defaultValues: {
      title: media?.title ?? "",
      slug: media?.slug ?? "",
      type: media?.type ?? "MOVIE",
      access: media?.access ?? "FREE",

      description: media?.description ?? "",

      releaseYear: media?.releaseYear ?? new Date().getFullYear(),

      runtimeMinutes: media?.runtimeMinutes ?? "",

      language: media?.language ?? "",

      posterUrl: media?.posterUrl ?? "",

      trailerUrl: media?.trailerUrl ?? "",

      streamingUrl: media?.streamingUrl ?? "",

      genreIds: media?.genres?.map((genre) => genre.id) ?? ([] as string[]),

      isFeatured: media?.isFeatured ?? false,

      isPublished: media?.isPublished ?? true,
    },
  });

  useEffect(() => {
    form.reset({
      title: media?.title ?? "",
      slug: media?.slug ?? "",
      type: media?.type ?? "MOVIE",
      access: media?.access ?? "FREE",

      description: media?.description ?? "",

      releaseYear: media?.releaseYear ?? new Date().getFullYear(),

      runtimeMinutes: media?.runtimeMinutes ?? "",

      language: media?.language ?? "",

      posterUrl: media?.posterUrl ?? "",

      trailerUrl: media?.trailerUrl ?? "",

      streamingUrl: media?.streamingUrl ?? "",

      genreIds: media?.genres?.map((genre) => genre.id) ?? [],

      isFeatured: media?.isFeatured ?? false,

      isPublished: media?.isPublished ?? true,
    });
  }, [media, form]);

  const selectedGenreIds = form.watch("genreIds") ?? [];

  const toggleGenre = (genreId: string) => {
    const current = form.getValues("genreIds") ?? [];

    form.setValue(
      "genreIds",
      current.includes(genreId)
        ? current.filter((id) => id !== genreId)
        : [...current, genreId],
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
      noValidate
    >
      {/* Basic information */}
      <section className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Basic information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Core information about the movie or series.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              {...form.register("title")}
              placeholder="Inception"
              className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
            />

            {form.formState.errors.title && (
              <p className="text-sm text-red-400">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>

            <Input
              id="slug"
              {...form.register("slug")}
              placeholder="inception"
              className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
            />

            <p className="text-xs text-neutral-600">
              Leave empty to generate from the title.
            </p>

            {form.formState.errors.slug && (
              <p className="text-sm text-red-400">
                {form.formState.errors.slug.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>

            <select
              id="type"
              {...form.register("type")}
              className="h-10 w-full rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-white outline-none focus:border-white/20"
            >
              <option value="MOVIE">Movie</option>

              <option value="SERIES">Series</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="access">Access</Label>

            <select
              id="access"
              {...form.register("access")}
              className="h-10 w-full rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-white outline-none focus:border-white/20"
            >
              <option value="FREE">Free</option>

              <option value="PREMIUM">Premium</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseYear">Release year</Label>

            <Input
              id="releaseYear"
              type="number"
              {...form.register("releaseYear", {
                valueAsNumber: true,
              })}
              className="border-white/10 bg-neutral-950 text-white"
            />

            {form.formState.errors.releaseYear && (
              <p className="text-sm text-red-400">
                {form.formState.errors.releaseYear.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="runtimeMinutes">Runtime (minutes)</Label>

            <Input
              id="runtimeMinutes"
              type="number"
              min={1}
              {...form.register("runtimeMinutes", {
                valueAsNumber: true,
              })}
              placeholder="148"
              className="border-white/10 bg-neutral-950 text-white"
            />

            {form.formState.errors.runtimeMinutes && (
              <p className="text-sm text-red-400">
                {form.formState.errors.runtimeMinutes.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>

            <Input
              id="language"
              {...form.register("language")}
              placeholder="English"
              className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>

            <textarea
              id="description"
              rows={7}
              {...form.register("description")}
              placeholder="Write a description..."
              className="w-full resize-y rounded-md border border-white/10 bg-neutral-950 px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white/20 focus:ring-2 focus:ring-white/10"
            />

            {form.formState.errors.description && (
              <p className="text-sm text-red-400">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Media links</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Provide valid external URLs.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="posterUrl">Poster URL</Label>

            <Input
              id="posterUrl"
              {...form.register("posterUrl")}
              placeholder="https://..."
              className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
            />

            {form.formState.errors.posterUrl && (
              <p className="text-sm text-red-400">
                {form.formState.errors.posterUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="trailerUrl">Trailer URL</Label>

            <Input
              id="trailerUrl"
              {...form.register("trailerUrl")}
              placeholder="https://www.youtube.com/embed/..."
              className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
            />

            {form.formState.errors.trailerUrl && (
              <p className="text-sm text-red-400">
                {form.formState.errors.trailerUrl.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="streamingUrl">Streaming / Watch URL</Label>

            <Input
              id="streamingUrl"
              {...form.register("streamingUrl")}
              placeholder="https://..."
              className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
            />

            {form.formState.errors.streamingUrl && (
              <p className="text-sm text-red-400">
                {form.formState.errors.streamingUrl.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Genres</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Select one or more genres.
          </p>
        </div>

        {genres.length === 0 ? (
          <p className="text-sm text-neutral-500">
            No genres are available yet.
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {genres.map((genre) => {
              const selected = selectedGenreIds.includes(genre.id);

              return (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => toggleGenre(genre.id)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-white/2 text-neutral-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{genre.name}</span>

                    {selected && (
                      <span className="text-xs text-white">Selected</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Publishing */}
      <section className="space-y-5 rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Publishing</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Control how this title appears publicly.
          </p>
        </div>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...form.register("isPublished")}
            className="mt-0.5 size-4 accent-white"
          />

          <span>
            <span className="block text-sm font-medium text-white">
              Published
            </span>

            <span className="mt-1 block text-xs leading-5 text-neutral-600">
              Unpublished media is visible to admins but hidden from the public.
            </span>
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...form.register("isFeatured")}
            className="mt-0.5 size-4 accent-white"
          />

          <span>
            <span className="block text-sm font-medium text-white">
              Featured
            </span>

            <span className="mt-1 block text-xs leading-5 text-neutral-600">
              Show this title in Cinevoo's featured section.
            </span>
          </span>
        </label>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-white/10 bg-white/3 text-neutral-300 hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-neutral-200"
        >
          {isSubmitting
            ? media
              ? "Updating..."
              : "Creating..."
            : media
              ? "Update media"
              : "Create media"}
        </Button>
      </div>
    </form>
  );
}
