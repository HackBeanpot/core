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
}
