export function ReviewListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <div className="flex gap-3">
            <div className="size-10 animate-pulse rounded-full bg-white/5" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-white/5" />

              <div className="h-3 w-20 animate-pulse rounded bg-white/5" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-full animate-pulse rounded bg-white/5" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
