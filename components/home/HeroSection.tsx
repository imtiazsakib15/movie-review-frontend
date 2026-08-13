import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -top-75 h-175 w-175 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

        <div className="absolute -right-50 top-1/3 h-125 w-125 rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_40%)]" />
      </div>

      <div className="relative mx-auto grid min-h-155 max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-neutral-300">
            <Star className="size-3.5 fill-white text-white" />
            Discover stories worth watching
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
            Your next favorite
            <span className="block text-neutral-400">story starts here.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-400 sm:text-lg">
            Discover movies and series, explore ratings, read honest reviews,
            and keep track of everything you've watched.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/media?type=MOVIE"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
            >
              Explore movies
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/media?type=SERIES"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/4 px-6 text-sm font-medium text-white transition-colors hover:bg-white/8"
            >
              <Play className="size-4" />
              Explore series
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative mx-auto aspect-4/5 max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/3 shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />

            <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Cinevoo
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Discover. Rate. Review.
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-400">
                Find something great to watch and see what other viewers think.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
