"use client";

import type { ReviewStatus } from "@/features/reviews/reviews.types";

interface MyReviewsFiltersProps {
  status?: ReviewStatus;
  onChange: (status?: ReviewStatus) => void;
}

export function MyReviewsFilters({ status, onChange }: MyReviewsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(undefined)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          !status
            ? "border-white/20 bg-white text-black"
            : "border-white/10 bg-white/3 text-neutral-400 hover:bg-white/8 hover:text-white"
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChange("PENDING")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          status === "PENDING"
            ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
            : "border-white/10 bg-white/3 text-neutral-400 hover:bg-white/8 hover:text-white"
        }`}
      >
        Pending
      </button>

      <button
        type="button"
        onClick={() => onChange("APPROVED")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          status === "APPROVED"
            ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            : "border-white/10 bg-white/3 text-neutral-400 hover:bg-white/8 hover:text-white"
        }`}
      >
        Approved
      </button>

      <button
        type="button"
        onClick={() => onChange("REJECTED")}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          status === "REJECTED"
            ? "border-red-400/30 bg-red-400/10 text-red-300"
            : "border-white/10 bg-white/3 text-neutral-400 hover:bg-white/8 hover:text-white"
        }`}
      >
        Rejected
      </button>
    </div>
  );
}
