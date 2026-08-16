import type { PaginationMeta } from "@/types/pagination";

export type MediaType = "MOVIE" | "SERIES";

export type MediaAccess = "FREE" | "PREMIUM";

export type MediaSortBy =
  | "createdAt"
  | "releaseYear"
  | "avgRating"
  | "reviewCount"
  | "title";
export type SortOrder = "asc" | "desc";

export interface MediaGenre {
  id: string;
  name: string;
  slug: string;
}

export interface Media {
  id: string;
  title: string;
  slug: string;

  type: MediaType;
  access: MediaAccess;

  description: string | null;
  releaseYear: number;
  runtimeMinutes: number | null;
  language: string | null;

  posterUrl: string | null;
  trailerUrl: string | null;
  streamingUrl: string | null;

  isPublished: boolean;
  isFeatured: boolean;

  avgRating: number;
  ratingCount: number;
  reviewCount: number;

  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  genres: MediaGenre[];
}

export interface GetMediaParams {
  page?: number;
  limit?: number;

  search?: string;

  type?: MediaType;
  access?: MediaAccess;
  genre?: string;
  releaseYear?: number;

  isFeatured?: boolean;

  sortBy?: MediaSortBy;
  sortOrder?: SortOrder;
}

export interface MediaListResponse {
  items: Media[];
  meta: PaginationMeta;
}

export interface MediaSummary {
  id: string;
  title: string;
  slug: string;
  type: MediaType;
  releaseYear: number;
  posterUrl: string | null;
}

export interface CreateMediaInput {
  title: string;
  slug?: string;
  type: MediaType;
  access: MediaAccess;

  description?: string;
  releaseYear: number;
  runtimeMinutes?: number;
  language?: string;

  posterUrl?: string;
  trailerUrl?: string;
  streamingUrl?: string;

  isFeatured: boolean;
  isPublished: boolean;

  genreIds: string[];
}

export type UpdateMediaInput = Partial<CreateMediaInput>;
