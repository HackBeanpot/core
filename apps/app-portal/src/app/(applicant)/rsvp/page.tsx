import React from "react";
import { redirect } from "next/navigation";
import { fetchPortalStatus } from "../../../lib/status/fetchPortalStatus";
import RsvpExperience from "../../../components/dashboard/RsvpExperience";

export default async function RsvpPage(): Promise<JSX.Element> {
  const { branch, status, decisionDates } = await fetchPortalStatus();
  const confirmBy = new Date(decisionDates.confirmBy);
  const isAfterConfirmBy = Date.now() > confirmBy.getTime();

  if (branch !== "admitted" || isAfterConfirmBy) {
    redirect("/dashboard");
  }

  return (
    <RsvpExperience
      alreadySubmitted={status.rsvpStatus === "submitted"}
      confirmBy={confirmBy.toISOString()}
    />
  );
}
