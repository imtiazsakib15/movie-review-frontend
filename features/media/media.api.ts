import { apiFetch } from "@/lib/api";
import type { MediaListResponse } from "./media.types";

interface GetMediaParams {
  page?: number;
  limit?: number;
  type?: "MOVIE" | "SERIES";
  sortBy?: "createdAt" | "avgRating" | "reviewCount";
  sortOrder?: "asc" | "desc";
  isFeatured?: boolean;
}

export async function getMedia(
  params: GetMediaParams = {},
): Promise<MediaListResponse> {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  if (params.isFeatured !== undefined) {
    searchParams.set("isFeatured", String(params.isFeatured));
  }

  const query = searchParams.toString();

  const response = await apiFetch<MediaListResponse>(
    `/media${query ? `?${query}` : ""}`,
  );

  return response.data;
}
