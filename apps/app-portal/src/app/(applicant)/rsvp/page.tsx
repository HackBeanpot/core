import React from "react";
import { decisionDates } from "../../../lib/status/mock-singletons";
import { getApplicantStatus } from "../../../lib/status/service";
import ConfirmByCountdown from "../../../components/dashboard/ConfirmByCountdown";
import RsvpForm from "../../../components/dashboard/RsvpForm";

export default async function RsvpPage(): Promise<JSX.Element> {
  const status = await getApplicantStatus("mock-user");
  const isAdmitted = status.decisionStatus === "admitted";
  const isAfterConfirmBy = new Date() > decisionDates.confirmBy;
  const canRsvp = isAdmitted && !isAfterConfirmBy;

  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold">Post-acceptance RSVP</h1>
      <p className="mt-2">confirm your attendance.</p>
      <div className="mt-4">
        <ConfirmByCountdown confirmBy={decisionDates.confirmBy} />
      </div>

      {canRsvp ? (
        <RsvpForm />
      ) : (
        <p className="mt-6 text-gray-600">no RSVP available</p>
      )}
    </section>
  );
}
