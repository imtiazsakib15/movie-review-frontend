import Link from "next/link";
import { Film } from "lucide-react";

import { UserMenu } from "./UserMenu";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-white text-black">
            <Film className="size-4.5" />
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Cinevoo
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/media"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Movies & Series
          </Link>

          <Link
            href="/media?type=MOVIE"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Movies
          </Link>

          <Link
            href="/media?type=SERIES"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Series
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <UserMenu />
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
