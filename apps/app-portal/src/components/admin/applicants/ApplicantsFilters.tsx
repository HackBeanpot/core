"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APPLICATION_STATUSES, DECISION_STATUSES } from "@/lib/types/user";

export function ApplicantsFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input placeholder="Search" className="max-w-xs" />
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {APPLICATION_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
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
    </div>
  );
}
