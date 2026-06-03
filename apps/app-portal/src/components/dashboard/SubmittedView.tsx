import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatLongDate } from "../../lib/status/format";
import { primaryActionClass, secondaryActionClass, statCardClass } from "./styles";
import type { ApplicantStatus, DecisionDates } from "../../lib/status/types";

type SubmittedViewProps = {
  status: ApplicantStatus;
  decisionDates: DecisionDates;
};

export default function SubmittedView({
  status,
  decisionDates,
}: SubmittedViewProps): JSX.Element {
  const isRegistrationOpen = Date.now() >= decisionDates.registrationOpen.getTime();

  return (
    <PortalShell
      aside={
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            What happens next
          </p>
          <p>
            The team is reviewing applications and will share decisions on {formatLongDate(decisionDates.showDecision)}.
          </p>
          <p>
            Keep an eye on your inbox. When decisions are live, this page will
            switch over automatically.
          </p>
        </div>
      }
      description={
        <>
          We&apos;ve received your application and you&apos;re officially in the
          review queue.
        </>
      }
      eyebrow="Application submitted"
      primaryAction={
        <Link className={primaryActionClass} href={isRegistrationOpen ? "/application" : "/dashboard"}>
          {isRegistrationOpen ? "Edit application" : "Back to dashboard"}
        </Link>
      }
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>We&apos;ve received your application</>}
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Review date
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">
          {formatLongDate(decisionDates.showDecision)}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {status.rsvpStatus === "submitted"
            ? "You&apos;ve already completed post-acceptance RSVP steps."
            : "Your application is ready for the next review stage."}
        </p>
      </div>
    </PortalShell>
  );
}
