import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10"),

  content: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(5000, "Review must not exceed 5,000 characters"),

  hasSpoiler: z.boolean().default(false),
});

export const updateReviewSchema = createReviewSchema.partial();

export type CreateReviewFormInput = z.input<typeof createReviewSchema>;

export type CreateReviewFormValues = z.output<typeof createReviewSchema>;

export type UpdateReviewFormValues = z.infer<typeof updateReviewSchema>;
