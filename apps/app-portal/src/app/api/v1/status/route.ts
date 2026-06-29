import { NextResponse } from "next/server";
import { decisionDates } from "../../../../lib/status/mock-singletons";
import { returnDashboardBranch } from "../../../../lib/status/machine";
import { getApplicantStatus } from "../../../../lib/status/service";

export async function GET() {
  const status = await getApplicantStatus("mock-user");
  const showDecision = new Date() >= decisionDates.showDecision;
  const branch = returnDashboardBranch(status, decisionDates, showDecision);

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
