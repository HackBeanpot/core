import React from "react";
import { fetchPortalStatus } from "../../../lib/status/fetchPortalStatus";
import type {
  ApplicantStatus,
  DashboardBranch,
  SerializedDecisionDates,
} from "../../../lib/status/types";
import PreRegistrationView from "../../../components/dashboard/PreRegistrationView";
import InProgressView from "../../../components/dashboard/InProgressView";
import SubmittedView from "../../../components/dashboard/SubmittedView";
import AdmittedView from "../../../components/dashboard/AdmittedView";
import WaitlistedView from "../../../components/dashboard/WaitlistedView";
import DeclinedView from "../../../components/dashboard/DeclinedView";

export default async function DashboardPage(): Promise<JSX.Element> {
  let branch: DashboardBranch = "submitted";
  let status: ApplicantStatus | null = null;
  let decisionDates: SerializedDecisionDates = {
    registrationOpen: new Date().toISOString(),
    showDecision: new Date().toISOString(),
    confirmBy: new Date().toISOString(),
  };
  let completionPercent = 0;

  try {
    const res = await fetchPortalStatus();
    branch = res.branch;
    status = res.status;
    decisionDates = res.decisionDates;
    completionPercent = res.completionPercent;
  } catch (err) {
    // If fetch fails, render a simple error view instead of crashing the page.
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Unable to load dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">{String(err)}</p>
      </div>
    );
  }
  // Ensure `status` is present before rendering views that require it.
  if (!status) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Loading dashboard…</h2>
      </div>
    );
  }
  const resolvedDates = {
    registrationOpen: new Date(decisionDates.registrationOpen),
    showDecision: new Date(decisionDates.showDecision),
    confirmBy: new Date(decisionDates.confirmBy),
  };

  switch (branch) {
    case "pre-registration":
      return <PreRegistrationView decisionDates={resolvedDates} />;
    case "in-progress":
      return (
        <InProgressView status={status} completionPercent={completionPercent} />
      );
    case "submitted":
      return <SubmittedView decisionDates={resolvedDates} status={status} />;
    case "admitted":
      return <AdmittedView decisionDates={resolvedDates} status={status} />;
    case "waitlisted":
      return <WaitlistedView status={status} />;
    case "declined":
      return <DeclinedView />;
    default:
      return <SubmittedView decisionDates={resolvedDates} status={status} />;
  }
}
