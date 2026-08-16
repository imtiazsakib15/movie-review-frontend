import type { ReviewStatus } from "@/features/reviews/reviews.types";

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
  const styles = {
    PENDING: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    APPROVED: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    REJECTED: "bg-red-400/10 text-red-300 border-red-400/20",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
