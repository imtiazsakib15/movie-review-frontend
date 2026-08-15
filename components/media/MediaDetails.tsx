import { MediaHero } from "./MediaHero";
import { MediaTrailer } from "./MediaTrailer";

import type { Media } from "@/features/media/media.types";

interface MediaDetailsProps {
  media: Media;
}

export function MediaDetails({ media }: MediaDetailsProps) {
  return (
    <main className="min-h-screen bg-neutral-950">
      <MediaHero media={media} />

      <MediaTrailer trailerUrl={media.trailerUrl} />

      {/* Reviews placeholder  */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Community
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">Reviews</h2>

            <p className="mt-2 text-sm text-neutral-500">
              Reviews will appear here.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
