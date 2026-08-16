import type { MediaSummary } from "@/features/media/media.types";
import type { Review, ReviewWithMedia } from "@/features/reviews/reviews.types";

export interface AdminDashboardStats {
  users: {
    total: number;
    admins: number;
    regular: number;
  };

  media: {
    total: number;
    published: number;
    unpublished: number;
    movies: number;
    series: number;
  };

  genres: {
    total: number;
  };

  reviews: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };

  watchlist: {
    totalEntries: number;
  };

  completedMedia: {
    totalEntries: number;
  };
}

export interface RecentUserSummary {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface RecentActivity {
  pendingReviews: ReviewWithMedia[];
  recentUsers: RecentUserSummary[];
  recentMedia: MediaSummary[];
}
