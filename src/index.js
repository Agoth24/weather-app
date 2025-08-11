import "./style.css";

const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
const weatherSection = document.querySelector(".weather-section");

form.addEventListener("submit", (e) => {
  const location = searchInput.value;
  e.preventDefault();
  if (location) {
    console.log(`Searching for weather in ${location}`);
    getWeatherInfo(location);
  }
});

async function getWeatherInfo(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=9MHVYPDZHDF6Q88W7JB5KUQVL&contentType=json`
  );
  const weatherData = await response.json();
  console.log(weatherData);
}

function parseWeatherData(data) {
  return {};
}
