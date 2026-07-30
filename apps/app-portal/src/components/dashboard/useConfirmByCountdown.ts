"use client";

import { useEffect, useMemo, useState } from "react";

function getTimeState(target: Date) {
  const remaining = target.getTime() - Date.now();

  if (remaining <= 0) {
    return { expired: true, label: "Deadline passed" };
  }

  const totalMinutes = Math.ceil(remaining / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return {
      expired: false,
      label: `${days} day${days === 1 ? "" : "s"}, ${hours} hour${
        hours === 1 ? "" : "s"
      } left`,
    };
  }

  if (hours > 0) {
    return {
      expired: false,
      label: `${hours} hour${hours === 1 ? "" : "s"}, ${minutes} minute${
        minutes === 1 ? "" : "s"
      } left`,
    };
  }

  return {
    expired: false,
    label: `${minutes} minute${minutes === 1 ? "" : "s"} left`,
  };
}

export default function useConfirmByCountdown(confirmBy: string | Date) {
  const targetDate = useMemo(
    () => (typeof confirmBy === "string" ? new Date(confirmBy) : confirmBy),
    [confirmBy],
  );
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    const update = () => setTick(Date.now());
    update();

    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  const state = getTimeState(targetDate);

  return {
    expired: state.expired,
    label: state.label,
    tick,
  };
}
