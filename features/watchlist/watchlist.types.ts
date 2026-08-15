import type { Media } from "@/features/media/media.types";

export interface AddWatchlistInput {
  mediaId: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  mediaId: string;
  createdAt: string;
  media: Media;
}
