"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteApplicantButtonProps {
  applicantId: string;
  label: string;
}

export function DeleteApplicantButton({
  applicantId,
  label,
}: DeleteApplicantButtonProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/v1/applicants/${applicantId}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 404) throw new Error("Request failed");
      toast.success(`Deleted ${label}`);
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Could not delete applicant. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    // Stop clicks (including ones inside the portalled dialog, which still bubble
    // through the React tree) from reaching the row's open-detail handler.
    <span onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size="sm"
        aria-label={`Delete ${label}`}
        title="Delete applicant"
        className="text-neutral-500 hover:text-red-600"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Dialog open={open} onOpenChange={(o) => !isDeleting && setOpen(o)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete applicant?</DialogTitle>
            <DialogDescription>
              This permanently removes <strong>{label}</strong> and their
              application answers, decision and RSVP. You can&apos;t undo this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isDeleting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </span>
  );
}
