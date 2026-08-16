import { apiFetch } from "@/lib/api";

import type { Genre } from "./genres.types";

export async function getGenres(): Promise<Genre[]> {
  const response = await apiFetch<Genre[]>("/genres");

  return response.data;
}

export async function getGenreById(id: string): Promise<Genre> {
  const response = await apiFetch<Genre>(`/genres/${encodeURIComponent(id)}`);

  return response.data;
}

export async function createGenre(payload: CreateGenreInput): Promise<Genre> {
  const response = await apiFetch<Genre>("/genres", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateGenre(
  id: string,
  payload: UpdateGenreInput,
): Promise<Genre> {
  const response = await apiFetch<Genre>(`/genres/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteGenre(id: string): Promise<void> {
  await apiFetch<null>(`/genres/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
