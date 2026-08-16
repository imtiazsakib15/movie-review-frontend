"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  createReviewSchema,
  type CreateReviewFormInput,
  type CreateReviewFormValues,
} from "@/features/reviews/reviews.schema";

import type { Review } from "@/features/reviews/reviews.types";

interface ReviewFormProps {
  existingReview?: Review | null;
  isSubmitting: boolean;
  onSubmit: (data: CreateReviewFormValues) => void;
  onCancel?: () => void;
}

export function ReviewForm({
  existingReview,
  isSubmitting,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const form = useForm<CreateReviewFormInput, unknown, CreateReviewFormValues>({
    resolver: zodResolver(createReviewSchema),

    defaultValues: {
      rating: existingReview?.rating ?? 10,
      content: existingReview?.content ?? "",
      hasSpoiler: existingReview?.hasSpoiler ?? false,
    },
  });

  useEffect(() => {
    form.reset({
      rating: existingReview?.rating ?? 10,
      content: existingReview?.content ?? "",
      hasSpoiler: existingReview?.hasSpoiler ?? false,
    });
  }, [existingReview, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* Rating */}
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>

        <div className="flex items-center gap-3">
          <Input
            id="rating"
            type="number"
            min={1}
            max={10}
            step={1}
            {...form.register("rating", {
              valueAsNumber: true,
            })}
            className="h-11 w-28 border-white/10 bg-neutral-950 text-white"
          />

          <span className="text-sm text-neutral-500">out of 10</span>
        </div>

        {form.formState.errors.rating && (
          <p className="text-sm text-red-400">
            {form.formState.errors.rating.message}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Your review</Label>

        <textarea
          id="content"
          rows={7}
          placeholder="What did you think about this movie or series?"
          {...form.register("content")}
          className="w-full resize-y rounded-md border border-white/10 bg-neutral-950 px-3 py-3 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-white/20 focus:ring-2 focus:ring-white/10"
        />

        {form.formState.errors.content && (
          <p className="text-sm text-red-400">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      {/* Spoiler */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          {...form.register("hasSpoiler")}
          className="size-4 rounded border-white/20 bg-neutral-950 accent-white"
        />

        <span className="text-sm text-neutral-400">
          This review contains spoilers
        </span>
      </label>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-neutral-200"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {existingReview ? "Updating..." : "Submitting..."}
            </>
          ) : existingReview ? (
            "Update review"
          ) : (
            "Submit review"
          )}
        </Button>

        {existingReview && onCancel && (
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
      </div>
    </form>
  );
}
