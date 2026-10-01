import { z } from "zod";

import {
  APPLICATION_STATUSES,
  DECISION_STATUSES,
  RSVP_STATUSES,
} from "@/lib/types/user";
import { SORT_FIELDS } from "./types";
import type { ApplicantListParams } from "./types";

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  sortBy: z.enum(SORT_FIELDS).default("appSubmissionTime"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
  status: z.enum(APPLICATION_STATUSES).optional(),
  decision: z.enum(DECISION_STATUSES).optional(),
  rsvp: z.enum(RSVP_STATUSES).optional(),
  search: z.string().trim().min(1).optional(),
});

const schemaDefaults = querySchema.parse({});

export const DEFAULT_LIST_PARAMS: ApplicantListParams = {
  filters: {},
  sortBy: schemaDefaults.sortBy,
  sortDir: schemaDefaults.sortDir,
  page: schemaDefaults.page,
  pageSize: schemaDefaults.pageSize,
};

export type ParseResult =
  | { ok: true; value: ApplicantListParams }
  | { ok: false; error: string };

export function parseApplicantQuery(
  searchParams: URLSearchParams,
): ParseResult {
  const raw: Record<string, string> = {};
  for (const key of [
    "page",
    "pageSize",
    "sortBy",
    "sortDir",
    "status",
    "decision",
    "rsvp",
    "search",
  ] as const) {
    const v = searchParams.get(key);
    if (v !== null) raw[key] = v;
  }

  const parsed = querySchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const path = issue.path.join(".") || "query";
    return {
      ok: false,
      error: `Invalid query parameter "${path}": ${issue.message}`,
    };
  }

  const d = parsed.data;
  return {
    ok: true,
    value: {
      filters: {
        applicationStatus: d.status,
        decisionStatus: d.decision,
        rsvpStatus: d.rsvp,
        search: d.search,
      },
      sortBy: d.sortBy,
      sortDir: d.sortDir,
      page: d.page,
      pageSize: d.pageSize,
    },
  };
}

/** Lenient variant for the admin page: invalid input falls back to defaults. */
export function parseApplicantQueryOrDefault(
  searchParams: URLSearchParams,
): ApplicantListParams {
  const result = parseApplicantQuery(searchParams);
  return result.ok ? result.value : DEFAULT_LIST_PARAMS;
}
