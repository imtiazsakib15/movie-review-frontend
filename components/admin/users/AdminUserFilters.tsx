"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import type { ListUsersParams } from "@/features/users/users.types";

interface AdminUserFiltersProps {
  filters: ListUsersParams;
  onChange: (updates: Partial<ListUsersParams>) => void;
  onReset: () => void;
}

export function AdminUserFilters({
  filters,
  onChange,
  onReset,
}: AdminUserFiltersProps) {
  const [search, setSearch] = useState(filters.search ?? "");

  useEffect(() => {
    setSearch(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const current = filters.search ?? "";

      if (search !== current) {
        onChange({
          search: search.trim() || undefined,
          page: 1,
        });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [search, filters.search, onChange]);

  const hasFilters = Boolean(filters.search) || Boolean(filters.role);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/2.5 p-3 sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-600" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="h-10 border-white/10 bg-neutral-950/70 pl-9 pr-9 text-sm text-white placeholder:text-neutral-600"
          />

          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                onChange({
                  search: undefined,
                  page: 1,
                });
              }}
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-neutral-600 hover:bg-white/5 hover:text-neutral-300"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <select
          value={filters.role ?? "ALL"}
          onChange={(event) => {
            const value = event.target.value;

            onChange({
              role: value === "ALL" ? undefined : (value as "USER" | "ADMIN"),
              page: 1,
            });
          }}
          className="h-10 rounded-md border border-white/10 bg-neutral-950 px-3 text-sm text-neutral-300 outline-none focus:border-white/20"
        >
          <option value="ALL">All roles</option>
          <option value="USER">Users</option>
          <option value="ADMIN">Admins</option>
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-neutral-600 transition-colors hover:text-neutral-300"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
