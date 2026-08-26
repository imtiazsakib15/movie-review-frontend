import Link from "next/link";
import { ArrowLeft, Clapperboard, Film, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-neutral-950 px-6 py-20 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-128 w-lg -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/2.5 blur-3xl" />

        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-violet-500/4 blur-3xl" />

        {/* Vertical film-strip lines */}
        <div className="absolute left-[8%] top-0 hidden h-full w-px bg-white/[0.035] lg:block" />
        <div className="absolute left-[11%] top-0 hidden h-full w-px bg-white/2 lg:block" />
        <div className="absolute right-[8%] top-0 hidden h-full w-px bg-white/[0.035] lg:block" />
        <div className="absolute right-[11%] top-0 hidden h-full w-px bg-white/2 lg:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Small label */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500 backdrop-blur-xl">
          <Film className="size-3" />
          Scene not found
        </div>

        {/* 404 */}
        <div className="relative mt-6">
          <span
            aria-hidden="true"
            className="absolute inset-0 select-none text-[10rem] font-black leading-none tracking-[-0.08em] text-white/2.5 blur-sm sm:text-[14rem]"
          >
            404
          </span>

          <h1 className="relative select-none text-[7rem] font-black leading-none tracking-[-0.08em] text-white sm:text-[10rem] md:text-[12rem]">
            404
          </h1>
        </div>

        {/* Headline */}
        <div className="mx-auto -mt-2 max-w-xl sm:-mt-4">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Looks like this scene was cut.
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-500 sm:text-base">
            The page you're looking for doesn't exist, may have been removed, or
            the URL might be incorrect.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-neutral-200"
          >
            <Home className="size-4" />
            Back to home
          </Link>

          <Link
            href="/media"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 text-sm font-medium text-neutral-300 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/6 hover:text-white"
          >
            <Clapperboard className="size-4" />
            Browse movies & series
          </Link>
        </div>

        {/* Secondary navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-700">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-300"
          >
            <ArrowLeft className="size-3" />
            Home
          </Link>

          <span className="h-3 w-px bg-white/10" />

          <Link
            href="/media"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-300"
          >
            <Search className="size-3" />
            Search the catalog
          </Link>
        </div>

        {/* Decorative film perforations */}
        <div className="mx-auto mt-14 flex max-w-md items-center justify-center gap-2 opacity-40">
          {Array.from({ length: 14 }).map((_, index) => (
            <span key={index} className="size-1.5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
    </main>
  );
}
