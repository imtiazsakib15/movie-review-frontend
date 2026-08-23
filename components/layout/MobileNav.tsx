"use client";

import Link from "next/link";
import {
  Bookmark,
  CheckCircle2,
  Clapperboard,
  Film,
  Home,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import { usePathname, useSearchParams } from "next/navigation";

export function MobileNav() {
  const { data: user } = useCurrentUser();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const search = searchParams.get("search");

  const isHome = pathname === "/";

  const isBrowse = pathname === "/media" && !type && !search;

  const isMovies = pathname === "/media" && type === "MOVIE";

  const isSeries = pathname === "/media" && type === "SERIES";

  const isDashboard = pathname === "/dashboard";

  const isWatchlist = pathname === "/dashboard/watchlist";

  const isCompleted = pathname === "/dashboard/completed";

  const isReviews = pathname === "/dashboard/reviews";

  const isAdmin = pathname === "/admin";

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-xl border border-white/10 bg-white/3 text-neutral-400 transition-colors hover:bg-white/6 hover:text-white md:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(88vw,380px)] border-white/10 bg-neutral-950 p-0 text-neutral-100"
      >
        {/* Header */}
        <SheetHeader className="border-b border-white/[0.07] px-5 py-5">
          <SheetTitle className="flex items-center gap-3 text-left text-white">
            <div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Film className="size-4 text-white" />
            </div>

            <div>
              <span className="block text-base font-bold">Cinevoo</span>

              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600">
                Movie & Series
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-[calc(100dvh-89px)] flex-col overflow-y-auto">
          <nav className="flex-1 px-3 py-5">
            {/* Explore */}
            <NavSection title="Explore">
              <MobileNavItem href="/" icon={Home} active={isHome}>
                Home
              </MobileNavItem>

              <MobileNavItem
                href="/media"
                icon={Clapperboard}
                active={isBrowse}
              >
                Browse
              </MobileNavItem>

              <MobileNavItem
                href="/media?type=MOVIE"
                icon={Film}
                active={isMovies}
              >
                Movies
              </MobileNavItem>

              <MobileNavItem
                href="/media?type=SERIES"
                icon={Clapperboard}
                active={isSeries}
              >
                Series
              </MobileNavItem>
            </NavSection>

            {user && (
              <>
                <SectionDivider />

                {/* User */}
                <NavSection title="Your Cinevoo">
                  <MobileNavItem
                    href="/dashboard"
                    icon={LayoutDashboard}
                    active={isDashboard}
                  >
                    Dashboard
                  </MobileNavItem>

                  <MobileNavItem
                    href="/dashboard/watchlist"
                    icon={Bookmark}
                    active={isWatchlist}
                  >
                    Watchlist
                  </MobileNavItem>

                  <MobileNavItem
                    href="/dashboard/completed"
                    icon={CheckCircle2}
                    active={isCompleted}
                  >
                    Completed
                  </MobileNavItem>

                  <MobileNavItem
                    href="/dashboard/reviews"
                    icon={Star}
                    active={isReviews}
                  >
                    My Reviews
                  </MobileNavItem>
                </NavSection>

                {user.role === "ADMIN" && (
                  <>
                    <SectionDivider />

                    <NavSection title="Administration">
                      <MobileNavItem
                        href="/admin"
                        icon={ShieldCheck}
                        accent
                        active={isAdmin}
                      >
                        Admin Dashboard
                      </MobileNavItem>
                    </NavSection>
                  </>
                )}
              </>
            )}

            {!user && (
              <>
                <SectionDivider />

                <NavSection title="Account">
                  <MobileNavItem href="/login" icon={LayoutDashboard}>
                    Sign in
                  </MobileNavItem>

                  <SheetClose
                    render={
                      <Link
                        href="/register"
                        className="mt-2 flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
                      />
                    }
                  >
                    Get started
                  </SheetClose>
                </NavSection>
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/[0.07] px-5 py-4">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-700">
              Cinevoo · Discover. Review. Remember.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
        {title}
      </p>

      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SectionDivider() {
  return <div className="my-5 h-px bg-white/[0.07]" />;
}

function MobileNavItem({
  href,
  icon: Icon,
  children,
  accent = false,
  active = false,
}: {
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  children: React.ReactNode;
  accent?: boolean;
  active?: boolean;
}) {
  return (
    <SheetClose
      render={
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all ${
            active
              ? accent
                ? "bg-indigo-400/10 text-indigo-200"
                : "bg-white/[0.07] text-white"
              : accent
                ? "text-indigo-300 hover:bg-indigo-400/10 hover:text-indigo-200"
                : "text-neutral-400 hover:bg-white/5 hover:text-white"
          }`}
        />
      }
    >
      <span
        className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
          active
            ? accent
              ? "bg-indigo-400/15 text-indigo-200"
              : "bg-white/10 text-white"
            : accent
              ? "bg-indigo-400/10 text-indigo-300"
              : "bg-white/[0.035] text-neutral-600 group-hover:bg-white/[0.07] group-hover:text-neutral-300"
        }`}
      >
        <Icon className="size-4" />
      </span>

      <span className="flex-1">{children}</span>

      {active && (
        <span
          className={`size-1.5 rounded-full ${
            accent ? "bg-indigo-300" : "bg-white"
          }`}
        />
      )}
    </SheetClose>
  );
}
