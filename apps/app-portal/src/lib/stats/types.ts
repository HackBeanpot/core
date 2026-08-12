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
  rsvpUnconfirmed: number;
}

export interface BreakdownEntry {
  status: string;
  count: number;
}

// Must match real question IDs in lib/application/questions.ts (applicationResponses.<id>) —
// these previously used names ("yearOfEducation", "majors", "races", "shirtSize",
// "hackathonsAttended", "csClassesTaken") that don't exist on any applicant document, so
// those charts were always empty.
export const DEMOGRAPHICS_DIMENSIONS = [
  "school",
  "education_year",
  "major",
  "gender",
  "race",
  "tshirt_size",
  "hackathon_experience",
  "cs_classes",
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
