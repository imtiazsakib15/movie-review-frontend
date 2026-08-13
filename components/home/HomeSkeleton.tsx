export function HomeMediaSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/3">
      <div className="aspect-2/3 animate-pulse bg-white/5" />

      <div className="space-y-2 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-white/5" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />
      </div>
    </div>
  );
}
