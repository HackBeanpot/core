"use client";

import ConfirmByCountdown from "./ConfirmByCountdown";
import RsvpForm from "./RsvpForm";

type RsvpExperienceProps = {
  confirmBy: string;
  alreadySubmitted: boolean;
};

export default function RsvpExperience({
  confirmBy,
  alreadySubmitted,
}: RsvpExperienceProps): JSX.Element {
  return (
    <div className="space-y-6">
      <ConfirmByCountdown confirmBy={confirmBy} />
      {alreadySubmitted && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          RSVP received. You can still update your details before the deadline.
        </div>
      )}
      <RsvpForm confirmBy={confirmBy} />
    </div>
  );
}
