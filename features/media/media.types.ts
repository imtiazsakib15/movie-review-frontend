export type MediaType = "MOVIE" | "SERIES";
export type MediaAccess = "FREE" | "PREMIUM";

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
  releaseYear: number;
  posterUrl: string | null;
  trailerUrl: string | null;
  streamingUrl: string | null;
  runtimeMinutes: number | null;
  isPublished: boolean;
  isFeatured: boolean;
  avgRating: number;
  ratingCount: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;

  genres?: MediaGenre[];
}

export interface MediaListResponse {
  items: Media[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
