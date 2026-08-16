export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
        <div className="h-9 w-56 animate-pulse rounded bg-white/5" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded bg-white/5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/3"
          />
        ))}
      </div>

      <div className="h-96 animate-pulse rounded-2xl border border-white/10 bg-white/3" />
    </div>
  );
}
