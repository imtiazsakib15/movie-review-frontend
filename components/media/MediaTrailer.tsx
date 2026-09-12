import { Play } from "lucide-react";

interface MediaTrailerProps {
  trailerUrl?: string | null;
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function MediaTrailer({ trailerUrl }: MediaTrailerProps) {
  if (!trailerUrl) {
    return null;
  }

  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <section className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
              <Play className="size-3.5" />
              Watch
            </div>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Official Trailer
            </h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/30">
          <div className="aspect-video">
            <iframe
              src={embedUrl}
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
