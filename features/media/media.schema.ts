import { z } from "zod";

export const mediaFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must not exceed 255 characters"),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug may only contain lowercase letters, numbers, and hyphens",
    )
    .max(300)
    .optional()
    .or(z.literal("")),

  type: z.enum(["MOVIE", "SERIES"]),

  access: z.enum(["FREE", "PREMIUM"]),

  description: z
    .string()
    .trim()
    .max(10000, "Description must not exceed 10,000 characters")
    .optional()
    .or(z.literal("")),

  releaseYear: z.coerce
    .number()
    .int("Release year must be a whole number")
    .min(1888, "Release year is invalid")
    .max(new Date().getFullYear() + 5, "Release year is invalid"),

  runtimeMinutes: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce
      .number("Runtime must be a whole number")
      .int("Runtime must be a whole number")
      .positive("Runtime must be greater than 0")
      .optional(),
  ),

  language: z.string().trim().max(100).optional().or(z.literal("")),

  posterUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(500)
    .optional()
    .or(z.literal("")),

  trailerUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(500)
    .optional()
    .or(z.literal("")),

  streamingUrl: z
    .string()
    .trim()
    .url("Must be a valid URL")
    .max(500)
    .optional()
    .or(z.literal("")),

  genreIds: z.array(z.string().uuid()).default([]),

  isFeatured: z.boolean(),

  isPublished: z.boolean(),
});

export const mediaQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),

  search: z.string().trim().default(""),

  type: z.enum(["MOVIE", "SERIES"]).optional(),
  access: z.enum(["FREE", "PREMIUM"]).optional(),

  genre: z.string().trim().toLowerCase().optional(),
  releaseYear: z.coerce
    .number()
    .int()
    .min(1888)
    .max(new Date().getFullYear() + 5)
    .optional(),

  sortBy: z
    .enum(["createdAt", "releaseYear", "avgRating", "reviewCount", "title"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type MediaFormInput = z.input<typeof mediaFormSchema>;

export type MediaFormValues = z.output<typeof mediaFormSchema>;

export type MediaQuery = z.infer<typeof mediaQuerySchema>;
