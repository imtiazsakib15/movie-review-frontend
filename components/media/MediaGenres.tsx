import Link from "next/link";

import type { MediaGenre } from "@/features/media/media.types";

interface MediaGenresProps {
  genres?: MediaGenre[];
}

export function MediaGenres({ genres }: MediaGenresProps) {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/media?genre=${genre.slug}`}
          className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/8 hover:text-white"
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}
