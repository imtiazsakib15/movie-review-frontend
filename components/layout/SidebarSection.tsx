export function SidebarSection({
  title,
  collapsed,
  children,
}: {
  title: string;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      {!collapsed && (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
          {title}
        </p>
      )}

      <div className="space-y-1">{children}</div>
    </div>
  );
}
