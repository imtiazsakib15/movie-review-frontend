export function MyReviewsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <div className="flex justify-between gap-4">
            <div className="space-y-3">
              <div className="h-5 w-48 animate-pulse rounded bg-white/5" />

              <div className="h-4 w-36 animate-pulse rounded bg-white/5" />
            </div>

            <div className="h-9 w-20 animate-pulse rounded bg-white/5" />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
