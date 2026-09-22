"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RSVP_STATUSES,
  type DecisionStatus,
  type RsvpStatus,
} from "@/lib/types/user";

const GATED_REASON =
  "Only admitted applicants can have an RSVP status other than unconfirmed.";

interface RsvpEditorProps {
  applicantId: string;
  value: RsvpStatus;
  decisionStatus?: DecisionStatus;
}

export function RsvpEditor({
  applicantId,
  value,
  decisionStatus,
}: RsvpEditorProps) {
  const router = useRouter();
  const [current, setCurrent] = React.useState<RsvpStatus>(value);
  const [isSaving, setIsSaving] = React.useState(false);

  const isAdmitted = decisionStatus === "admitted";

  async function handleChange(next: RsvpStatus) {
    const prev = current;
    setCurrent(next);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/v1/applicants/${applicantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rsvpStatus: next }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(`RSVP updated to ${next}`);
      router.refresh();
    } catch {
      setCurrent(prev);
      toast.error("Could not update RSVP. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Select value={current} onValueChange={handleChange} disabled={isSaving}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="RSVP" />
      </SelectTrigger>
      <SelectContent>
        {RSVP_STATUSES.map((s) => {
          const disabled = !isAdmitted && s !== "unconfirmed";
          return (
            <span
              key={s}
              className="block"
              title={disabled ? GATED_REASON : undefined}
            >
              <SelectItem value={s} disabled={disabled}>
                {s}
              </SelectItem>
            </span>
          );
        })}
      </SelectContent>
    </Select>
  );
}
