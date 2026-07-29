export interface StatsPayload {
  metrics: StatMetric[];
  totals: StatsTotals;
  statusBreakdown: BreakdownEntry[];
  decisionBreakdown: BreakdownEntry[];
  rsvpBreakdown: BreakdownEntry[];
  demographics: DemographicsBreakdown;
  timeline: TimelinePoint[];
  generatedAt: string;
}

// single metric
export interface StatMetric {
  label: string;
  value: number | null; // null = no data yet (distinct from a real count of 0)
  delta: number;
  description?: string; // shown in StatCard hover tooltip
}

export interface StatsTotals {
  applicants: number;
  submitted: number;
  admitted: number;
  waitlisted: number;
  declined: number;
  rsvpYes: number;
  rsvpNo: number;
}

export interface BreakdownEntry {
  status: string;
  count: number;
}

export const DEMOGRAPHICS_DIMENSIONS = [
  "school",
  "yearOfEducation",
  "gender",
  "races",
  "shirtSize",
  "hackathonsAttended",
  "csClassesTaken",
] as const;

export type DemographicsDimension = (typeof DEMOGRAPHICS_DIMENSIONS)[number];

export type DemographicsBreakdown = Record<
  DemographicsDimension,
  { label: string; count: number }[]
>;

export interface TimelinePoint {
  date: string;
  count: number;
}
