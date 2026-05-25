"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const writeParams = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(searchParams.toString());
    mutate(next);
    const query = next.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    // Bypass router.replace to avoid an RSC refetch — filter state is client-only.
    window.history.replaceState(null, "", url);
  };

  const setParam = (key: string, value: string) => {
    writeParams((p) => {
      if (!value || value === ALL) {
        p.delete(key);
      } else {
        p.set(key, value);
      }
      p.delete("page");
    });
  };

  const status = searchParams.get("status") ?? ALL;
  const decision = searchParams.get("decision") ?? ALL;
  const rsvp = searchParams.get("rsvp") ?? ALL;

  const hasActiveFilters = status !== ALL || decision !== ALL || rsvp !== ALL;

  const clearFilters = () => {
    writeParams((p) => {
      p.delete("status");
      p.delete("decision");
      p.delete("rsvp");
      p.delete("page");
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
