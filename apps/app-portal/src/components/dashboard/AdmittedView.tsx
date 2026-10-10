import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import {
  //primaryActionClass,
  secondaryActionClass,
  statCardClass,
} from "./styles";
import type { ApplicantStatus } from "../../lib/status/types";

type AdmittedViewProps = {
  status: ApplicantStatus;
  rsvpAvailable: boolean;
};

export default function AdmittedView({
  status,
  rsvpAvailable,
}: AdmittedViewProps): JSX.Element {
  return (
    <PortalShell
      description={
        <>
          {rsvpAvailable
            ? "You're in. Go to RSVP so we can finalize your attendance details."
            : "You're in. RSVPs open once applications close — check back then."}
        </>
      }
      eyebrow="Admission decision"
      primaryAction={
        rsvpAvailable && (
          <Link
            className="text-blue-600 font-semibold hover:underline"
            href="/rsvp"
          >
            {status.rsvpStatus === "unconfirmed" ? "RSVP now" : "Edit RSVP"}
          </Link>
        )
      }
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>You&apos;re in!</>}
      tone="success"
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
              : rsvpAvailable
                ? "Please complete the RSVP form before the deadline."
                : "You'll be able to RSVP once applications close."}
        </p>
      </div>
    </PortalShell>
  );
}
