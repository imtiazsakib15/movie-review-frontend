import Image from "next/image";
import Link from "next/link";

import type { ProfileMediaEntry } from "@/features/profile/profile.types";

interface RecentMediaListProps {
  title: string;
  items: ProfileMediaEntry[];
  emptyMessage: string;
  viewAllHref: string;
}

export function RecentMediaList({
  title,
  items,
  emptyMessage,
  viewAllHref,
}: RecentMediaListProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/2.5">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        <Link
          href={viewAllHref}
          className="text-xs font-medium text-neutral-500 transition-colors hover:text-white"
        >
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-neutral-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {items.map((item) => (
            <Link
              key={`${item.mediaId}-${item.createdAt}`}
              href={`/media/${item.media.slug}`}
              className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/2 sm:px-6"
            >
              <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
                {item.media.posterUrl ? (
                  <Image
                    src={item.media.posterUrl}
                    alt={item.media.title}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-[10px] text-neutral-700">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                  {item.media.title}
                </p>

                <p className="mt-1 text-xs text-neutral-600">
                  {item.media.type} · {item.media.releaseYear}
                </p>
              </div>

              <span className="shrink-0 text-xs text-neutral-700">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
