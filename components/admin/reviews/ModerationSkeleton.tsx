export function ModerationSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/3 p-6"
        >
          <div className="flex gap-3">
            <div className="size-10 animate-pulse rounded-full bg-white/5" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
            </div>
          </div>

          <div className="mt-5 h-16 animate-pulse rounded-xl bg-white/3" />

          <div className="mt-5 h-24 animate-pulse rounded-xl bg-white/3" />

          <div className="mt-5 flex gap-2">
            <div className="h-9 w-24 animate-pulse rounded-md bg-white/5" />
            <div className="h-9 w-20 animate-pulse rounded-md bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
