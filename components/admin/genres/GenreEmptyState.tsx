import Link from "next/link";
import { Tags } from "lucide-react";

export function GenreEmptyState() {
  return (
    <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-white/5">
        <Tags className="size-6 text-neutral-500" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">No genres yet</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        Create genres so movies and series can be organized and discovered more
        easily.
      </p>

      <Link
        href="/admin/genres/create"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black hover:bg-neutral-200"
      >
        Create genre
      </Link>
    </div>
  );
}
