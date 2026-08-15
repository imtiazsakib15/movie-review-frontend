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
}
