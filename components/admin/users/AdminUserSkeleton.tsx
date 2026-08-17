export function AdminUserSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/2.5">
      <div className="divide-y divide-white/5">
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-6 py-5">
            <div className="size-10 animate-pulse rounded-xl bg-white/5" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 animate-pulse rounded bg-white/5" />
              <div className="h-3 w-56 animate-pulse rounded bg-white/5" />
            </div>

            <div className="hidden h-6 w-16 animate-pulse rounded-full bg-white/5 sm:block" />

            <div className="hidden h-4 w-12 animate-pulse rounded bg-white/5 sm:block" />

            <div className="size-8 animate-pulse rounded-md bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
