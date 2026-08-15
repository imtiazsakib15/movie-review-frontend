import { apiFetch } from "@/lib/api";
import type { PaginationMeta } from "@/types/pagination";

import type { GetMediaParams, Media, MediaListResponse } from "./media.types";

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

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.access) {
    searchParams.set("access", params.access);
  }

  if (params.genre) {
    searchParams.set("genre", params.genre);
  }

  if (params.releaseYear !== undefined) {
    searchParams.set("releaseYear", String(params.releaseYear));
  }

  if (params.isFeatured !== undefined) {
    searchParams.set("isFeatured", String(params.isFeatured));
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();

  const response = await apiFetch<Media[], PaginationMeta>(
    `/media${query ? `?${query}` : ""}`,
  );

  return {
    items: response.data,
    meta: response.meta as PaginationMeta,
  };
}

export async function getMediaBySlug(slug: string): Promise<Media> {
  const response = await apiFetch<Media>(
    `/media/slug/${encodeURIComponent(slug)}`,
  );

  return response.data;
}
