import { Film } from "lucide-react";

interface MediaEmptyStateProps {
  search?: string;
}

export function MediaEmptyState({ search }: MediaEmptyStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-white/5">
        <Film className="size-5 text-neutral-500" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white">No titles found</h2>

      <p className="mt-2 max-w-md text-sm text-neutral-500">
        {search
          ? `We couldn't find anything matching "${search}".`
          : "There are no titles matching your current filters."}
      </p>
    </div>
  );
}
