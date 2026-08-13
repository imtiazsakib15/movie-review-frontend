import { z } from "zod";

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

export type MediaQuery = z.infer<typeof mediaQuerySchema>;
