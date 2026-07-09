"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DECISION_STATUSES, type DecisionStatus } from "@/lib/types/user";

interface DecisionEditorProps {
  applicantId: string;
  value?: DecisionStatus;
}

export function DecisionEditor({ applicantId, value }: DecisionEditorProps) {
  const router = useRouter();
  const [current, setCurrent] = React.useState<DecisionStatus>(
    value ?? "pending",
  );
  const [isSaving, setIsSaving] = React.useState(false);

  async function handleChange(next: DecisionStatus) {
    const prev = current;
    setCurrent(next);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/v1/applicants/${applicantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisionStatus: next }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(`Decision updated to ${next}`);
      router.refresh();
    } catch {
      setCurrent(prev);
      toast.error("Could not update decision. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Select value={current} onValueChange={handleChange} disabled={isSaving}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Decision" />
        </SelectTrigger>
        <SelectContent>
          {DECISION_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Toaster />
    </>
  );
}
