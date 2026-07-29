import type { StatsPayload } from "./types";

// mock shape
export async function getStats(): Promise<StatsPayload> {
  return {
    metrics: [
      {
        label: "Total Applications",
        value: 412,
        delta: 38,
        description: "Everyone who has started their application.",
      },
      {
        label: "Submitted",
        value: 287,
        delta: 24,
        description: "Applications fully submitted and ready for review.",
      },
      {
        label: "Admitted",
        value: 142,
        delta: -12,
        description: "Applicants who have received an admit decision.",
      },
      {
        label: "RSVP'd",
        value: null,
        delta: 8,
        description: "Admitted applicants who have confirmed they'll attend.",
      },
    ],
    totals: {
      applicants: 412,
      submitted: 287,
      admitted: 142,
      waitlisted: 50,
      declined: 75,
      rsvpYes: 96,
      rsvpNo: 16,
    },
    statusBreakdown: [
      { status: "submitted", count: 287 },
      { status: "under-review", count: 48 },
      { status: "incomplete", count: 65 },
      { status: "withdrawn", count: 22 },
      { status: "not-started", count: 60 },
      { status: "deferred", count: 9 },
      { status: "expired", count: 14 },
    ],
    decisionBreakdown: [
      { status: "pending", count: 145 },
      { status: "admitted", count: 142 },
      { status: "waitlisted", count: 50 },
      { status: "declined", count: 75 },
    ],
    rsvpBreakdown: [
      { status: "unconfirmed", count: 30 },
      { status: "confirmed", count: 96 },
      { status: "not-attending", count: 16 },
    ],
    demographics: {
      school: [
        { label: "Northeastern University", count: 134 },
        { label: "MIT", count: 58 },
        { label: "Boston University", count: 49 },
        { label: "Tufts University", count: 31 },
        { label: "Harvard University", count: 23 },
      ],
      education: [
        { label: "Undergraduate", count: 245 },
        { label: "Graduate", count: 42 },
      ],
      year_of_study: [
        { label: "1st year", count: 78 },
        { label: "2nd year", count: 92 },
        { label: "3rd year", count: 67 },
        { label: "4th year", count: 50 },
      ],
      majors: [
        { label: "Computer Science", count: 187 },
        { label: "Data Science", count: 42 },
        { label: "Electrical Engineering", count: 28 },
      ],
      gender: [
        { label: "Male", count: 168 },
        { label: "Female", count: 102 },
        { label: "Non-binary", count: 12 },
        { label: "Prefer not to say", count: 5 },
      ],
      races: [
        { label: "Asian", count: 140 },
        { label: "White", count: 95 },
        { label: "Hispanic or Latino", count: 28 },
        { label: "Black or African American", count: 18 },
      ],
      shirt_size: [
        { label: "S", count: 38 },
        { label: "M", count: 112 },
        { label: "L", count: 95 },
        { label: "XL", count: 42 },
      ],
      hackathon_experience: [
        { label: "0", count: 132 },
        { label: "1-3", count: 118 },
        { label: "4+", count: 37 },
      ],
    },
    timeline: [
      { date: "2026-04-01", count: 12 },
      { date: "2026-04-02", count: 28 },
      { date: "2026-04-03", count: 41 },
      { date: "2026-04-04", count: 36 },
      { date: "2026-04-05", count: 55 },
      { date: "2026-04-06", count: 62 },
      { date: "2026-04-07", count: 53 },
    ],
    generatedAt: new Date().toISOString(),
  };
}
