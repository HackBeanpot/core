import React from "react";
import { fetchPortalStatus } from "../../../lib/status/fetchPortalStatus";
import PreRegistrationView from "../../../components/dashboard/PreRegistrationView";
import InProgressView from "../../../components/dashboard/InProgressView";
import SubmittedView from "../../../components/dashboard/SubmittedView";
import AdmittedView from "../../../components/dashboard/AdmittedView";
import WaitlistedView from "../../../components/dashboard/WaitlistedView";
import DeclinedView from "../../../components/dashboard/DeclinedView";

export default async function DashboardPage(): Promise<JSX.Element> {
  const { branch, status, decisionDates } = await fetchPortalStatus();
  const resolvedDates = {
    registrationOpen: new Date(decisionDates.registrationOpen),
    showDecision: new Date(decisionDates.showDecision),
    confirmBy: new Date(decisionDates.confirmBy),
  };

  switch (branch) {
    case "pre-registration":
      return <PreRegistrationView decisionDates={resolvedDates} />;
    case "in-progress":
      return <InProgressView status={status} />;
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
