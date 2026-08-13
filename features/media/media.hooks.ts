"use client";

import { useQuery } from "@tanstack/react-query";
import { getMedia } from "./media.api";
import type { GetMediaParams } from "./media.types";

export const mediaQueryKeys = {
  all: ["media"] as const,

  list: (params: GetMediaParams) =>
    [...mediaQueryKeys.all, "list", params] as const,

  featured: () => [...mediaQueryKeys.all, "featured"] as const,

  topRated: () => [...mediaQueryKeys.all, "top-rated"] as const,

  latest: () => [...mediaQueryKeys.all, "latest"] as const,
};

export function useMedia(params: GetMediaParams) {
  return useQuery({
    queryKey: mediaQueryKeys.list(params),
    queryFn: () => getMedia(params),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

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
