export interface AddWatchlistInput {
  mediaId: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  mediaId: string;
  createdAt: string;
}
