"use client";

import { useParams } from "next/navigation";

import { MediaDetails } from "@/components/media/MediaDetails";
import { MediaDetailsSkeleton } from "@/components/media/MediaDetailsSkeleton";
import { useMediaBySlug } from "@/features/media/media.hooks";

export default function MediaDetailsPage() {
  const params = useParams<{
    slug: string;
  }>();

  const slug = params.slug;

  const { data: media, isLoading, isError } = useMediaBySlug(slug);

  if (isLoading) {
    return <MediaDetailsSkeleton />;
  }

  if (isError || !media) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-neutral-950 px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-white">Media not found</h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            The movie or series you're looking for doesn't exist or is no longer
            available.
          </p>
        </div>
      </main>
    );
  }

  return <MediaDetails media={media} />;
}
