import type { Filter } from "mongodb";

import type { ApplicantDoc } from "./types";

/**
 * Which hackathon season a record belongs to. applicant_data still holds earlier
 * seasons' records (until `yarn archive-applicants` moves them out), so the admin list
 * and exports default to the current season.
 *
 * A record is in the current season when the applicant saved or submitted on or
 * after CURRENT_SEASON_START. Only applicant activity counts here. An admin edit
 * (`updatedAt`) to an old record doesn't pull it into this season.
 *
 * Bump both constants when the next season's registration opens.
 */
export const CURRENT_SEASON = "2027";
export const CURRENT_SEASON_START = new Date("2026-09-01T00:00:00Z");

export const SEASON_FILTERS = ["current", "past", "all"] as const;
export type SeasonFilter = (typeof SEASON_FILTERS)[number];

const APPLICANT_ACTIVITY_FIELDS = ["lastSavedAt", "appSubmissionTime"] as const;

/**
 * This portal stores these timestamps as Dates, but older records may hold ISO strings.
 * Mongo never compares a string with a Date, so this checks both forms.
 */
function currentSeasonFilter(): Filter<ApplicantDoc> {
  const start = CURRENT_SEASON_START;
  return {
    $or: APPLICANT_ACTIVITY_FIELDS.flatMap((field) => [
      { [field]: { $gte: start } },
      { [field]: { $type: "string", $gte: start.toISOString() } },
    ]),
  } as Filter<ApplicantDoc>;
}

export function buildSeasonQuery(
  season: SeasonFilter,
): Filter<ApplicantDoc> | undefined {
  if (season === "current") return currentSeasonFilter();
  if (season === "past") return { $nor: [currentSeasonFilter()] };
  return undefined;
}
