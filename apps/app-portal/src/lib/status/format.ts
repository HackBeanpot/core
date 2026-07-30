export function formatLongDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCountdownLabel(target: string | Date): string {
  const targetDate = typeof target === "string" ? new Date(target) : target;
  const diff = targetDate.getTime() - Date.now();

  if (diff <= 0) {
    return "Deadline passed";
  }

  const totalMinutes = Math.ceil(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"}, ${hours} hour${
      hours === 1 ? "" : "s"
    } left`;
  }

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}, ${minutes} minute${
      minutes === 1 ? "" : "s"
    } left`;
  }

  return `${minutes} minute${minutes === 1 ? "" : "s"} left`;
}

export function formatPercentComplete(value: number): string {
  return `${Math.max(0, Math.min(100, value))}% complete`;
}
