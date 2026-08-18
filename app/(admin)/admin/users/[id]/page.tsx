"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  useAdminUserById,
  useUpdateAdminUserRole,
} from "@/features/users/users.hooks";

import { useCurrentUser } from "@/features/auth/auth.hooks";

import { AdminUserDetails } from "@/components/admin/users/AdminUserDetails";

import type { UpdateUserRoleInput } from "@/features/users/users.types";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useState } from "react";

export default function AdminUserDetailPage() {
  const params = useParams<{ id: string }>();

  const id = params.id;

  const { data: currentUser } = useCurrentUser();

  const userQuery = useAdminUserById(id);

  const roleMutation = useUpdateAdminUserRole();

  const [pendingRole, setPendingRole] = useState<{
    role: UpdateUserRoleInput["role"];
    label: string;
  } | null>(null);

  if (userQuery.isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-32 animate-pulse rounded-md bg-white/5" />
        <div className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/3" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/3"
            />
          ))}
        </div>
      </div>
    );
  }

  if (userQuery.isError || !userQuery.data) {
    return (
      <section className="flex min-h-112.5 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-500/10">
            <ShieldCheck className="size-5 text-red-400" />
          </div>

          <h1 className="mt-5 text-xl font-semibold text-white">
            User not found
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            The requested user could not be found.
          </p>

          <Button
            type="button"
            nativeButton={false}
            render={<Link href="/admin/users" />}
            className="mt-5 bg-white text-black hover:bg-neutral-200"
          >
            Back to users
          </Button>
        </div>
      </section>
    );
  }

  const user = userQuery.data;

  const isCurrentUser = currentUser?.id === user.id;

  const handleRoleChange = () => {
    if (!pendingRole) {
      return;
    }

    roleMutation.mutate(
      {
        id: user.id,
        data: {
          role: pendingRole.role,
        },
      },
      {
        onSuccess: () => {
          setPendingRole(null);
        },
      },
    );
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header>
        <Link
          href="/admin/users"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to users
        </Link>

        <div className="mt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            User details
          </h1>
        </div>
      </header>

      {/* User details */}
      <AdminUserDetails user={user} />

      {/* Role management */}
      <section className="rounded-2xl border border-white/10 bg-white/2.5 p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
            Access
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            Role management
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Change this user&apos;s role. Role changes may require the
            user&apos;s authentication token to be refreshed before the new
            permissions take effect.
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-neutral-500">Current role</p>

            <p className="mt-1 text-lg font-semibold text-white">{user.role}</p>
          </div>

          {!isCurrentUser ? (
            <div className="flex flex-wrap gap-2">
              {user.role !== "ADMIN" && (
                <Button
                  type="button"
                  onClick={() =>
                    setPendingRole({
                      role: "ADMIN",
                      label: "Administrator",
                    })
                  }
                  className="bg-white text-black hover:bg-neutral-200"
                >
                  Make admin
                </Button>
              )}

              {user.role !== "USER" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setPendingRole({
                      role: "USER",
                      label: "Regular user",
                    })
                  }
                  className="border-white/10 bg-white/3 text-neutral-300 hover:bg-white/10 hover:text-white"
                >
                  Remove admin
                </Button>
              )}
            </div>
          ) : (
            <p className="rounded-lg border border-yellow-400/10 bg-yellow-400/5 px-3 py-2 text-xs text-yellow-300">
              You cannot change your own role.
            </p>
          )}
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(pendingRole)}
        title={
          pendingRole?.role === "ADMIN"
            ? "Make user an admin?"
            : "Remove admin access?"
        }
        description={
          <>
            Are you sure you want to change{" "}
            <span className="font-medium text-neutral-200">
              &quot;
              {user.name ?? user.email}
              &quot;
            </span>{" "}
            to{" "}
            <span className="font-medium text-neutral-200">
              {pendingRole?.label}
            </span>
            ?
          </>
        }
        confirmLabel={
          pendingRole?.role === "ADMIN" ? "Make admin" : "Remove admin"
        }
        isLoading={roleMutation.isPending}
        onOpenChange={(open) => {
          if (!open && !roleMutation.isPending) {
            setPendingRole(null);
          }
        }}
        onConfirm={handleRoleChange}
      />
    </section>
  );
}
