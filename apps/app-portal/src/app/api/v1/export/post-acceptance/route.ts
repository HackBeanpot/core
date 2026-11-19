import { NextRequest, NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/guards";
import { getApplicantCursor, getApplicantName } from "@/lib/applicants/service";
import { toCsv, responseField, type CsvColumn } from "@/lib/applicants/csv";
import { parseApplicantQuery } from "@/lib/applicants/params";
import type { ApplicantDoc } from "@/lib/applicants/types";

export const dynamic = "force-dynamic"; // per-request stream — never statically rendered or cached

const COLUMNS: CsvColumn<ApplicantDoc>[] = [
  { header: "Email", value: (d) => d.email },
  {
    header: "Name",
    value: (d) => getApplicantName(d.applicationResponses) ?? "",
  },
  { header: "Status", value: (d) => d.applicationStatus },
  { header: "Decision", value: (d) => d.decisionStatus ?? "" },
  { header: "RSVP", value: (d) => d.rsvpStatus },
  {
    header: "Attending",
    value: (d) => responseField(d.postAcceptanceResponses, "attending"),
  },
  {
    header: "Dietary Restrictions",
    value: (d) =>
      responseField(d.postAcceptanceResponses, "dietaryRestrictions"),
  },
  {
    header: "T-Shirt Size",
    value: (d) => responseField(d.postAcceptanceResponses, "tshirtSize"),
  },
  {
    header: "Accessibility Needs",
    value: (d) =>
      responseField(d.postAcceptanceResponses, "accessibilityNeeds"),
  },
  {
    header: "Additional Notes",
    value: (d) => responseField(d.postAcceptanceResponses, "additionalNotes"),
  },
];

// Uses the admin list's filters, so the season defaults to the current one.
export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    // Stopgap 403 mapping until the (separate, in-flight) auth ticket lands
    // typed errors distinguishing unauthenticated (401) from non-admin (403).
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = parseApplicantQuery(new URL(req.url).searchParams);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const cursor = await getApplicantCursor(parsed.value.filters);
  const stream = toCsv(cursor, COLUMNS);
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="post-acceptance-${date}.csv"`,
    },
  });
}
