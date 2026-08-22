import Link from "next/link";
import { Film } from "lucide-react";

import { UserMenu } from "./UserMenu";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-neutral-950/75 backdrop-blur-2xl">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/6 shadow-lg shadow-black/20">
            <div className="absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-transparent" />

            <Film className="relative size-5 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>

          <div className="hidden sm:block">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
              Movie & Series
            </span>

            <span className="block text-lg font-bold tracking-tight text-white">
              Cinevoo
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink href="/">Home</NavLink>

          <NavLink href="/media">Browse</NavLink>

          <NavLink href="/media?type=MOVIE">Movies</NavLink>

          <NavLink href="/media?type=SERIES">Series</NavLink>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <UserMenu />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex h-9 items-center rounded-lg px-3.5 text-sm font-medium text-neutral-500 transition-all hover:bg-white/d4 hover:text-white"
    >
      {children}

      <span className="absolute inset-x-3 bottom-0 h-px scale-x-0 bg-white/60 transition-transform duration-200 group-hover:scale-x-100" />
    </Link>
  );
}
