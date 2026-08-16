import { ReviewsSection } from "@/components/reviews/ReviewsSection";

import type { Media } from "@/features/media/media.types";

import { MediaHero } from "./MediaHero";
import { MediaTrailer } from "./MediaTrailer";

interface MediaDetailsProps {
  media: Media;
}

export function MediaDetails({ media }: MediaDetailsProps) {
  return (
    <main className="min-h-screen bg-neutral-950">
      <MediaHero media={media} />

      <MediaTrailer trailerUrl={media.trailerUrl} />

      <ReviewsSection
        mediaId={media.id}
        averageRating={media.avgRating}
        ratingCount={media.ratingCount}
        reviewCount={media.reviewCount}
      />
    </main>
  );
}
