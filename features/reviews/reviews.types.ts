export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ReviewAuthor {
  id: string;
  name: string | null;
}

export interface Review {
  id: string;
  userId: string;
  mediaId: string;

  rating: number;
  content: string;
  hasSpoiler: boolean;

  status: ReviewStatus;
  publishedAt: string | null;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  user: ReviewAuthor;
}

export interface CreateReviewInput {
  mediaId: string;
  rating: number;
  content: string;
  hasSpoiler: boolean;
}

export interface UpdateReviewInput {
  rating?: number;
  content?: string;
  hasSpoiler?: boolean;
}
