import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatPercentComplete } from "../../lib/status/format";
import {
  primaryActionClass,
  secondaryActionClass,
  statCardClass,
} from "./styles";
import type { ApplicantStatus } from "../../lib/status/types";

type InProgressViewProps = {
  status: ApplicantStatus;
  completionPercent: number;
};

export default function InProgressView({
  status: _status,
  completionPercent,
}: InProgressViewProps): JSX.Element {
  void _status;

  return (
    <PortalShell
      description={<>You&apos;ve started your application.</>}
      eyebrow="Application draft"
      // Refresh comes first so the main call to action sits on the right.
      primaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      secondaryAction={
        <Link className={primaryActionClass} href="/application">
          Continue application
        </Link>
      }
      title={<>You&apos;ve started your application</>}
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Completion
        </p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">
          {formatPercentComplete(completionPercent)}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Based on how many application questions you&apos;ve answered so far.
        </p>
      </div>
    </PortalShell>
  );
}
