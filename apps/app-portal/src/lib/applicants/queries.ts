import type { Filter } from "mongodb";

import type { ApplicantDoc, ApplicantFilters } from "./types";

/** Escape regex metacharacters so user input is matched literally. */
function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Translate filter inputs into a Mongo filter. Status filters use plain
 * equality against enum values and `search` matches
 * email or name case-insensitively.
 */
export function buildApplicantQuery(
  filters: ApplicantFilters,
): Filter<ApplicantDoc> {
  const query: Filter<ApplicantDoc> = {};

  if (filters.applicationStatus) {
    query.applicationStatus = filters.applicationStatus;
  }
  if (filters.decisionStatus) {
    query.decisionStatus = filters.decisionStatus;
  }
  if (filters.rsvpStatus) {
    query.rsvpStatus = filters.rsvpStatus;
  }

  if (filters.search) {
    const rx = { $regex: escapeRegex(filters.search), $options: "i" };
    query.$or = [{ email: rx }, { "applicationResponses.legal_name": rx }];
  }

  return query;
}
