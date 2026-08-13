import Link from "next/link";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white text-black">
                <Film className="size-4" />
              </div>

              <span className="text-lg font-bold text-white">Cinevoo</span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-neutral-500">
              Discover movies and series, share your opinions, and find your
              next favorite story.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <h3 className="font-medium text-white">Explore</h3>

              <div className="mt-3 space-y-2">
                <Link
                  href="/media"
                  className="block text-neutral-500 hover:text-white"
                >
                  Movies & Series
                </Link>

                <Link
                  href="/media?type=MOVIE"
                  className="block text-neutral-500 hover:text-white"
                >
                  Movies
                </Link>

                <Link
                  href="/media?type=SERIES"
                  className="block text-neutral-500 hover:text-white"
                >
                  Series
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-white">Account</h3>

              <div className="mt-3 space-y-2">
                <Link
                  href="/login"
                  className="block text-neutral-500 hover:text-white"
                >
                  Sign in
                </Link>

                <Link
                  href="/register"
                  className="block text-neutral-500 hover:text-white"
                >
                  Register
                </Link>

                <Link
                  href="/dashboard"
                  className="block text-neutral-500 hover:text-white"
                >
                  Dashboard
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-white">Cinevoo</h3>

              <div className="mt-3 space-y-2">
                <Link
                  href="/about"
                  className="block text-neutral-500 hover:text-white"
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="block text-neutral-500 hover:text-white"
                >
                  Contact
                </Link>

                <Link
                  href="/faq"
                  className="block text-neutral-500 hover:text-white"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-neutral-600 md:text-left">
            © {new Date().getFullYear()} Cinevoo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
