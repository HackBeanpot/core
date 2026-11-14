import type { Filter } from "mongodb";

import { buildSeasonQuery } from "./season";
import type { ApplicantDoc, ApplicantFilters } from "./types";

/** Escape regex metacharacters so user input is matched literally. */
function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Translate filter inputs into a Mongo filter. Status filters use plain
 * equality against enum values, `search` matches email or name
 * case-insensitively, and `season` (default "current") limits it to one season.
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
    query.$or = [
      { email: rx },
      { "applicationResponses.first_name": rx },
      { "applicationResponses.last_name": rx },
    ];
  }

  const seasonQuery = buildSeasonQuery(filters.season ?? "current");
  if (seasonQuery) {
    // `$and` so the season's own `$or` doesn't collide with the search `$or`.
    query.$and = [seasonQuery];
  }

  return query;
}
