import Link from "next/link";

export function SidebarItem({
  href,
  label,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? label : undefined}
      className={`group relative flex h-11 items-center rounded-xl transition-all ${
        collapsed ? "justify-center px-0" : "gap-3 px-3"
      } ${
        active
          ? "bg-white/[0.07] text-white"
          : "text-neutral-500 hover:bg-white/4 hover:text-neutral-200"
      }`}
    >
      {/* Active indicator */}
      <span
        className={`absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full transition-all ${
          active ? "w-0.5 bg-white" : "w-0 bg-transparent"
        }`}
      />

      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          active
            ? "bg-white/10 text-white"
            : "bg-white/2.5 text-neutral-600 group-hover:bg-white/6 group-hover:text-neutral-300"
        }`}
      >
        <Icon className="size-4" />
      </span>

      {!collapsed && (
        <span className="truncate text-sm font-medium">{label}</span>
      )}

      {!collapsed && active && (
        <span className="ml-auto size-1.5 rounded-full bg-white" />
      )}
    </Link>
  );
}
