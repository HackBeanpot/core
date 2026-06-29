import { NextRequest, NextResponse } from "next/server";

import { getApplicant, updateApplicant } from "@/lib/applicants/service";
import type { ApplicantUpdate } from "@/lib/applicants/types";
import {
  DECISION_STATUSES,
  RSVP_STATUSES,
  type DecisionStatus,
  type RsvpStatus,
} from "@/lib/types/user";

function isDecisionStatus(v: unknown): v is DecisionStatus {
  return DECISION_STATUSES.includes(v as DecisionStatus);
}

function isRsvpStatus(v: unknown): v is RsvpStatus {
  return RSVP_STATUSES.includes(v as RsvpStatus);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const applicant = await getApplicant(params.id);
  if (!applicant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(applicant);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { decisionStatus, rsvpStatus } = (body ?? {}) as Record<
    string,
    unknown
  >;
  const update: ApplicantUpdate = {};

  if (decisionStatus !== undefined) {
    if (!isDecisionStatus(decisionStatus)) {
      return NextResponse.json(
        { error: "Invalid decisionStatus" },
        { status: 400 },
      );
    }
    update.decisionStatus = decisionStatus;
  }

  if (rsvpStatus !== undefined) {
    if (!isRsvpStatus(rsvpStatus)) {
      return NextResponse.json(
        { error: "Invalid rsvpStatus" },
        { status: 400 },
      );
    }
    update.rsvpStatus = rsvpStatus;
  }

  const updated = await updateApplicant(params.id, update);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}
