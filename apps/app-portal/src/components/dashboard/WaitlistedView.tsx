import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import { secondaryActionClass, statCardClass } from "./styles";
import type { ApplicantStatus } from "../../lib/status/types";

type WaitlistedViewProps = {
  status: ApplicantStatus;
};

export default function WaitlistedView({ status }: WaitlistedViewProps): JSX.Element {
  return (
    <PortalShell
      aside={
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Questions?
          </p>
          <p>
            Email applications@hackbeanpot.com and we&apos;ll point you in the
            right direction.
          </p>
        </div>
      }
      description={
        <>
          You&apos;re on the waitlist. That means we liked your application and
          are keeping you in mind as spots open up.
        </>
      }
      eyebrow="Waitlist update"
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>You&apos;re on the waitlist</>}
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Current state
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">Waitlisted</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          We&apos;ll reach out if a spot opens up. In the meantime, thanks for
          taking the time to apply.
        </p>
      </div>
    </PortalShell>
  );
}
