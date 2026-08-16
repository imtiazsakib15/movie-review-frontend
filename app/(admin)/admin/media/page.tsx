"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { mediaQuerySchema } from "@/features/media/media.schema";

import { useDeleteMedia, useMedia } from "@/features/media/media.hooks";

import type { GetMediaParams } from "@/features/media/media.types";

import { AdminMediaFilters } from "@/components/admin/media/AdminMediaFilters";
import { AdminMediaTable } from "@/components/admin/media/AdminMediaTable";
import { AdminMediaEmptyState } from "@/components/admin/media/AdminMediaEmptyState";

import { useState } from "react";
import { DeleteMediaDialog } from "@/components/admin/media/DeleteMediaDialog";

export default function AdminMediaPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [deleteMediaId, setDeleteMediaId] = useState<string | null>(null);

  const [deleteMediaTitle, setDeleteMediaTitle] = useState<string | null>(null);

  const filters = useMemo<GetMediaParams>(() => {
    const raw = {
      page: searchParams.get("page") ?? undefined,

      limit: searchParams.get("limit") ?? undefined,

      search: searchParams.get("search") ?? "",

      type: searchParams.get("type") ?? undefined,

      access: searchParams.get("access") ?? undefined,

      isFeatured: searchParams.get("isFeatured") ?? undefined,

      sortBy: searchParams.get("sortBy") ?? undefined,

      sortOrder: searchParams.get("sortOrder") ?? undefined,
    };

    const result = mediaQuerySchema.safeParse(raw);

    return result.success
      ? result.data
      : {
          page: 1,
          limit: 12,
          search: "",
          sortBy: "createdAt",
          sortOrder: "desc",
        };
  }, [searchParams]);

  const { data, isLoading, isError, isFetching, refetch } = useMedia(filters);

  const deleteMutation = useDeleteMedia();

  const updateFilters = useCallback(
    (updates: Partial<GetMediaParams>) => {
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

  const media = data?.items ?? [];
  const meta = data?.meta;

  const openDeleteDialog = (id: string, title: string) => {
    setDeleteMediaId(id);
    setDeleteMediaTitle(title);
  };

  const closeDeleteDialog = () => {
    if (deleteMutation.isPending) {
      return;
    }

    setDeleteMediaId(null);
    setDeleteMediaTitle(null);
  };

  const handleDelete = () => {
    if (!deleteMediaId) {
      return;
    }

    deleteMutation.mutate(deleteMediaId, {
      onSuccess: () => {
        closeDeleteDialog();
      },
    });
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            Media
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Manage Cinevoo's movies and series.
          </p>
        </div>

        <Button
          type="button"
          nativeButton={false}
          render={<Link href="/admin/media/create" />}
          className="bg-white text-black hover:bg-neutral-200"
        >
          <Plus className="size-4" />
          Add media
        </Button>
      </header>

      <AdminMediaFilters
        filters={filters}
        onChange={updateFilters}
        onReset={resetFilters}
      />

      {isFetching && (
        <p className="text-right text-xs text-neutral-600">Updating...</p>
      )}

      {isLoading ? (
        <div className="h-96 animate-pulse rounded-2xl border border-white/10 bg-white/3" />
      ) : isError ? (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/3 text-center">
          <h2 className="font-semibold text-white">Couldn't load media</h2>

          <p className="mt-2 text-sm text-neutral-500">
            Something went wrong while loading the media library.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-md border border-white/10 bg-white/4 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8"
          >
            Try again
          </button>
        </div>
      ) : media.length === 0 ? (
        <AdminMediaEmptyState />
      ) : (
        <>
          <AdminMediaTable media={media} onDelete={openDeleteDialog} />

          <DeleteMediaDialog
            open={Boolean(deleteMediaId)}
            mediaTitle={deleteMediaTitle ?? undefined}
            isDeleting={deleteMutation.isPending}
            onOpenChange={(open) => {
              if (!open) {
                closeDeleteDialog();
              }
            }}
            onConfirm={handleDelete}
          />

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                type="button"
                disabled={filters.page === 1 || deleteMutation.isPending}
                onClick={() =>
                  updateFilters({
                    page: (filters.page ?? 1) - 1,
                  })
                }
                className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-neutral-500">
                Page <span className="font-medium text-white">{meta.page}</span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {meta.totalPages}
                </span>
              </span>

              <button
                type="button"
                disabled={
                  filters.page === meta.totalPages || deleteMutation.isPending
                }
                onClick={() =>
                  updateFilters({
                    page: (filters.page ?? 1) + 1,
                  })
                }
                className="rounded-md border border-white/10 bg-white/3 px-4 py-2 text-sm text-neutral-300 hover:bg-white/8 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
