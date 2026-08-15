import type { CompletedItem } from "@/features/completed/completed.types";

import { CompletedCard } from "./CompletedCard";

interface CompletedGridProps {
  items: CompletedItem[];
}

export function CompletedGrid({ items }: CompletedGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <CompletedCard key={item.mediaId} item={item} />
      ))}
    </div>
  );
}
