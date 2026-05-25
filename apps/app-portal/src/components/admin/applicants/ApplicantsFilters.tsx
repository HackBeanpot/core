"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPLICATION_STATUSES,
  DECISION_STATUSES,
  RSVP_STATUSES,
} from "@/lib/types/user";

const ALL = "all";

export function ApplicantsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (!value || value === ALL) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const status = searchParams.get("status") ?? ALL;
  const decision = searchParams.get("decision") ?? ALL;
  const rsvp = searchParams.get("rsvp") ?? ALL;

  const hasActiveFilters = status !== ALL || decision !== ALL || rsvp !== ALL;

  const clearFilters = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("status");
    next.delete("decision");
    next.delete("rsvp");
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input placeholder="Search" className="max-w-xs" />
      <Select value={status} onValueChange={(v) => setParam("status", v)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All statuses</SelectItem>
          {APPLICATION_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={decision} onValueChange={(v) => setParam("decision", v)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Decision" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All decisions</SelectItem>
          {DECISION_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={rsvp} onValueChange={(v) => setParam("rsvp", v)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="RSVP" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All RSVPs</SelectItem>
          {RSVP_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
