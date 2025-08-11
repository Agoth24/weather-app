export default function renderWeatherSection(weatherData) {
  const weatherSection = document.querySelector(".weather-section");
  weatherSection.replaceChildren(); // Clear previous content

  if (!weatherData || !weatherData.currentConditions) {
    const errorMessage = document.createElement("p");

    errorMessage.className = "error-message";
    errorMessage.textContent = "No weather data available.";
    weatherSection.appendChild(errorMessage);

    return weatherSection;
  }

  const { city, time, description, conditions, temperature, feelsLike } = weatherData;

  return weatherSection;
}
