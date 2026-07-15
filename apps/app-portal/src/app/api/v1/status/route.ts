import { NextRequest, NextResponse } from "next/server";
import { decisionDates } from "../../../../lib/status/mock-singletons";
import { returnDashboardBranch } from "../../../../lib/status/machine";
import { getApplicantStatus } from "../../../../lib/status/service";

// TODO: gate with requireUser() once Ticket 1 ships its helpers
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "mock-user";
  const status = await getApplicantStatus(userId);
  const showDecision = new Date() >= decisionDates.showDecision;

  const branch = returnDashboardBranch({
    user: status,
    dates: {
      registrationOpen: decisionDates.registrationOpen,
      confirmBy: decisionDates.confirmBy,
    },
    showDecision,
    now: new Date(),
  });

  return NextResponse.json({
    branch,
    status,
    decisionDates: {
      registrationOpen: decisionDates.registrationOpen.toISOString(),
      showDecision: decisionDates.showDecision.toISOString(),
      confirmBy: decisionDates.confirmBy.toISOString(),
    },
  });
}

export async function POST() {
  return NextResponse.json({ error: "error 501" }, { status: 501 });
}
