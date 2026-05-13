"use client";

import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { DecisionStatus } from "@/lib/types/user";

interface DecisionEditorProps {
  applicantId: string;
  value?: DecisionStatus;
}

export function DecisionEditor({ applicantId, value }: DecisionEditorProps) {
  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 text-sm">
        <span className="mb-1 block text-xs font-medium text-neutral-600">
          Decision
        </span>
        <span>{value ?? "—"}</span>
      </div>
      <Button
        onClick={() =>
          toast.message(`Not implemented: edit decision for ${applicantId}`)
        }
      >
        Edit
      </Button>
    </div>
  );
}
