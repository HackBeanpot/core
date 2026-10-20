import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatPercentComplete } from "../../lib/status/format";
import { primaryActionClass, statCardClass } from "./styles";
import type { ApplicantStatus } from "../../lib/status/types";

type InProgressViewProps = {
  status: ApplicantStatus;
  completionPercent: number;
};

export default function InProgressView({
  status,
  completionPercent,
}: InProgressViewProps): JSX.Element {
  // No applicant_data doc yet means they've never saved anything in the form.
  const hasStarted = status.applicationStatus !== "not-started";

  return (
    <PortalShell
      description={
        hasStarted ? (
          <>You&apos;ve started your application.</>
        ) : (
          <>You haven&apos;t started your application yet.</>
        )
      }
      eyebrow="Application draft"
      primaryAction={
        <Link className={primaryActionClass} href="/application">
          {hasStarted ? "Continue Application" : "Start Application"}
        </Link>
      }
      title={
        hasStarted ? (
          <>You&apos;ve started your application</>
        ) : (
          <>Start your application</>
        )
      }
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Completion
        </p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">
          {formatPercentComplete(completionPercent)}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Based on how many required questions you&apos;ve answered so far.
        </p>
      </div>
    </PortalShell>
  );
}
