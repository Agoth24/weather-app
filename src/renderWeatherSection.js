import temperatureIcon from './svgs/temperature-list-svgrepo-com.svg';
import rainIcon from './svgs/cloud-rain-svgrepo-com.svg';
import humidityIcon from './svgs/humidity-svgrepo-com.svg';
import uvIcon from './svgs/uv-index-svgrepo-com.svg';

export default function renderWeatherSection(weatherData, unit = "C") {
  const weatherSection = document.querySelector(".weather-section");
  weatherSection.replaceChildren(); // Clear previous content

  if (!weatherData || !weatherData.currentConditions) {
    const errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.textContent = "No weather data available.";
    weatherSection.appendChild(errorMessage);

    return weatherSection;
  }

  // The bulk of the function
  const {
    city,
    iconURL,
    time,
    description,
    conditions,
    temperature,
    feelsLike,
    pop,
    uvIndex,
    humidity,
  } = weatherData;

  const cityNameAndTime = document.createElement("div");
  const cityName = document.createElement("h2");
  cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1);
  cityName.classList.add("city-name");

  const cityTime = document.createElement("p");
  cityTime.textContent = time;
  cityTime.classList.add("time");

  cityNameAndTime.append(cityName, cityTime);

  const mainInfo = document.createElement("div");
  mainInfo.classList.add("main-info");

  const currentWeatherIcon = document.createElement("img");
  currentWeatherIcon.src = iconURL;
  currentWeatherIcon.classList.add("weather-icon");

  const currentTemp = document.createElement("p");
  currentTemp.textContent = `${temperature}°${unit}`;
  currentTemp.classList.add("current-temp");

  const conditionsText = document.createElement("p");
  conditionsText.textContent = conditions;
  conditionsText.classList.add("conditions");

  mainInfo.append(currentWeatherIcon, currentTemp, conditionsText);

  const descriptionText = document.createElement("p");
  descriptionText.textContent = description;
  descriptionText.classList.add("desc");

  const secondaryInfo = document.createElement("div");
  secondaryInfo.classList.add("secondary-info");

  // Create info groups
  const infoGroup = (label, iconSrc, value) => {
    const group = document.createElement("div");
    group.classList.add("info-group");

    const labelText = document.createElement("h3");
    labelText.textContent = label;

    const icon = document.createElement("img");
    icon.src = iconSrc;

    const valueText = document.createElement("p");
    valueText.textContent = value;

    group.append(labelText, icon, valueText);
    return group;
  };

  const feelsLikeGroup = infoGroup(
    "Feels Like",
    temperatureIcon,
    `${feelsLike}°${unit}`
  );

  const popGroup = infoGroup(
    "P.O.P.",
    rainIcon,
    `${pop}%`
  );
  const humidityGroup = infoGroup(
    "Humidity",
    humidityIcon,
    `${humidity}%`
  );
  const uvIndexGroup = infoGroup(
    "UV Index",
    uvIcon,
    `${uvIndex}`
  );

  secondaryInfo.append(feelsLikeGroup, popGroup, humidityGroup, uvIndexGroup);

  weatherSection.append(
    cityNameAndTime,
    mainInfo,
    descriptionText,
    secondaryInfo
  );

  return weatherSection;
}
