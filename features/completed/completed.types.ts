import type { Media } from "@/features/media/media.types";

export interface AddCompletedInput {
  mediaId: string;
}

export interface CompletedItem {
  id: string;
  userId: string;
  mediaId: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  media: Media;
}
