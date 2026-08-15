import { apiFetch } from "@/lib/api";

import type { AddWatchlistInput, WatchlistItem } from "./watchlist.types";

export async function addToWatchlist(
  payload: AddWatchlistInput,
): Promise<WatchlistItem> {
  const response = await apiFetch<WatchlistItem>("/watchlist", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function removeFromWatchlist(mediaId: string): Promise<void> {
  await apiFetch<null>(`/watchlist/${encodeURIComponent(mediaId)}`, {
    method: "DELETE",
  });
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
  const response = await apiFetch<WatchlistItem[]>("/watchlist");

  return response.data;
}
