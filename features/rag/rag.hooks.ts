import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { askCinevoo, getRagStats, ingestAllMedia } from "./rag.api";

export const ragQueryKeys = {
  all: ["rag"] as const,
  stats: () => [...ragQueryKeys.all, "stats"] as const,
};

export function useAskCinevoo() {
  return useMutation({
    mutationFn: askCinevoo,
  });
}

export function useRagStats() {
  return useQuery({
    queryKey: ragQueryKeys.stats(),
    queryFn: getRagStats,
  });
}

export function useIngestAllMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ingestAllMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ragQueryKeys.stats(),
      });
    },
  });
}
