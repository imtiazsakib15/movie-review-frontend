import { Search, Users } from "lucide-react";

interface AdminUserEmptyStateProps {
  hasFilters: boolean;
}

export function AdminUserEmptyState({ hasFilters }: AdminUserEmptyStateProps) {
  return (
    <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/5">
        {hasFilters ? (
          <Search className="size-6 text-neutral-500" />
        ) : (
          <Users className="size-6 text-neutral-500" />
        )}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        {hasFilters ? "No users found" : "No users yet"}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        {hasFilters
          ? "Try changing your search or role filter."
          : "Registered users will appear here."}
      </p>
    </div>
  );
}
