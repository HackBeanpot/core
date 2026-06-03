import React from "react";
import useConfirmByCountdown from "./useConfirmByCountdown";

type ConfirmByCountdownProps = {
  confirmBy: string;
};

export default function ConfirmByCountdown({
  confirmBy,
}: ConfirmByCountdownProps): JSX.Element {
  const { expired, label } = useConfirmByCountdown(confirmBy);

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        Confirm-by deadline
      </div>
      <div className="mt-2 text-base font-medium text-slate-950">
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-500">
        {expired ? "RSVP is closed." : "The form updates every minute."}
      </div>
    </div>
  );
}
