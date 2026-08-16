import Link from "next/link";
import { Film } from "lucide-react";

export function AdminMediaEmptyState() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-white/5">
        <Film className="size-6 text-neutral-500" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">No media found</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        There are no titles matching your current filters.
      </p>

      <Link
        href="/admin/media/create"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-black hover:bg-neutral-200"
      >
        Create media
      </Link>
    </div>
  );
}
