"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";

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

export function MobileNav() {
  const { data: user } = useCurrentUser();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-300 hover:bg-white/5 hover:text-white md:hidden"
            aria-label="Open navigation"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-75 border-white/10 bg-neutral-950 text-neutral-100"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-white">Cinevoo</SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-2">
          <SheetClose
            render={
              <Link
                href="/"
                className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              />
            }
          >
            Home
          </SheetClose>

          <SheetClose
            render={
              <Link
                href="/media"
                className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              />
            }
          >
            Movies & Series
          </SheetClose>

          <SheetClose
            render={
              <Link
                href="/media?type=MOVIE"
                className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              />
            }
          >
            Movies
          </SheetClose>

          <SheetClose
            render={
              <Link
                href="/media?type=SERIES"
                className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              />
            }
          >
            Series
          </SheetClose>

          <SheetClose
            render={
              <Link
                href="/media?search="
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
              />
            }
          >
            <Search className="size-4" />
            Search
          </SheetClose>

          {user && (
            <>
              <div className="my-3 h-px bg-white/10" />

              <SheetClose
                render={
                  <Link
                    href="/dashboard"
                    className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                  />
                }
              >
                Dashboard
              </SheetClose>

              <SheetClose
                render={
                  <Link
                    href="/dashboard/watchlist"
                    className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                  />
                }
              >
                Watchlist
              </SheetClose>

              <SheetClose
                render={
                  <Link
                    href="/dashboard/completed"
                    className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                  />
                }
              >
                Completed
              </SheetClose>

              <SheetClose
                render={
                  <Link
                    href="/dashboard/reviews"
                    className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                  />
                }
              >
                My Reviews
              </SheetClose>

              {user.role === "ADMIN" && (
                <SheetClose
                  render={
                    <Link
                      href="/admin"
                      className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                    />
                  }
                >
                  Admin Dashboard
                </SheetClose>
              )}
            </>
          )}

          {!user && (
            <>
              <div className="my-3 h-px bg-white/10" />

              <SheetClose
                render={
                  <Link
                    href="/login"
                    className="rounded-lg px-3 py-2.5 text-sm text-neutral-300 hover:bg-white/5 hover:text-white"
                  />
                }
              >
                Sign in
              </SheetClose>

              <SheetClose
                render={
                  <Link
                    href="/register"
                    className="rounded-lg bg-white px-3 py-2.5 text-center text-sm font-medium text-black hover:bg-neutral-200"
                  />
                }
              >
                Get started
              </SheetClose>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
