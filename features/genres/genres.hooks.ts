"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createGenre,
  deleteGenre,
  getGenreById,
  getGenres,
  updateGenre,
} from "./genres.api";

import type { CreateGenreInput, UpdateGenreInput } from "./genres.schema";

export const genreQueryKeys = {
  all: ["genres"] as const,

  list: () => [...genreQueryKeys.all, "list"] as const,

  detail: (id: string) => [...genreQueryKeys.all, "detail", id] as const,
};

export function useGenres() {
  return useQuery({
    queryKey: genreQueryKeys.list(),
    queryFn: getGenres,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGenreById(id: string) {
  return useQuery({
    queryKey: genreQueryKeys.detail(id),
    queryFn: () => getGenreById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateGenre() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGenreInput) => createGenre(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: genreQueryKeys.all,
      });

      toast.success("Genre created successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create genre.",
      );
    },
  });
}

export function useUpdateGenre() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGenreInput }) =>
      updateGenre(id, data),

    onSuccess: (genre) => {
      queryClient.invalidateQueries({
        queryKey: genreQueryKeys.all,
      });

      queryClient.setQueryData(genreQueryKeys.detail(genre.id), genre);

      toast.success("Genre updated successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update genre.",
      );
    },
  });
}

export function useDeleteGenre() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGenre,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: genreQueryKeys.all,
      });

      toast.success("Genre deleted successfully.");
    },

    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete genre.",
      );
    },
  });
}
