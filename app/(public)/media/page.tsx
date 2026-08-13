import { Suspense } from "react";

import { MediaListing } from "@/components/media/MediaListing";

function MediaPageFallback() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <section className="border-b border-white/10 bg-white/1.5">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-4 w-24 animate-pulse rounded bg-white/5" />

          <div className="mt-3 h-10 w-64 animate-pulse rounded bg-white/5" />

          <div className="mt-4 h-5 w-96 max-w-full animate-pulse rounded bg-white/5" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-28 animate-pulse rounded-2xl bg-white/3" />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/3"
            >
              <div className="aspect-2/3 animate-pulse bg-white/5" />

              <div className="space-y-2 p-4">
                <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function MediaPage() {
  return (
    <Suspense fallback={<MediaPageFallback />}>
      <MediaListing />
    </Suspense>
  );
}
