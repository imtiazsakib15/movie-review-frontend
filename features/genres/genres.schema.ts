import { z } from "zod";

export const genreFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug may only contain lowercase letters, numbers, and hyphens",
    )
    .max(120)
    .optional()
    .or(z.literal("")),
});

export type GenreFormInput = z.input<typeof genreFormSchema>;

export type GenreFormValues = z.output<typeof genreFormSchema>;
