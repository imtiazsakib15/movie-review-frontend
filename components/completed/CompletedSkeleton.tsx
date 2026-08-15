export function CompletedSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-white/10 bg-white/3"
        >
          <div className="aspect-2/3 animate-pulse bg-white/5" />

          <div className="space-y-2 p-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />

            <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />

            <div className="mt-3 h-8 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
