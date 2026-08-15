import { Play } from "lucide-react";

interface MediaTrailerProps {
  trailerUrl?: string | null;
}

export function MediaTrailer({ trailerUrl }: MediaTrailerProps) {
  if (!trailerUrl) {
    return null;
  }

  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-white/5">
            <Play className="size-4 text-white" />
          </div>

          <h2 className="text-xl font-semibold text-white">Trailer</h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="aspect-video">
            <iframe
              src={trailerUrl}
              title="Movie trailer"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
