import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { formatPercentComplete } from "../../lib/status/format";
import {
  //primaryActionClass,
  secondaryActionClass,
  statCardClass,
} from "./styles";
import type { ApplicantStatus } from "../../lib/status/types";

type InProgressViewProps = {
  status: ApplicantStatus;
};

export default function InProgressView({
  status,
}: InProgressViewProps): JSX.Element {
  const progressPercent = status.applicationStatus === "incomplete" ? 60 : 100;

  return (
    <PortalShell
      aside={
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Status snapshot
          </p>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Current state</p>
            <p className="mt-2 text-2xl font-semibold text-black">
              {formatPercentComplete(progressPercent)}
            </p>
          </div>
          <p className="text-sm leading-6 text-slate-300"></p>
        </div>
      }
      description={<>You&apos;ve started your application.</>}
      eyebrow="Application draft"
      primaryAction={
        <Link className="text-blue-600 font-semibold hover:underline" href="/">
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
          This is a temporary completion value
        </p>
      </div>
    </PortalShell>
  );
}
