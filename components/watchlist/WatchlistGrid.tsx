import type { WatchlistItem } from "@/features/watchlist/watchlist.types";

import { WatchlistCard } from "./WatchlistCard";

interface WatchlistGridProps {
  items: WatchlistItem[];
}

export function WatchlistGrid({ items }: WatchlistGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <WatchlistCard key={item.mediaId} item={item} />
      ))}
    </div>
  );
}
