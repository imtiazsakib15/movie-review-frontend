"use client";

import { useQuery } from "@tanstack/react-query";
import { getMedia } from "./media.api";

export const mediaQueryKeys = {
  all: ["media"] as const,

  featured: () => [...mediaQueryKeys.all, "featured"] as const,

  topRated: () => [...mediaQueryKeys.all, "top-rated"] as const,

  latest: () => [...mediaQueryKeys.all, "latest"] as const,
};

export function useFeaturedMedia() {
  return useQuery({
    queryKey: mediaQueryKeys.featured(),
    queryFn: () =>
      getMedia({
        page: 1,
        limit: 6,
        isFeatured: true,
      }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTopRatedMedia() {
  return useQuery({
    queryKey: mediaQueryKeys.topRated(),
    queryFn: () =>
      getMedia({
        page: 1,
        limit: 8,
        sortBy: "avgRating",
        sortOrder: "desc",
      }),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLatestMedia() {
  return useQuery({
    queryKey: mediaQueryKeys.latest(),
    queryFn: () =>
      getMedia({
        page: 1,
        limit: 8,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    staleTime: 5 * 60 * 1000,
  });
}
