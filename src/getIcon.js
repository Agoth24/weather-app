export default function getIcon(iconCode) {
  const iconURL =
    "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/3rd%20Set%20-%20Color/";
  return `${iconURL + iconCode}.svg`;
}
