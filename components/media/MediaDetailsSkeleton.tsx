export function MediaDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] xl:grid-cols-[360px_1fr]">
          <div className="mx-auto aspect-2/3 w-full max-w-70 animate-pulse rounded-2xl bg-white/5 lg:max-w-none" />

          <div className="space-y-5">
            <div className="h-7 w-24 animate-pulse rounded-full bg-white/5" />

            <div className="h-14 w-3/4 animate-pulse rounded bg-white/5" />

            <div className="h-5 w-1/2 animate-pulse rounded bg-white/5" />

            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-4 w-full animate-pulse rounded bg-white/5" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
            </div>

            <div className="flex gap-3 pt-3">
              <div className="h-11 w-36 animate-pulse rounded-lg bg-white/5" />
              <div className="h-11 w-40 animate-pulse rounded-lg bg-white/5" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
