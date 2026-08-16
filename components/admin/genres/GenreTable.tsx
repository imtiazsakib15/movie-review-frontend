"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div className="overflow-x-auto">
        <table className="w-full min-w-162.5 text-left">
          <thead className="border-b border-white/10 bg-white/2">
            <tr className="text-xs uppercase tracking-wider text-neutral-600">
              <th className="px-5 py-4">Name</th>

              <th className="px-5 py-4">Slug</th>

              <th className="px-5 py-4">ID</th>

              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {genres.map((genre) => (
              <tr key={genre.id} className="transition-colors hover:bg-white/2">
                <td className="px-5 py-4">
                  <span className="font-medium text-white">{genre.name}</span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-neutral-400">
                    {genre.slug}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    title={genre.id}
                    className="block max-w-55 truncate font-mono text-xs text-neutral-600"
                  >
                    {genre.id}
                  </span>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
