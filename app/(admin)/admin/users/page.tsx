"use client";

import Link from "next/link";
import { Users, UserPlus } from "lucide-react";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useAdminUsers } from "@/features/users/users.hooks";

import type { ListUsersParams } from "@/features/users/users.types";

import { AdminUserFilters } from "@/components/admin/users/AdminUserFilters";
import { AdminUserTable } from "@/components/admin/users/AdminUserTable";
import { AdminUserSkeleton } from "@/components/admin/users/AdminUserSkeleton";
import { AdminUserEmptyState } from "@/components/admin/users/AdminUserEmptyState";

export default function AdminUsersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ListUsersParams>(() => {
    const page = searchParams.get("page");

    const limit = searchParams.get("limit");

    const role = searchParams.get("role");

    const search = searchParams.get("search");

    return {
      page: page ? Number(page) : 1,

      limit: limit ? Number(limit) : 10,

      role: role === "USER" || role === "ADMIN" ? role : undefined,

      search: search || undefined,
    };
  }, [searchParams]);

  const { data, isLoading, isError, isFetching, refetch } =
    useAdminUsers(filters);

  const updateFilters = useCallback(
    (updates: Partial<ListUsersParams>) => {
      const next = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      router.push(next.toString() ? `${pathname}?${next}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const resetFilters = useCallback(() => {
    router.push(pathname, {
      scroll: false,
    });
  }, [pathname, router]);

  const users = data?.items ?? [];
  const meta = data?.meta;

  const hasFilters = Boolean(filters.search) || Boolean(filters.role);

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
              <Users className="size-5 text-neutral-200" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Users
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
            Manage Cinevoo accounts and review user activity.
          </p>
        </div>
      </header>

      {/* Filters */}
      <AdminUserFilters
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
      />

      {isFetching && (
        <p className="text-right text-xs text-neutral-600">Updating...</p>
      )}

      {/* Content */}
      {isLoading ? (
        <AdminUserSkeleton />
      ) : isError ? (
        <div className="flex min-h-90 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 px-6 text-center">
          <h2 className="font-semibold text-white">Couldn&apos;t load users</h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            Something went wrong while loading the user list.
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={() => refetch()}
            className="mt-5 border-white/10 bg-white/3 text-neutral-300 hover:bg-white/8 hover:text-white"
          >
            Try again
          </Button>
        </div>
      ) : users.length === 0 ? (
        <AdminUserEmptyState hasFilters={hasFilters} />
      ) : (
        <>
          <AdminUserTable users={users} />

          {meta && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-neutral-600">
                Showing <span className="text-neutral-400">{users.length}</span>{" "}
                of <span className="text-neutral-400">{meta.total}</span> users
              </p>

              {meta.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={filters.page === 1 || isFetching}
                    onClick={() =>
                      updateFilters({
                        page: (filters.page ?? 1) - 1,
                      })
                    }
                    className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 disabled:pointer-events-none disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-neutral-500">
                    Page{" "}
                    <span className="font-medium text-white">{meta.page}</span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {meta.totalPages}
                    </span>
                  </span>

                  <button
                    type="button"
                    disabled={filters.page! >= meta.totalPages || isFetching}
                    onClick={() =>
                      updateFilters({
                        page: (filters.page ?? 1) + 1,
                      })
                    }
                    className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 disabled:pointer-events-none disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
