"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { RsvpStatus } from "@/lib/types/user";

interface RsvpEditorProps {
  applicantId: string;
  value: RsvpStatus;
}

export function RsvpEditor({ applicantId, value }: RsvpEditorProps) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 text-sm">
        <span className="mb-1 block text-xs font-medium text-neutral-600">
          RSVP
        </span>
        <span>{value}</span>
      </div>
      <Button
        onClick={() =>
          toast.message(`Not implemented: edit RSVP for ${applicantId}`)
        }
      >
        Edit
      </Button>
    </div>
  );
}
