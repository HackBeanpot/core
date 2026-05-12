import React from "react";
import { returnDashboardBranch } from "../../../lib/status/machine";
import { decisionDates } from "../../../lib/status/mock-singletons";
import { getApplicantStatus } from "../../../lib/status/service";
import PreRegistrationView from "../../../components/dashboard/PreRegistrationView";
import InProgressView from "../../../components/dashboard/InProgressView";
import SubmittedView from "../../../components/dashboard/SubmittedView";
import AdmittedView from "../../../components/dashboard/AdmittedView";
import WaitlistedView from "../../../components/dashboard/WaitlistedView";
import DeclinedView from "../../../components/dashboard/DeclinedView";

export default async function DashboardPage(): Promise<JSX.Element> {
  const status = await getApplicantStatus("mock-user");
  const showDecision = new Date() >= decisionDates.showDecision;
  const branch = returnDashboardBranch(status, decisionDates, showDecision);

  switch (branch) {
    case "pre-registration":
      return <PreRegistrationView />;
    case "in-progress":
      return <InProgressView />;
    case "submitted":
      return <SubmittedView />;
    case "admitted":
      return <AdmittedView />;
    case "waitlisted":
      return <WaitlistedView />;
    case "declined":
      return <DeclinedView />;
    default:
      return <SubmittedView />;
  }
}
