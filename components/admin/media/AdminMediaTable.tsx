"use client";

import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import type { Media } from "@/features/media/media.types";

interface AdminMediaTableProps {
  media: Media[];
  onDelete: (id: string) => void;
}

export function AdminMediaTable({ media, onDelete }: AdminMediaTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 text-left">
          <thead className="border-b border-white/10 bg-white/2">
            <tr className="text-xs uppercase tracking-wider text-neutral-600">
              <th className="px-5 py-4">Media</th>

              <th className="px-5 py-4">Type</th>

              <th className="px-5 py-4">Year</th>

              <th className="px-5 py-4">Rating</th>

              <th className="px-5 py-4">Status</th>

              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {media.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-white/2">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
                      {item.posterUrl && (
                        <Image
                          src={item.posterUrl}
                          alt={item.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/media/${item.slug}`}
                        className="line-clamp-1 font-medium text-white hover:text-neutral-300"
                      >
                        {item.title}
                      </Link>

                      <p className="mt-1 text-xs text-neutral-600">
                        {item.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium text-neutral-400">
                    {item.type}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-neutral-400">
                  {item.releaseYear}
                </td>

                <td className="px-5 py-4 text-sm text-neutral-400">
                  {item.ratingCount > 0 ? item.avgRating.toFixed(1) : "—"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                        item.isPublished
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border-yellow-400/20 bg-yellow-400/10 text-yellow-300"
                      }`}
                    >
                      {item.isPublished ? "Published" : "Unpublished"}
                    </span>

                    {item.isFeatured && (
                      <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-1 text-[10px] font-medium text-indigo-300">
                        Featured
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-5 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-neutral-500 hover:bg-white/5 hover:text-white"
                        />
                      }
                    >
                      <MoreHorizontal />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        render={<Link href={`/admin/media/${item.id}/edit`} />}
                      >
                        <Pencil />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
