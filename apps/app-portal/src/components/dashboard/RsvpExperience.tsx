"use client";

import React from "react";
import ConfirmByCountdown from "./ConfirmByCountdown";
import RsvpForm from "./RsvpForm";
import { SUPPORT_EMAIL } from "../../lib/config/site";
import type { RsvpSubmission } from "../../lib/status/rsvp";

type RsvpExperienceProps = {
  confirmBy: string;
  alreadySubmitted: boolean;
  attendingLocked: boolean;
  initialResponses: RsvpSubmission | null;
};

export default function RsvpExperience({
  confirmBy,
  alreadySubmitted,
  attendingLocked,
  initialResponses,
}: RsvpExperienceProps): JSX.Element {
  return (
    <div className="space-y-6 rounded-[1.5rem] bg-white p-6 text-slate-900">
      <ConfirmByCountdown confirmBy={confirmBy} />
      {alreadySubmitted && (
        <div className="rounded-3xl border border-emerald-200/30 bg-emerald-50/30 px-5 py-4 text-sm text-emerald-800">
          {attendingLocked
            ? `RSVP received. Attendance is locked this close to the event, but you can still update dietary restrictions, accessibility needs, and other details — email ${SUPPORT_EMAIL} if your plans have changed.`
            : "RSVP received. You can still update your details before the deadline."}
        </div>
      )}
      <RsvpForm
        alreadySubmitted={alreadySubmitted}
        attendingLocked={attendingLocked}
        initialValues={initialResponses ?? undefined}
      />
    </div>
  );
}
