import type { User } from "@/features/auth/auth.types";
import type { MyReview } from "@/features/reviews/reviews.types";
import type { Media } from "@/features/media/media.types";

export interface ProfileStats {
  totalReviews: number;
  pendingReviews: number;
  approvedReviews: number;
  rejectedReviews: number;
  watchlistCount: number;
  completedCount: number;
}

export interface ProfileMediaEntry {
  mediaId: string;
  createdAt: string;
  media: Pick<
    Media,
    "id" | "title" | "slug" | "type" | "posterUrl" | "releaseYear" | "avgRating"
  >;
}

export interface ProfileOverview {
  user: User;
  stats: ProfileStats;
  recentReviews: MyReview[];
  recentWatchlist: ProfileMediaEntry[];
  recentCompleted: ProfileMediaEntry[];
}
