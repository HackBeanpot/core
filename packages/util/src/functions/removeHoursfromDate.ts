export default function removeHoursFromDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
