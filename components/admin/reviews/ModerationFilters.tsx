"use client";

import type { ReviewStatus } from "@/features/reviews/reviews.types";

interface ModerationFiltersProps {
  status: ReviewStatus;
  onChange: (status: ReviewStatus) => void;
}

const filters: {
  value: ReviewStatus;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

export function ModerationFilters({
  status,
  onChange,
}: ModerationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const active = status === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? filter.value === "PENDING"
                  ? "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                  : filter.value === "APPROVED"
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                    : "border-red-400/20 bg-red-400/10 text-red-300"
                : "border-white/10 bg-white/3 text-neutral-500 hover:bg-white/8 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
