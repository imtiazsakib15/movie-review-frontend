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

interface DeleteMediaDialogProps {
  open: boolean;
  mediaTitle?: string;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteMediaDialog({
  open,
  mediaTitle,
  isDeleting,
  onOpenChange,
  onConfirm,
}: DeleteMediaDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-neutral-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="size-5 text-red-400" />
            Delete media
          </DialogTitle>

          <DialogDescription className="text-neutral-500">
            Are you sure you want to delete{" "}
            <span className="font-medium text-neutral-300">
              {mediaTitle ? `"${mediaTitle}"` : "this media"}
            </span>
            ?
            <br />
            <span className="mt-2 block">
              This media will be removed from the public catalog.
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
                className="border-white/10 bg-white/3 text-neutral-300 hover:bg-white/10 hover:text-white"
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
                Delete media
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
