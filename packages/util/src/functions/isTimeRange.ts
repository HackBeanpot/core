export default function isTimeRange(range: string, currentTime: Date) {
  const regex =
    /(\w+) (\d{1,2}\/\d{1,2}): (\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M)/;

  const match = range.match(regex);
  if (match) {
    const date = match[2];
    const startTimeString = match[3];
    const endTimeString = match[4];

    const year = new Date().getFullYear();
    const dateStartString = `${date}/${year} ${startTimeString}`;
    const dateEndString = `${date}/${year} ${endTimeString}`;

    const startTime = new Date(dateStartString);
    const endTime = new Date(dateEndString);

    return currentTime >= startTime && currentTime <= endTime;
  }

  const simpleMatch = range.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
  if (simpleMatch) {
    const startHour = Number(simpleMatch[1]);
    const startMinute = Number(simpleMatch[2]);
    const endHour = Number(simpleMatch[3]);
    const endMinute = Number(simpleMatch[4]);

    const start = new Date(currentTime);
    start.setHours(startHour, startMinute, 0, 0);
    const end = new Date(currentTime);
    end.setHours(endHour, endMinute, 0, 0);

    if (end < start) {
      return currentTime >= start || currentTime <= end;
    }

    return currentTime >= start && currentTime <= end;
  }

  return false;
}
