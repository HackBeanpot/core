export interface StatsPayload {
  metrics: StatMetric[];
  statusBreakdown: StatusBreakdown;
  demographics: DemographicsBreakdown;
  timeline: TimelinePoint[];
}

// single metric
export interface StatMetric {
  label: string;
  value: number;
  delta: number;
}

export type StatusKind = "application" | "decision" | "rsvp";

export type StatusBreakdown = Record<
  StatusKind,
  { status: string; count: number }[]
>;

export type DemographicsDimension =
  | "school"
  | "education"
  | "yearOfEducation"
  | "majors"
  | "gender"
  | "races"
  | "shirtSize"
  | "hackathonsAttended";

export type DemographicsBreakdown = Record<
  DemographicsDimension,
  { label: string; count: number }[]
>;

export interface TimelinePoint {
  date: string;
  submissions: number;
  cumulative: number;
}
