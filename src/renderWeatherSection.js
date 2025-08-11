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
  cityName.textContent = city;
  cityName.classList.add("city-name");

  const cityTime = document.createElement("p");
  cityTime.textContent = time;
  cityTime.classList.add("time");

  cityNameAndTime.append(cityName, cityTime);

  const mainInfo = document.createElement("div");
  mainInfo.classList.add("main-info");

  const icon = document.createElement("img");
  icon.src = iconURL;

  const currentTemp = document.createElement("p");
  currentTemp.textContent = `${temperature}°${unit}`;
  currentTemp.classList.add("current-temp");

  const conditionsText = document.createElement("p");
  conditionsText.textContent = conditions;
  conditionsText.classList.add("conditions");

  mainInfo.append(icon, currentTemp, conditionsText);

  const descriptionText = document.createElement("p");
  descriptionText.textContent = description;
  descriptionText.classList.add("desc");

  return weatherSection;
}
