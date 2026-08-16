import Image from "next/image";
import Link from "next/link";

import type { MediaSummary } from "@/features/media/media.types";

interface RecentMediaProps {
  media: MediaSummary[];
}

export function RecentMedia({ media }: RecentMediaProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/3">
      <div className="border-b border-white/10 px-5 py-4">
        <h2 className="font-semibold text-white">Recently added media</h2>

        <p className="mt-1 text-xs text-neutral-600">
          Latest titles in the library
        </p>
      </div>

      <div className="divide-y divide-white/5">
        {media.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-neutral-500">
            No media yet.
          </p>
        ) : (
          media.map((item) => (
            <Link
              key={item.id}
              href={`/media/${item.slug}`}
              className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/3"
            >
              <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-neutral-900">
                {item.posterUrl && (
                  <Image
                    src={item.posterUrl}
                    alt={item.title}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-neutral-600">
                  {item.type} · {item.releaseYear}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
