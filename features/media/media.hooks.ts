"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createMedia,
  deleteMedia,
  getMedia,
  getMediaById,
  getMediaBySlug,
  updateMedia,
} from "./media.api";

import type { GetMediaParams } from "./media.types";
import { toast } from "sonner";

export const mediaQueryKeys = {
  all: ["media"] as const,

  list: (params: GetMediaParams) =>
    [...mediaQueryKeys.all, "list", params] as const,

  detail: (slug: string) => [...mediaQueryKeys.all, "detail", slug] as const,

  adminDetail: (id: string) =>
    [...mediaQueryKeys.all, "admin-detail", id] as const,

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

export function useMediaBySlug(slug: string) {
  return useQuery({
    queryKey: mediaQueryKeys.detail(slug),
    queryFn: () => getMediaBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
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

export function useMediaById(id: string) {
  return useQuery({
    queryKey: mediaQueryKeys.adminDetail(id),
    queryFn: () => getMediaById(id),
    enabled: Boolean(id),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedia,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mediaQueryKeys.all,
      });

      toast.success("Media created successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create media.",
      );
    },
  });
}

export function useUpdateMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateMedia>[1];
    }) => updateMedia(id, data),

    onSuccess: (media) => {
      queryClient.invalidateQueries({
        queryKey: mediaQueryKeys.all,
      });

      queryClient.setQueryData(mediaQueryKeys.adminDetail(media.id), media);

      toast.success("Media updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update media.",
      );
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedia,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mediaQueryKeys.all,
      });

      toast.success("Media deleted successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete media.",
      );
    },
  });
}
