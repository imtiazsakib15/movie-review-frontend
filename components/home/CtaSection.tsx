import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 px-6 py-14 text-center sm:px-12">
        <div className="absolute left-1/2 -top-37.5 h-75 w-125 -translate-x-1/2 rounded-full bg-white/5 blur-[100px]" />

        <div className="relative mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Your watchlist awaits
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Find something worth talking about.
          </h2>

          <p className="mt-4 text-sm leading-6 text-neutral-400 sm:text-base">
            Explore the Cinevoo library, rate what you watch, and keep track of
            your favorites.
          </p>

          <Link
            href="/media"
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            Explore Cinevoo
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
