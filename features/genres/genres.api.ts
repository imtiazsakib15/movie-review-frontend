import { apiFetch } from "@/lib/api";
import type { Genre } from "./genres.types";

export async function getGenres(): Promise<Genre[]> {
  const response = await apiFetch<Genre[]>("/genres");

  return response.data;
}
