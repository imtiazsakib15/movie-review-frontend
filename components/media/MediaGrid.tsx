import type { Media } from "@/features/media/media.types";
import { MediaCard } from "./MediaCard";

interface MediaGridProps {
  media: Media[];
}

export function MediaGrid({ media }: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {media?.map((item) => (
        <MediaCard key={item.id} media={item} />
      ))}
    </div>
  );
}
