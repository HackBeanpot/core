import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatLongDate } from "../../lib/status/format";
import {
  //primaryActionClass,
  secondaryActionClass,
  statCardClass,
} from "./styles";
import type { ApplicantStatus, DecisionDates } from "../../lib/status/types";

type AdmittedViewProps = {
  status: ApplicantStatus;
  decisionDates: DecisionDates;
};

export default function AdmittedView({
  status,
  decisionDates,
}: AdmittedViewProps): JSX.Element {
  return (
    <PortalShell
      aside={
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Confirm-by window
          </p>
          <p>
            RSVP before {formatLongDate(decisionDates.confirmBy)} to hold your
            spot.
          </p>
          <p>Next steps</p>
        </div>
      }
      description={
        <>
          You&apos;re in. Go to RSVP so we can finalize your attendance details.
        </>
      }
      eyebrow="Admission decision"
      primaryAction={
        <Link
          className="text-blue-600 font-semibold hover:underline"
          href="/rsvp"
        >
          {status.rsvpStatus === "unconfirmed" ? "RSVP now" : "Edit RSVP"}
        </Link>
      }
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>You&apos;re in!</>}
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          RSVP status
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">
          {status.rsvpStatus === "confirmed"
            ? "Confirmed"
            : status.rsvpStatus === "not-attending"
              ? "Not attending"
              : "Needs RSVP"}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {status.rsvpStatus === "confirmed"
            ? "Thanks for confirming your attendance."
            : status.rsvpStatus === "not-attending"
              ? "You've let us know you can't make it this time."
              : "Please complete the RSVP form before the deadline."}
        </p>
      </div>
    </PortalShell>
  );
}
