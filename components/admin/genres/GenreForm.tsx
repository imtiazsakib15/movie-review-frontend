"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  genreFormSchema,
  type GenreFormInput,
  type GenreFormValues,
} from "@/features/genres/genres.schema";

import type { Genre } from "@/features/genres/genres.types";

interface GenreFormProps {
  genre?: Genre | null;
  isSubmitting: boolean;
  onSubmit: (values: GenreFormValues) => void;
  onCancel?: () => void;
}

export function GenreForm({
  genre,
  isSubmitting,
  onSubmit,
  onCancel,
}: GenreFormProps) {
  const form = useForm<GenreFormInput, unknown, GenreFormValues>({
    resolver: zodResolver(genreFormSchema),

    defaultValues: {
      name: genre?.name ?? "",
      slug: genre?.slug ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: genre?.name ?? "",
      slug: genre?.slug ?? "",
    });
  }, [genre, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="name">Genre name</Label>

        <Input
          id="name"
          {...form.register("name")}
          placeholder="Science Fiction"
          className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
        />

        {form.formState.errors.name && (
          <p className="text-sm text-red-400">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>

        <Input
          id="slug"
          {...form.register("slug")}
          placeholder="science-fiction"
          className="border-white/10 bg-neutral-950 text-white placeholder:text-neutral-600"
        />

        <p className="text-xs leading-5 text-neutral-600">
          Leave empty to generate a slug automatically from the genre name.
        </p>

        {form.formState.errors.slug && (
          <p className="text-sm text-red-400">
            {form.formState.errors.slug.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
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
            ? genre
              ? "Updating..."
              : "Creating..."
            : genre
              ? "Update genre"
              : "Create genre"}
        </Button>
      </div>
    </form>
  );
}
