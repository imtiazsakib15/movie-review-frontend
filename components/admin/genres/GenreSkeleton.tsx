export function GenreSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="divide-y divide-white/5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 px-5 py-5"
          >
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-40 animate-pulse rounded bg-white/5" />
            </div>

            <div className="h-9 w-9 animate-pulse rounded-md bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
