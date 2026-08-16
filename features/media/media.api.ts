import { apiFetch } from "@/lib/api";
import type { PaginationMeta } from "@/types/pagination";

import type {
  CreateMediaInput,
  GetMediaParams,
  Media,
  MediaListResponse,
  UpdateMediaInput,
} from "./media.types";

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

export async function getMediaById(id: string): Promise<Media> {
  const response = await apiFetch<Media>(`/media/${encodeURIComponent(id)}`);

  return response.data;
}

export async function createMedia(payload: CreateMediaInput): Promise<Media> {
  const response = await apiFetch<Media>("/media", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateMedia(
  id: string,
  payload: UpdateMediaInput,
): Promise<Media> {
  const response = await apiFetch<Media>(`/media/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteMedia(id: string): Promise<void> {
  await apiFetch<null>(`/media/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
