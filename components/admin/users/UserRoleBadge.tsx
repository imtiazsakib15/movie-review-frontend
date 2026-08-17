interface UserRoleBadgeProps {
  role: "USER" | "ADMIN";
}

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
        role === "ADMIN"
          ? "border-indigo-400/20 bg-indigo-400/10 text-indigo-300"
          : "border-white/10 bg-white/4 text-neutral-400"
      }`}
    >
      {role}
    </span>
  );
}
