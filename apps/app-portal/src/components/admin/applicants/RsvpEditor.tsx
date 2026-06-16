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
import { RSVP_STATUSES, type RsvpStatus } from "@/lib/types/user";

interface RsvpEditorProps {
  applicantId: string;
  value: RsvpStatus;
}

export function RsvpEditor({ applicantId, value }: RsvpEditorProps) {
  const router = useRouter();
  const [current, setCurrent] = React.useState<RsvpStatus>(value);
  const [isSaving, setIsSaving] = React.useState(false);

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
    <>
      <Select value={current} onValueChange={handleChange} disabled={isSaving}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="RSVP" />
        </SelectTrigger>
        <SelectContent>
          {RSVP_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
