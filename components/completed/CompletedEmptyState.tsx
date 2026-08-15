import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function CompletedEmptyState() {
  return (
    <div className="flex min-h-112.5 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-white/5">
        <CheckCircle2 className="size-6 text-neutral-500" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        Nothing completed yet
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        Mark movies and series as completed after watching them, and they'll
        appear here.
      </p>

      <Link
        href="/media"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
      >
        Explore media
      </Link>
    </div>
  );
}
