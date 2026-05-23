import type {
  ApplicantDetail,
  ApplicantListResult,
  ApplicantSummary,
  ApplicantUpdate,
} from "./types";

const MOCK_APPLICANTS: ApplicantDetail[] = [
  {
    id: "mock-001",
    email: "ada.lovelace@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-12T14:03:00.000Z",
    rsvpSubmissionTime: "2026-03-01T18:22:00.000Z",
    applicationResponses: {
      firstName: "Ada",
      lastName: "Lovelace",
      school: "Northeastern University",
      year: "Junior",
      whyHackBeanPot: "I want to build a punch-card-driven web app.",
    },
    postAcceptanceResponses: {
      dietaryRestrictions: "Vegetarian",
      tshirtSize: "M",
    },
  },
  {
    id: "mock-002",
    email: "grace.hopper@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "not-attending",
    appSubmissionTime: "2026-02-10T09:45:00.000Z",
    rsvpSubmissionTime: "2026-03-02T12:00:00.000Z",
    applicationResponses: {
      firstName: "Grace",
      lastName: "Hopper",
      school: "Yale",
      year: "Senior",
      whyHackBeanPot: "Compilers are cool.",
    },
  },
  {
    id: "mock-003",
    email: "alan.turing@example.com",
    applicationStatus: "submitted",
    decisionStatus: "waitlisted",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-14T22:10:00.000Z",
  },
  {
    id: "mock-004",
    email: "linus.torvalds@example.com",
    applicationStatus: "submitted",
    decisionStatus: "declined",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-13T16:30:00.000Z",
  },
  {
    id: "mock-005",
    email: "margaret.hamilton@example.com",
    applicationStatus: "submitted",
    decisionStatus: "pending",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-15T11:15:00.000Z",
  },
  {
    id: "mock-006",
    email: "katherine.johnson@example.com",
    applicationStatus: "incomplete",
    rsvpStatus: "unconfirmed",
  },
  {
    id: "mock-007",
    email: "dennis.ritchie@example.com",
    applicationStatus: "not-started",
    rsvpStatus: "unconfirmed",
  },
  {
    id: "mock-008",
    email: "barbara.liskov@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-11T08:00:00.000Z",
    rsvpSubmissionTime: "2026-03-03T09:30:00.000Z",
  },
];

function toSummary(detail: ApplicantDetail): ApplicantSummary {
  const first = detail.applicationResponses?.["firstName"];
  const last = detail.applicationResponses?.["lastName"];
  const name =
    first || last
      ? [first, last].filter(Boolean).join(" ")
      : undefined;

  return {
    id: detail.id,
    email: detail.email,
    name,
    applicationStatus: detail.applicationStatus,
    decisionStatus: detail.decisionStatus,
    rsvpStatus: detail.rsvpStatus,
    appSubmissionTime: detail.appSubmissionTime,
  };
}

export async function listApplicants(): Promise<ApplicantListResult> {
  const rows = MOCK_APPLICANTS.map(toSummary);
  return { rows, total: rows.length, page: 1, pageSize: rows.length };
}

export async function getApplicant(
  id: string,
): Promise<ApplicantDetail | null> {
  return MOCK_APPLICANTS.find((a) => a.id === id) ?? null;
}

export async function updateApplicant(
  id: string,
  update: ApplicantUpdate,
): Promise<ApplicantDetail> {
  throw new Error(
    `Not implemented: updateApplicant(${id}, ${JSON.stringify(update)})`,
  );
}
