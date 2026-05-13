import type { StatsPayload } from "./types";

// mock shape
export async function getStats(): Promise<StatsPayload> {
  return {
    metrics: [
      { label: "Total Applications", value: 412, delta: 38 },
      { label: "Submitted", value: 287, delta: 24 },
      { label: "Admitted", value: 142, delta: 12 },
      { label: "Confirmed", value: 96, delta: 8 },
    ],
    statusBreakdown: {
      application: [
        { status: "not-started", count: 60 },
        { status: "incomplete", count: 65 },
        { status: "submitted", count: 287 },
      ],
      decision: [
        { status: "pending", count: 145 },
        { status: "admitted", count: 142 },
        { status: "waitlisted", count: 50 },
        { status: "declined", count: 75 },
      ],
      rsvp: [
        { status: "unconfirmed", count: 30 },
        { status: "confirmed", count: 96 },
        { status: "not-attending", count: 16 },
      ],
    },
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
      yearOfEducation: [
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
      shirtSize: [
        { label: "S", count: 38 },
        { label: "M", count: 112 },
        { label: "L", count: 95 },
        { label: "XL", count: 42 },
      ],
      hackathonsAttended: [
        { label: "0", count: 132 },
        { label: "1-3", count: 118 },
        { label: "4+", count: 37 },
      ],
    },
    timeline: [
      { date: "2026-04-01", submissions: 12, cumulative: 12 },
      { date: "2026-04-02", submissions: 28, cumulative: 40 },
      { date: "2026-04-03", submissions: 41, cumulative: 81 },
      { date: "2026-04-04", submissions: 36, cumulative: 117 },
      { date: "2026-04-05", submissions: 55, cumulative: 172 },
      { date: "2026-04-06", submissions: 62, cumulative: 234 },
      { date: "2026-04-07", submissions: 53, cumulative: 287 },
    ],
  };
}
