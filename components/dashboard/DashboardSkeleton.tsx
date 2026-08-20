export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-white/5" />
        <div className="h-9 w-72 max-w-full animate-pulse rounded bg-white/5" />
        <div className="h-4 w-md max-w-full animate-pulse rounded bg-white/5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/2.5"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/2.5" />
        <div className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/2.5" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/2.5" />
        <div className="h-64 animate-pulse rounded-2xl border border-white/10 bg-white/2.5" />
      </div>
    </div>
  );
}
