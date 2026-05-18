import type { Filter } from "mongodb";
import type { ApplicantFilters } from "./types";

export function buildApplicantQuery(
  filters: ApplicantFilters,
): Filter<Record<string, unknown>> {
  const query: Filter<Record<string, unknown>> = {};
  if (filters.search) query.email = { $regex: filters.search, $options: "i" };
  if (filters.applicationStatus)
    query.applicationStatus = filters.applicationStatus;
  if (filters.decisionStatus) query.decisionStatus = filters.decisionStatus;
  return query;
}
