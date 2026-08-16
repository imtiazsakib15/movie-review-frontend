"use client";

import { Loader2, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface DeleteGenreDialogProps {
  open: boolean;
  genreName?: string;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteGenreDialog({
  open,
  genreName,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteGenreDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="size-5 text-red-400" />
            Delete genre
          </DialogTitle>

          <DialogDescription className="text-neutral-500">
            Are you sure you want to delete{" "}
            <span className="font-medium text-neutral-300">
              {genreName ? `"${genreName}"` : "this genre"}
            </span>
            ?
            <br />
            <span className="mt-2 block">
              This action cannot be undone. A genre that is still linked to
              media cannot be deleted.
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-2">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting}
                className="border-white/10 bg-white/d3 text-neutral-300 hover:bg-white/10 hover:text-white"
              />
            }
          >
            Cancel
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete genre
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
