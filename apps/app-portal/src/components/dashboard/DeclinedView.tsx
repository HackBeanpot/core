import React from "react";
import Link from "next/link";
import PortalShell from "./PortalShell";
import {
  primaryActionClass,
  secondaryActionClass,
  statCardClass,
} from "./styles";

export default function DeclinedView(): JSX.Element {
  return (
    <PortalShell
      aside={
        <div className="space-y-4 text-sm leading-6 text-slate-300">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
            Keep in touch
          </p>
          <p>
            The portal is still a good way to stay connected. We hope to see you
            next year.
          </p>
        </div>
      }
      description={
        <>
          We&apos;re sorry this cycle didn&apos;t work out. We appreciate your
          interest and hope you&apos;ll stay in the orbit for future events.
        </>
      }
      eyebrow="Decision update"
      primaryAction={
        <Link className={primaryActionClass} href="/">
          Join the mailing list
        </Link>
      }
      secondaryAction={
        <Link className={secondaryActionClass} href="/dashboard">
          Refresh status
        </Link>
      }
      title={<>We hope to see you next year</>}
    >
      <div className={statCardClass}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Next step
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-950">
          Stay connected for the next cycle
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          We&apos;ll keep sharing updates, and the mailing list is the easiest
          place to hear about the next application window.
        </p>
      </div>
    </PortalShell>
  );
}
