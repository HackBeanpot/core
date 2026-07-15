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
const SEARCH_DEBOUNCE_MS = 300;

export function ApplicantsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const writeParams = React.useCallback(
    (mutate: (p: URLSearchParams) => void) => {
      const next = new URLSearchParams(searchParams.toString());
      mutate(next);
      const query = next.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      // Navigate so the server component refetches with the new filters.
      router.replace(url, { scroll: false });
    },
    [router, pathname, searchParams],
  );

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
  const urlQuery = searchParams.get("search") ?? "";

  // Local input state so typing stays responsive; pushed to the URL (which
  // drives the server query) after a short debounce.
  const [searchInput, setSearchInput] = React.useState(urlQuery);

  React.useEffect(() => {
    if (searchInput === urlQuery) return;
    const timeout = setTimeout(() => {
      writeParams((p) => {
        if (!searchInput) {
          p.delete("search");
        } else {
          p.set("search", searchInput);
        }
        p.delete("page");
      });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchInput, urlQuery, writeParams]);

  const hasActiveFilters =
    searchInput !== "" || status !== ALL || decision !== ALL || rsvp !== ALL;

  const clearFilters = () => {
    setSearchInput("");
    writeParams((p) => {
      p.delete("search");
      p.delete("status");
      p.delete("decision");
      p.delete("rsvp");
      p.delete("page");
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder="Search name or email"
        className="max-w-xs"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
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
