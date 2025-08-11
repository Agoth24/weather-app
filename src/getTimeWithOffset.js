export default function getTimeWithOffset(offsetHrs) {
  const now = new Date();
  let hours = Math.floor(now.getUTCHours() + offsetHrs);
  hours = ((hours % 24) + 24) % 24; // ensure hours is in 0-23 range
  const minutes = now.getUTCMinutes().toString().padStart(2, 0);
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes}${suffix}`;
}
