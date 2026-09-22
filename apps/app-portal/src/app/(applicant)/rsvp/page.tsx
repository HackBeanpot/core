import React from "react";
import { redirect } from "next/navigation";
import { fetchPortalStatus } from "../../../lib/status/fetchPortalStatus";
import { getRsvpResponses } from "../../../lib/status/service";
import RsvpExperience from "../../../components/dashboard/RsvpExperience";

export const dynamic = "force-dynamic";

export default async function RsvpPage(): Promise<JSX.Element> {
  const { branch, status, decisionDates } = await fetchPortalStatus();
  const confirmBy = new Date(decisionDates.confirmBy);
  const isAfterConfirmBy = Date.now() > confirmBy.getTime();
  const alreadySubmitted = status.rsvpStatus !== "unconfirmed";

  // Never RSVP'd and the deadline has passed: the window is closed, nothing to edit.
  // Already RSVP'd: let them back in even past the deadline to update logistics details
  // (dietary restrictions, accessibility needs, etc.) — attendance itself gets locked
  // instead (see attendingLocked below and saveRsvp()'s server-side enforcement).
  if (branch !== "admitted" || (isAfterConfirmBy && !alreadySubmitted)) {
    redirect("/dashboard");
  }

  const initialResponses = alreadySubmitted
    ? await getRsvpResponses(status.userId)
    : null;

  return (
    <RsvpExperience
      alreadySubmitted={alreadySubmitted}
      attendingLocked={isAfterConfirmBy}
      confirmBy={confirmBy.toISOString()}
      initialResponses={initialResponses}
    />
  );
}
