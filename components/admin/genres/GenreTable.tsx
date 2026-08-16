"use client";

import Link from "next/link";
import { MoreHorizontal, Pencil, Tag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Genre } from "@/features/genres/genres.types";

interface GenreTableProps {
  genres: Genre[];
  onDelete: (id: string, name: string) => void;
}

export function GenreTable({ genres, onDelete }: GenreTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/2.5 shadow-sm">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/2">
              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Genre
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Slug
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                ID
              </th>

              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {genres.map((genre, index) => {
              const initial = genre.name.charAt(0).toUpperCase();

              return (
                <tr
                  key={genre.id}
                  className="group transition-colors hover:bg-white/2.5"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-sm font-semibold text-neutral-200">
                        {initial}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-white">{genre.name}</p>

                        <p className="mt-0.5 text-xs text-neutral-600">
                          Genre #{index + 1}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/10 px-2.5 py-1.5 font-mono text-xs text-neutral-400">
                      <Tag className="size-3.5 text-neutral-600" />
                      {genre.slug}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      title={genre.id}
                      className="block max-w-56 truncate font-mono text-xs text-neutral-600"
                    >
                      {genre.id}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-600 opacity-70 transition-all hover:bg-white/5 hover:text-white group-hover:opacity-100"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          render={
                            <Link href={`/admin/genres/${genre.id}/edit`} />
                          }
                        >
                          <Pencil />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(genre.id, genre.name)}
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-white/5 md:hidden">
        {genres.map((genre) => {
          const initial = genre.name.charAt(0).toUpperCase();

          return (
            <div key={genre.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-sm font-semibold text-neutral-200">
                  {initial}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-white">
                        {genre.name}
                      </h3>

                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-neutral-500">
                        <Tag className="size-3" />
                        {genre.slug}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0 text-neutral-500 hover:bg-white/5 hover:text-white"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          render={
                            <Link href={`/admin/genres/${genre.id}/edit`} />
                          }
                        >
                          <Pencil />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(genre.id, genre.name)}
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4 rounded-lg border border-white/5 bg-black/10 px-3 py-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-700">
                      ID
                    </p>

                    <p className="mt-1 truncate font-mono text-[11px] text-neutral-600">
                      {genre.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 bg-white/1.5 px-5 py-3">
        <p className="text-xs text-neutral-600">
          {genres.length} {genres.length === 1 ? "genre" : "genres"} total
        </p>
      </div>
    </div>
  );
}
