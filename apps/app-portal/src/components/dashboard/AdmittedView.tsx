import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatLongDate } from "../../lib/status/format";
import { primaryActionClass, secondaryActionClass, statCardClass } from "./styles";
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
          <p>
            This is the branch where admitted applicants get a clear and urgent
            next step.
          </p>
        </div>
      }
      description={
        <>
          You&apos;re in. Celebrate for a second, then hop over to RSVP so we
          can finalize your attendance details.
        </>
      }
      eyebrow="Admission decision"
      primaryAction={
        <Link className={primaryActionClass} href="/rsvp">
          RSVP now
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
          {status.rsvpStatus === "submitted" ? "Confirmed" : "Needs RSVP"}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {status.rsvpStatus === "submitted"
            ? "Thanks for confirming your attendance."
            : "Please complete the RSVP form before the deadline."}
        </p>
      </div>
    </PortalShell>
  );
}
