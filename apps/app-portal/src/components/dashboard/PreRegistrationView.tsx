import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatCountdownLabel, formatLongDate } from "../../lib/status/format";
import {
  statCardClass,
  primaryActionClass,
  secondaryActionClass,
} from "./styles";
import type { DecisionDates } from "../../lib/status/types";

type PreRegistrationViewProps = {
  decisionDates: DecisionDates;
};

export default function PreRegistrationView({
  decisionDates,
}: PreRegistrationViewProps): JSX.Element {
  const registrationCountdown = formatCountdownLabel(
    decisionDates.registrationOpen,
  );

  return (
    <PortalShell
      aside={
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
              Next step
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Applications are opening soon.
            </h2>
          </div>
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <p>
              We’ll open the application on{" "}
              {formatLongDate(decisionDates.registrationOpen)}.
            </p>
            <p>
              The portal will switch automatically once registration is live.
            </p>
          </div>
        </div>
      }
      description={
        <>
          The dashboard is waiting for registration to open. In the meantime,
          we’re counting down the days and getting everything ready.
        </>
      }
      eyebrow="Application portal"
      primaryAction={
        <Link className={primaryActionClass} href="https://hackbeanpot.com">
          Learn more about HackBeanpot
        </Link>
      }
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>Applications open in {registrationCountdown}</>}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div className={statCardClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Opens
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {formatLongDate(decisionDates.registrationOpen)}
          </p>
        </div>
        <div className={statCardClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Decision date
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {formatLongDate(decisionDates.showDecision)}
          </p>
        </div>
        <div className={statCardClass}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Confirm by
          </p>
          <p className="mt-2 text-lg font-semibold text-slate-950">
            {formatLongDate(decisionDates.confirmBy)}
          </p>
        </div>
      </div>
    </PortalShell>
  );
}
