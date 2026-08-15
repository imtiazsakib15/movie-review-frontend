"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/auth.hooks";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardMobileNav } from "@/components/layout/DashboardMobileNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-500">
        Loading...
      </div>
    );
  }

  if (isError || !user) {
    router.replace("/login");

    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-500">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="flex">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardMobileNav />

          <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
