export default function getIcon(iconCode) {
  const iconURL =
    "https://github.com/visualcrossing/WeatherIcons/blob/main/SVG/3rd%20Set%20-%20Color/";
  return `${iconURL + iconCode}.svg`;
}
