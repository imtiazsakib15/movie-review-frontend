"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Clapperboard,
  Film,
  Home,
  RefreshCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-neutral-950 px-6 py-20 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main glow */}
        <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[100px]" />

        <div className="absolute -left-32 top-1/4 size-72 rounded-full bg-white/[0.025] blur-[90px]" />

        <div className="absolute -right-32 bottom-1/4 size-72 rounded-full bg-violet-500/[0.025] blur-[90px]" />

        {/* Cinematic horizontal lines */}
        <div className="absolute inset-x-0 top-[24%] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute inset-x-0 bottom-[24%] h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        {/* Film-strip sides */}
        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-white/[0.035] lg:block" />
        <div className="absolute left-[10%] top-0 hidden h-full w-px bg-white/[0.02] lg:block" />
        <div className="absolute right-[7%] top-0 hidden h-full w-px bg-white/[0.035] lg:block" />
        <div className="absolute right-[10%] top-0 hidden h-full w-px bg-white/[0.02] lg:block" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Status badge */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-red-400/10 bg-red-400/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-300/70 backdrop-blur-xl">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400/50" />
            <span className="relative inline-flex size-2 rounded-full bg-red-400/70" />
          </span>
          Projection interrupted
        </div>

        {/* Main visual */}
        <div className="relative mx-auto mt-10 flex size-32 items-center justify-center sm:size-36">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-white/[0.06]" />

          <div className="absolute inset-3 rounded-full border border-dashed border-white/[0.08]" />

          <div className="absolute inset-7 rounded-full bg-white/[0.025] ring-1 ring-inset ring-white/[0.06]" />

          {/* Icon */}
          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-red-400/10 bg-red-400/[0.05] shadow-2xl shadow-black/30">
            <AlertTriangle className="size-7 text-red-300/80" />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-9">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-700">
            Scene Error
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            The projector hit a problem.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
            Something went wrong while loading this page. The good news is that
            your Cinevoo journey doesn't have to end here.
          </p>
        </div>

        {/* Error reference */}
        {error.digest && (
          <div className="mx-auto mt-6 inline-flex max-w-full items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[10px] text-neutral-700">
            <Sparkles className="size-3" />
            Error ID: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-neutral-200"
          >
            <RefreshCcw className="size-4" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 text-sm font-medium text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
          >
            <Home className="size-4" />
            Back to home
          </Link>
        </div>

        {/* Secondary links */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-neutral-700">
          <Link
            href="/media"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-300"
          >
            <Clapperboard className="size-3.5" />
            Browse movies & series
          </Link>

          <span className="h-3 w-px bg-white/[0.08]" />

          <Link
            href="/media?search="
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-300"
          >
            <Search className="size-3.5" />
            Search the catalog
          </Link>
        </div>

        {/* Film reel decoration */}
        <div className="mx-auto mt-14 flex items-center justify-center gap-2 opacity-30">
          {Array.from({
            length: 18,
          }).map((_, index) => (
            <span key={index} className="size-1.5 rounded-full bg-white/20" />
          ))}
        </div>

        {/* Footer message */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-800">
          <Film className="size-3" />
          Cinevoo
        </div>
      </div>
    </main>
  );
}
