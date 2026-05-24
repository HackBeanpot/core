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
  {
    id: "mock-009",
    email: "tim.berners-lee@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-09T10:00:00.000Z",
    applicationResponses: {
      firstName: "Tim",
      lastName: "Berners-Lee",
      school: "MIT",
      year: "Senior",
    },
  },
  {
    id: "mock-010",
    email: "edsger.dijkstra@example.com",
    applicationStatus: "submitted",
    decisionStatus: "pending",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-16T14:00:00.000Z",
    applicationResponses: {
      firstName: "Edsger",
      lastName: "Dijkstra",
      school: "UT Austin",
      year: "Junior",
    },
  },
  {
    id: "mock-011",
    email: "john.mccarthy@example.com",
    applicationStatus: "submitted",
    decisionStatus: "waitlisted",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-17T09:20:00.000Z",
    applicationResponses: {
      firstName: "John",
      lastName: "McCarthy",
      school: "Stanford",
      year: "Senior",
    },
  },
  {
    id: "mock-012",
    email: "claude.shannon@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-08T13:45:00.000Z",
    applicationResponses: {
      firstName: "Claude",
      lastName: "Shannon",
      school: "Bell Labs University",
      year: "Graduate",
    },
  },
  {
    id: "mock-013",
    email: "donald.knuth@example.com",
    applicationStatus: "incomplete",
    rsvpStatus: "unconfirmed",
    applicationResponses: {
      firstName: "Donald",
      lastName: "Knuth",
      school: "Stanford",
      year: "Graduate",
    },
  },
  {
    id: "mock-014",
    email: "frances.allen@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-12T07:30:00.000Z",
    applicationResponses: {
      firstName: "Frances",
      lastName: "Allen",
      school: "IBM Institute",
      year: "Senior",
    },
  },
  {
    id: "mock-015",
    email: "vint.cerf@example.com",
    applicationStatus: "submitted",
    decisionStatus: "declined",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-13T11:00:00.000Z",
    applicationResponses: {
      firstName: "Vint",
      lastName: "Cerf",
      school: "UCLA",
      year: "Junior",
    },
  },
  {
    id: "mock-016",
    email: "guido.vanrossum@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "not-attending",
    appSubmissionTime: "2026-02-10T16:00:00.000Z",
    applicationResponses: {
      firstName: "Guido",
      lastName: "van Rossum",
      school: "CWI University",
      year: "Graduate",
    },
  },
  {
    id: "mock-017",
    email: "james.gosling@example.com",
    applicationStatus: "submitted",
    decisionStatus: "pending",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-18T10:30:00.000Z",
    applicationResponses: {
      firstName: "James",
      lastName: "Gosling",
      school: "University of Calgary",
      year: "Senior",
    },
  },
  {
    id: "mock-018",
    email: "bjarne.stroustrup@example.com",
    applicationStatus: "not-started",
    rsvpStatus: "unconfirmed",
    applicationResponses: {
      firstName: "Bjarne",
      lastName: "Stroustrup",
      school: "Aarhus University",
      year: "Junior",
    },
  },
  {
    id: "mock-019",
    email: "ken.thompson@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-07T08:15:00.000Z",
    applicationResponses: {
      firstName: "Ken",
      lastName: "Thompson",
      school: "UC Berkeley",
      year: "Senior",
    },
  },
  {
    id: "mock-020",
    email: "rob.pike@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-09T15:45:00.000Z",
    applicationResponses: {
      firstName: "Rob",
      lastName: "Pike",
      school: "University of Toronto",
      year: "Junior",
    },
  },
  {
    id: "mock-021",
    email: "niklaus.wirth@example.com",
    applicationStatus: "submitted",
    decisionStatus: "waitlisted",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-19T12:00:00.000Z",
    applicationResponses: {
      firstName: "Niklaus",
      lastName: "Wirth",
      school: "ETH Zurich",
      year: "Graduate",
    },
  },
  {
    id: "mock-022",
    email: "tony.hoare@example.com",
    applicationStatus: "submitted",
    decisionStatus: "pending",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-20T09:00:00.000Z",
    applicationResponses: {
      firstName: "Tony",
      lastName: "Hoare",
      school: "Oxford",
      year: "Senior",
    },
  },
  {
    id: "mock-023",
    email: "leslie.lamport@example.com",
    applicationStatus: "incomplete",
    rsvpStatus: "unconfirmed",
    applicationResponses: {
      firstName: "Leslie",
      lastName: "Lamport",
      school: "MIT",
      year: "Graduate",
    },
  },
  {
    id: "mock-024",
    email: "ivan.sutherland@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "confirmed",
    appSubmissionTime: "2026-02-06T14:30:00.000Z",
    applicationResponses: {
      firstName: "Ivan",
      lastName: "Sutherland",
      school: "MIT",
      year: "Graduate",
    },
  },
  {
    id: "mock-025",
    email: "john.backus@example.com",
    applicationStatus: "submitted",
    decisionStatus: "declined",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-21T11:30:00.000Z",
    applicationResponses: {
      firstName: "John",
      lastName: "Backus",
      school: "Columbia",
      year: "Senior",
    },
  },
  {
    id: "mock-026",
    email: "peter.naur@example.com",
    applicationStatus: "submitted",
    decisionStatus: "admitted",
    rsvpStatus: "not-attending",
    appSubmissionTime: "2026-02-22T08:45:00.000Z",
    applicationResponses: {
      firstName: "Peter",
      lastName: "Naur",
      school: "University of Copenhagen",
      year: "Junior",
    },
  },
  {
    id: "mock-027",
    email: "dana.scott@example.com",
    applicationStatus: "not-started",
    rsvpStatus: "unconfirmed",
  },
  {
    id: "mock-028",
    email: "michael.rabin@example.com",
    applicationStatus: "submitted",
    decisionStatus: "pending",
    rsvpStatus: "unconfirmed",
    appSubmissionTime: "2026-02-23T16:00:00.000Z",
    applicationResponses: {
      firstName: "Michael",
      lastName: "Rabin",
      school: "NYU",
      year: "Graduate",
    },
  },
];

function toSummary(detail: ApplicantDetail): ApplicantSummary {
  const first = detail.applicationResponses?.["firstName"];
  const last = detail.applicationResponses?.["lastName"];
  const name =
    first || last ? [first, last].filter(Boolean).join(" ") : undefined;

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
