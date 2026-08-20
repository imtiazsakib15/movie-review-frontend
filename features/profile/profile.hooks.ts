"use client";

import { useQuery } from "@tanstack/react-query";

import { getProfileOverview } from "./profile.api";

export const profileQueryKeys = {
  all: ["profile"] as const,

  overview: () => [...profileQueryKeys.all, "overview"] as const,
};

export function useProfileOverview() {
  return useQuery({
    queryKey: profileQueryKeys.overview(),

    queryFn: getProfileOverview,

    staleTime: 2 * 60 * 1000,
  });
}
