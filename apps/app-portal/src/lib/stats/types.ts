export interface StatsPayload {
  metrics: StatMetric[];
  statusBreakdown: StatusBreakdown;
  demographics: DemographicsBreakdown;
  timeline: TimelinePoint[];
}

// single metric
export interface StatMetric {
  label: string;
  value: number | null; // null = no data yet (distinct from a real count of 0)
  delta: number;
  description?: string; // shown in StatCard hover tooltip
}

export type StatusKind = "application" | "decision" | "rsvp";

export type StatusBreakdown = Record<
  StatusKind,
  { status: string; count: number }[]
>;

export const DEMOGRAPHICS_DIMENSIONS = [
  "school",
  "education",
  "year_of_study",
  "majors",
  "gender",
  "races",
  "shirt_size",
  "hackathon_experience",
] as const;

export type DemographicsDimension = (typeof DEMOGRAPHICS_DIMENSIONS)[number];

export type DemographicsBreakdown = Record<
  DemographicsDimension,
  { label: string; count: number }[]
>;

export interface TimelinePoint {
  date: string;
  submissions: number;
}
