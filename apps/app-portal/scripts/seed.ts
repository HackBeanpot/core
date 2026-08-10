/* eslint-disable no-console -- CLI seed script; console output is intentional. */
/**
 * Seed the `applicant_data_test` collection on the shared Atlas cluster with
 * sample applicants, then create the indexes the list endpoint relies on.
 *
 * Usage (from apps/app-portal, or `yarn workspace app-portal seed` from root):
 *   yarn seed
 *
 * Reads MONGO_PROD_CONNECTION_STRING from .env (loaded via
 * `node --env-file=.env`) — this always points at the shared Atlas cluster.
 * DESTRUCTIVE — clears the target collection. Hardcoded to only ever run
 * against `applicant_data_test`; refuses to run if NODE_ENV=production would
 * resolve the real `applicant_data` collection instead (see
 * resolveCollectionName in src/lib/db.ts). Since this writes to a collection
 * shared across the team on Atlas (not an isolated local DB), coordinate
 * before running if others may be relying on its current contents.
 *
 * Statuses are written in canonical enum form (lowercase-hyphen) to match the
 * app enums in src/lib/types/user.ts.
 */
import { getDb, resolveCollectionName } from "@/lib/db";

const TEST_COLLECTION_NAME = "applicant_data_test";
const COLLECTION = resolveCollectionName("applicant_data");
const DRAFT_SAVED_AT = "2026-02-01T00:00:00.000Z";

// [email, first, last, school, year, appStatus, decision|null, rsvp, submitTime|null]
type Row = [
  string,
  string,
  string,
  string,
  string,
  string,
  string | null,
  string,
  string | null,
];

const ROWS: Row[] = [
  [
    "ada.lovelace@example.com",
    "Ada",
    "Lovelace",
    "Northeastern University",
    "Junior",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-12T14:03:00.000Z",
  ],
  [
    "grace.hopper@example.com",
    "Grace",
    "Hopper",
    "Yale",
    "Senior",
    "submitted",
    "admitted",
    "not-attending",
    "2026-02-10T09:45:00.000Z",
  ],
  [
    "alan.turing@example.com",
    "Alan",
    "Turing",
    "Cambridge",
    "Senior",
    "submitted",
    "waitlisted",
    "unconfirmed",
    "2026-02-14T22:10:00.000Z",
  ],
  [
    "linus.torvalds@example.com",
    "Linus",
    "Torvalds",
    "University of Helsinki",
    "Senior",
    "submitted",
    "declined",
    "unconfirmed",
    "2026-02-13T16:30:00.000Z",
  ],
  [
    "margaret.hamilton@example.com",
    "Margaret",
    "Hamilton",
    "Earlham College",
    "Senior",
    "submitted",
    "pending",
    "unconfirmed",
    "2026-02-15T11:15:00.000Z",
  ],
  [
    "katherine.johnson@example.com",
    "Katherine",
    "Johnson",
    "West Virginia University",
    "Senior",
    "incomplete",
    null,
    "unconfirmed",
    null,
  ],
  [
    "dennis.ritchie@example.com",
    "Dennis",
    "Ritchie",
    "Harvard",
    "Senior",
    "not-started",
    null,
    "unconfirmed",
    null,
  ],
  [
    "barbara.liskov@example.com",
    "Barbara",
    "Liskov",
    "Stanford",
    "Graduate",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-11T08:00:00.000Z",
  ],
  [
    "tim.berners-lee@example.com",
    "Tim",
    "Berners-Lee",
    "MIT",
    "Senior",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-09T10:00:00.000Z",
  ],
  [
    "edsger.dijkstra@example.com",
    "Edsger",
    "Dijkstra",
    "UT Austin",
    "Junior",
    "submitted",
    "pending",
    "unconfirmed",
    "2026-02-16T14:00:00.000Z",
  ],
  [
    "john.mccarthy@example.com",
    "John",
    "McCarthy",
    "Stanford",
    "Senior",
    "submitted",
    "waitlisted",
    "unconfirmed",
    "2026-02-17T09:20:00.000Z",
  ],
  [
    "claude.shannon@example.com",
    "Claude",
    "Shannon",
    "MIT",
    "Graduate",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-08T13:45:00.000Z",
  ],
  [
    "donald.knuth@example.com",
    "Donald",
    "Knuth",
    "Stanford",
    "Graduate",
    "incomplete",
    null,
    "unconfirmed",
    null,
  ],
  [
    "frances.allen@example.com",
    "Frances",
    "Allen",
    "NYU",
    "Senior",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-12T07:30:00.000Z",
  ],
  [
    "vint.cerf@example.com",
    "Vint",
    "Cerf",
    "UCLA",
    "Junior",
    "submitted",
    "declined",
    "unconfirmed",
    "2026-02-13T11:00:00.000Z",
  ],
  [
    "guido.vanrossum@example.com",
    "Guido",
    "van Rossum",
    "University of Amsterdam",
    "Graduate",
    "submitted",
    "admitted",
    "not-attending",
    "2026-02-10T16:00:00.000Z",
  ],
  [
    "james.gosling@example.com",
    "James",
    "Gosling",
    "University of Calgary",
    "Senior",
    "submitted",
    "pending",
    "unconfirmed",
    "2026-02-18T10:30:00.000Z",
  ],
  [
    "bjarne.stroustrup@example.com",
    "Bjarne",
    "Stroustrup",
    "Aarhus University",
    "Junior",
    "not-started",
    null,
    "unconfirmed",
    null,
  ],
  [
    "ken.thompson@example.com",
    "Ken",
    "Thompson",
    "UC Berkeley",
    "Senior",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-07T08:15:00.000Z",
  ],
  [
    "rob.pike@example.com",
    "Rob",
    "Pike",
    "University of Toronto",
    "Junior",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-09T15:45:00.000Z",
  ],
  [
    "niklaus.wirth@example.com",
    "Niklaus",
    "Wirth",
    "ETH Zurich",
    "Graduate",
    "submitted",
    "waitlisted",
    "unconfirmed",
    "2026-02-19T12:00:00.000Z",
  ],
  [
    "tony.hoare@example.com",
    "Tony",
    "Hoare",
    "Oxford",
    "Senior",
    "submitted",
    "pending",
    "unconfirmed",
    "2026-02-20T09:00:00.000Z",
  ],
  [
    "leslie.lamport@example.com",
    "Leslie",
    "Lamport",
    "MIT",
    "Graduate",
    "incomplete",
    null,
    "unconfirmed",
    null,
  ],
  [
    "ivan.sutherland@example.com",
    "Ivan",
    "Sutherland",
    "MIT",
    "Graduate",
    "submitted",
    "admitted",
    "confirmed",
    "2026-02-06T14:30:00.000Z",
  ],
  [
    "john.backus@example.com",
    "John",
    "Backus",
    "Columbia",
    "Senior",
    "submitted",
    "declined",
    "unconfirmed",
    "2026-02-21T11:30:00.000Z",
  ],
  [
    "peter.naur@example.com",
    "Peter",
    "Naur",
    "University of Copenhagen",
    "Junior",
    "submitted",
    "admitted",
    "not-attending",
    "2026-02-22T08:45:00.000Z",
  ],
  [
    "dana.scott@example.com",
    "Dana",
    "Scott",
    "Princeton",
    "Graduate",
    "not-started",
    null,
    "unconfirmed",
    null,
  ],
  [
    "michael.rabin@example.com",
    "Michael",
    "Rabin",
    "NYU",
    "Graduate",
    "submitted",
    "pending",
    "unconfirmed",
    "2026-02-23T16:00:00.000Z",
  ],
];

// Maps the seed table's free-text `year` to the real `year_of_study`
// question's enum option values (src/lib/application/questions.ts).
const YEAR_OF_STUDY_MAP: Record<string, string> = {
  Junior: "third",
  Senior: "fourth",
  Graduate: "graduate",
};

const HACKATHON_OPTIONS = ["0", "1-2", "3-5", "6+"];
const INTEREST_OPTIONS = ["web", "mobile", "ai", "hardware", "design", "other"];
const TSHIRT_OPTIONS = ["xs", "s", "m", "l", "xl"];

// A couple of entries deliberately contain a comma/quote so the CSV export's
// escaping logic has real data to exercise during manual verification.
const DIETARY_RESTRICTIONS = [
  "",
  "Vegetarian",
  "Vegetarian, nut allergy",
  `Allergic to "shellfish"`,
  "Halal",
  "Gluten-free",
];

function toDoc(row: Row, index: number) {
  const [
    email,
    firstName,
    lastName,
    school,
    year,
    applicationStatus,
    decisionStatus,
    rsvpStatus,
    appSubmissionTime,
  ] = row;

  // Keyed by the real application question ids (questions.ts), not
  // ad hoc names — otherwise seed data silently diverges from what the
  // real form (and the CSV export/detail page built on top of it) expects.
  const applicationResponses: Record<string, string | string[]> = {
    legal_name: `${firstName} ${lastName}`,
    email,
    university: school,
    year_of_study: YEAR_OF_STUDY_MAP[year] ?? "graduate",
    hackathon_experience: HACKATHON_OPTIONS[index % HACKATHON_OPTIONS.length],
    interests:
      index % 2 === 0
        ? [INTEREST_OPTIONS[index % INTEREST_OPTIONS.length]]
        : [
            INTEREST_OPTIONS[index % INTEREST_OPTIONS.length],
            INTEREST_OPTIONS[(index + 2) % INTEREST_OPTIONS.length],
          ],
    why_attend: `${firstName} is excited to build something new at HackBeanpot.`,
  };
  if (index % 5 === 0) {
    applicationResponses.preferred_name = firstName;
  }
  if (applicationStatus === "submitted" && index % 4 === 0) {
    // Placeholder uploadId — no real upload pipeline exists yet (separate,
    // in-flight uploads ticket); this just gives the detail page's resume
    // row something to render during manual verification.
    applicationResponses.resume = `seed-upload-${index}`;
  }

  // Only applicants who actually reached the RSVP step have post-acceptance
  // data — "unconfirmed" rows leave this unset, matching reality.
  const postAcceptanceResponses =
    rsvpStatus === "confirmed" || rsvpStatus === "not-attending"
      ? {
          attending: rsvpStatus === "confirmed" ? "yes" : "no",
          dietaryRestrictions:
            DIETARY_RESTRICTIONS[index % DIETARY_RESTRICTIONS.length],
          tshirtSize: TSHIRT_OPTIONS[index % TSHIRT_OPTIONS.length],
          accessibilityNeeds:
            index % 6 === 0 ? "Wheelchair accessible seating" : "",
          additionalNotes:
            index % 7 === 0 ? "Arriving a day early for setup." : "",
        }
      : undefined;

  return {
    email,
    applicationStatus,
    ...(decisionStatus ? { decisionStatus } : {}),
    rsvpStatus,
    isAdmin: false,
    ...(appSubmissionTime ? { appSubmissionTime } : {}),
    lastSavedAt: appSubmissionTime ?? DRAFT_SAVED_AT,
    applicationResponses,
    ...(postAcceptanceResponses ? { postAcceptanceResponses } : {}),
  };
}

async function main() {
  if (COLLECTION !== TEST_COLLECTION_NAME) {
    console.error(
      `Refusing to seed: resolved collection is "${COLLECTION}", not ` +
        `"${TEST_COLLECTION_NAME}". This script is destructive and only ` +
        "ever runs against the test collection.",
    );
    process.exit(1);
  }

  const db = await getDb();
  const col = db.collection(COLLECTION);

  await col.deleteMany({});
  const docs = ROWS.map((row, index) => toDoc(row, index));
  await col.insertMany(docs);

  console.log(`Seeded ${docs.length} applicants into ${COLLECTION}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
