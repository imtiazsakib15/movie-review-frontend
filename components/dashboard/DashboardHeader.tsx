import { Film } from "lucide-react";

interface DashboardHeaderProps {
  name: string | null;
  email: string;
}

export function DashboardHeader({ name, email }: DashboardHeaderProps) {
  const displayName = name ?? email;

  return (
    <header>
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
          <Film className="size-5 text-neutral-200" />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
            Your Cinevoo
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome back, {displayName}
          </h1>
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
        Keep track of your reviews, watchlist, and completed movies and series.
      </p>
    </header>
  );
}
