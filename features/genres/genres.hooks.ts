"use client";

import { useQuery } from "@tanstack/react-query";
import { getGenres } from "./genres.api";

export const genreQueryKey = ["genres"] as const;

export function useGenres() {
  return useQuery({
    queryKey: genreQueryKey,
    queryFn: getGenres,
    staleTime: 30 * 60 * 1000,
  });
}
