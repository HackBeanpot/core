import React from "react";

type ConfirmByCountdownProps = {
  confirmBy: Date;
};

export default function ConfirmByCountdown({
  confirmBy,
}: ConfirmByCountdownProps): JSX.Element {
  const isClosed = new Date() > confirmBy;
  let disabledLabel = "no";

  if (isClosed) {
    disabledLabel = "yes";
  }

  return (
    <div>
      <div>RSVP deadline: {String(confirmBy)}</div>
      <div>RSVP form disabled: {disabledLabel}</div>
    </div>
  );
}
