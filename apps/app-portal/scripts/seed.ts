/* eslint-disable no-console -- CLI seed script; console output is intentional. */
/**
 * Seed the `applicant_data_test` collection on the shared Atlas cluster with
 * sample applicants, then create the indexes the list endpoint relies on.
 *
 * Usage (from apps/app-portal, or `yarn workspace app-portal seed` from root):
 *   yarn seed
 *   yarn seed --dry-run   — validate and print, write nothing, connect to nothing
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
import { APPLICATION_SECTIONS } from "@/lib/application/questions";

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

// Unmapped schools fall through to the question's "other" option, with the raw
// name in `school_other`.
const SCHOOL_MAP: Record<string, string> = {
  "Northeastern University": "northeastern_university",
  MIT: "mit",
  Harvard: "harvard_university",
  "Boston University": "boston_university",
};

// The seed table's free-text `year` spans two real questions.
const EDUCATION_MAP: Record<string, { level: string; year: string }> = {
  Junior: { level: "undergraduate", year: "3rd_year" },
  Senior: { level: "undergraduate", year: "4th_year" },
  Graduate: { level: "graduate", year: "1st_year" },
};

const HACKATHON_OPTIONS = ["0", "1-2", "3-5", "6+"];
const CS_CLASS_OPTIONS = ["0", "1-2", "3-5", "6+"];
const WORKSHOP_OPTIONS = [
  "mobile",
  "web",
  "design",
  "backend",
  "frontend",
  "data_science",
  "cybersecurity",
  "ai_ml",
  "product_management",
  "entrepreneurship",
];
const IDENTITIES = [
  { pronouns: "she/her", gender: "female" },
  { pronouns: "he/him", gender: "male" },
  { pronouns: "they/them", gender: "non_binary" },
  { pronouns: "she/they", gender: "genderqueer" },
  { pronouns: "he/him", gender: "prefer_not_to_say" },
  { pronouns: "they/them", gender: "unlisted" },
];
const RACE_OPTIONS = [
  "indigenous_american_or_alaska_native",
  "asian",
  "black_or_african_american",
  "hispanic_or_latinx",
  "native_hawaiian_or_pacific_islander",
  "white",
  "unlisted",
  "prefer_not_to_say",
];
const LGBTQ_OPTIONS = ["yes", "no", "unsure", "prefer_not_to_say"];
const REFERRAL_OPTIONS = [
  "facebook",
  "instagram",
  "linkedin",
  "twitter",
  "tiktok",
  "hbp_email_newsletter",
  "word_of_mouth",
  "hbp_outreach_events",
  "school_communications",
  "other_organization",
  "other",
];
const HOMETOWNS = [
  "Boston, MA",
  "Providence, RI",
  "Portland, ME",
  "Hartford, CT",
  "Nashua, NH",
];
const MAJORS = [
  "Computer Science",
  "Computer Science and Design",
  "Data Science",
  "Electrical Engineering",
  "Mathematics",
];

// The application's own `tshirt_size` question allows 2XL; the RSVP payload schema
// (src/lib/status/rsvp.ts) stops at XL. Kept separate so both match their writer.
const TSHIRT_SIZES = ["xs", "s", "m", "l", "xl", "2xl"];
const RSVP_TSHIRT_SIZES = ["xs", "s", "m", "l", "xl"];

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

  const schoolValue = SCHOOL_MAP[school] ?? "other";
  const education = EDUCATION_MAP[year] ?? EDUCATION_MAP.Graduate;
  const identity = IDENTITIES[index % IDENTITIES.length];

  // Keyed by the real application question ids (questions.ts), not
  // ad hoc names — otherwise seed data silently diverges from what the
  // real form (and the CSV export/detail page built on top of it) expects.
  const applicationResponses: Record<string, string | string[]> = {
    first_name: firstName,
    last_name: lastName,
    hometown: HOMETOWNS[index % HOMETOWNS.length],
    pronouns: identity.pronouns,
    gender: identity.gender,
    race:
      index % 3 === 0
        ? [RACE_OPTIONS[index % RACE_OPTIONS.length]]
        : [
            RACE_OPTIONS[index % RACE_OPTIONS.length],
            RACE_OPTIONS[(index + 3) % RACE_OPTIONS.length],
          ],
    lgbtq: LGBTQ_OPTIONS[index % LGBTQ_OPTIONS.length],
    school: schoolValue,
    education_level: education.level,
    education_year: education.year,
    major: MAJORS[index % MAJORS.length],
    tshirt_size: TSHIRT_SIZES[index % TSHIRT_SIZES.length],
    hackathon_experience: HACKATHON_OPTIONS[index % HACKATHON_OPTIONS.length],
    cs_classes: CS_CLASS_OPTIONS[(index + 1) % CS_CLASS_OPTIONS.length],
    workshop_interests:
      index % 2 === 0
        ? [WORKSHOP_OPTIONS[index % WORKSHOP_OPTIONS.length]]
        : [
            WORKSHOP_OPTIONS[index % WORKSHOP_OPTIONS.length],
            WORKSHOP_OPTIONS[(index + 2) % WORKSHOP_OPTIONS.length],
          ],
    goals_long_answer: `${firstName} wants to ship a project end to end and find people to keep building with afterwards.`,
    passion_long_answer: `${firstName} could talk for hours about why good developer tooling changes what teams are willing to attempt.`,
    hackathon_reflection: `${firstName} has been to a few hackathons and wants more time for workshops and less time fighting deploys.`,
    premade_team: "no",
    referral_source: [REFERRAL_OPTIONS[index % REFERRAL_OPTIONS.length]],
  };
  if (schoolValue === "other") {
    applicationResponses.school_other = school;
  }
  if (index % 5 === 0) {
    applicationResponses.preferred_name = firstName;
  }
  if (index % 4 === 0) {
    applicationResponses.premade_team = "yes";
    applicationResponses.team_captain_info = `${firstName} ${lastName}, ${email}`;
  }
  if (applicationStatus === "submitted" && index % 4 === 0) {
    // Placeholder ids with no matching row in the uploads collection.
    applicationResponses.resume = `seed-upload-${index}`;
    applicationResponses.vaccination_card = `seed-vax-${index}`;
  }

  // Only applicants who actually reached the RSVP step have post-acceptance
  // data — "unconfirmed" rows leave this unset, matching reality.
  const postAcceptanceResponses =
    rsvpStatus === "confirmed" || rsvpStatus === "not-attending"
      ? {
          // saveRsvp writes the parsed payload verbatim, so `attending` holds the
          // rsvpSchema enum value ("confirmed"/"unconfirmed"), not a yes/no string.
          attending: rsvpStatus === "confirmed" ? "confirmed" : "unconfirmed",
          dietaryRestrictions:
            DIETARY_RESTRICTIONS[index % DIETARY_RESTRICTIONS.length],
          tshirtSize: RSVP_TSHIRT_SIZES[index % RSVP_TSHIRT_SIZES.length],
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

function validate(docs: ReturnType<typeof toDoc>[]): string[] {
  const questions = new Map(
    APPLICATION_SECTIONS.flatMap((section) =>
      section.questions.map((q) => [q.id, q] as const),
    ),
  );
  const errors: string[] = [];

  for (const doc of docs) {
    for (const [id, value] of Object.entries(doc.applicationResponses)) {
      const question = questions.get(id);
      if (!question) {
        errors.push(`${doc.email}: no question with id "${id}"`);
        continue;
      }
      if (!question.options) continue;
      const allowed = new Set(question.options.map((o) => o.value));
      for (const v of Array.isArray(value) ? value : [value]) {
        if (!allowed.has(v)) {
          errors.push(`${doc.email}: "${v}" is not an option of "${id}"`);
        }
      }
    }
  }

  return errors;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  if (!dryRun && COLLECTION !== TEST_COLLECTION_NAME) {
    console.error(
      `Refusing to seed: resolved collection is "${COLLECTION}", not ` +
        `"${TEST_COLLECTION_NAME}". This script is destructive and only ` +
        "ever runs against the test collection.",
    );
    process.exit(1);
  }

  const docs = ROWS.map((row, index) => toDoc(row, index));

  const errors = validate(docs);
  if (errors.length > 0) {
    console.error("Seed data does not match the questions in questions.ts:");
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  if (dryRun) {
    console.log(
      `Dry run: ${docs.length} applicants validated against ` +
        `${APPLICATION_SECTIONS.length} sections. Target would be "${COLLECTION}".`,
    );
    console.log(JSON.stringify(docs[0], null, 2));
    process.exit(0);
  }

  const db = await getDb();
  const col = db.collection(COLLECTION);

  await col.deleteMany({});
  await col.insertMany(docs);

  console.log(`Seeded ${docs.length} applicants into ${COLLECTION}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
