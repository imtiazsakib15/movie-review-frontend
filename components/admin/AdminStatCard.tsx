import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}

export function AdminStatCard({
  label,
  value,
  icon: Icon,
  description,
}: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5 transition-colors hover:border-white/15 hover:bg-white/4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
          <Icon className="size-5 text-neutral-300" />
        </div>

        <span className="text-2xl font-bold tracking-tight text-white">
          {value.toLocaleString()}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-neutral-300">{label}</p>

      {description && (
        <p className="mt-1 text-xs text-neutral-600">{description}</p>
      )}
    </div>
  );
}
