import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatPercentComplete } from "../../lib/status/format";
import { primaryActionClass, secondaryActionClass, statCardClass } from "./styles";
import type { ApplicantStatus } from "../../lib/status/types";

type InProgressViewProps = {
  status: ApplicantStatus;
};

export default function InProgressView({ status }: InProgressViewProps): JSX.Element {
  const progressPercent = status.applicationStatus === "in-progress" ? 42 : 100;

  return (
    <PortalShell
      aside={
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Status snapshot
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Current mock state</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {formatPercentComplete(progressPercent)}
            </p>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            We can wire a real completion tracker later. For now, the important
            part is giving applicants a clear path back into the draft.
          </p>
        </div>
      }
      description={
        <>
          You’ve started your application. Jump back in where you left off and
          keep moving toward submission.
        </>
      }
      eyebrow="Application draft"
      primaryAction={
        <Link className={primaryActionClass} href="/application">
          Continue application
        </Link>
      }
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>You&apos;ve started your application</>}
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Completion
        </p>
        <p className="mt-2 text-3xl font-semibold text-slate-950">
          {formatPercentComplete(progressPercent)}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This is a temporary completion value until the application sections are
          wired up.
        </p>
      </div>
    </PortalShell>
  );
}
