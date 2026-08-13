"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "@/types/pagination";

interface MediaPaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function MediaPagination({ meta, onPageChange }: MediaPaginationProps) {
  if (meta.totalPages <= 1) {
    return null;
  }

  const canGoPrevious = meta.page > 1;
  const canGoNext = meta.page < meta.totalPages;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!canGoPrevious}
        onClick={() => onPageChange(meta.page - 1)}
        className="border-white/10 bg-white/3 text-neutral-300 hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>

      <span className="text-sm text-neutral-500">
        Page <span className="font-medium text-white">{meta.page}</span> of{" "}
        <span className="font-medium text-white">{meta.totalPages}</span>
      </span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!canGoNext}
        onClick={() => onPageChange(meta.page + 1)}
        className="border-white/10 bg-white/3 text-neutral-300 hover:bg-white/10 hover:text-white"
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
