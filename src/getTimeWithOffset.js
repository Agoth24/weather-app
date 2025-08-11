export default function getTimeWithOffset(offsetHrs) {
  const now = new Date();
  let hours = now.getUTCHours() + offsetHrs;
  const minutes = now.getUTCMinutes().toString().padStart(2, 0);
  const suffix = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  return `${hours}:${minutes}${suffix}`;
}
