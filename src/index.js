import "./style.css";
import renderWeatherSection from "./renderWeatherSection";
import getIcon from "./getIcon";
import { celsiusToFahrenheit } from "./unitConverter"; 
import { fahrenheitToCelsius } from "./unitConverter";
import getTimeWithOffset from "./getTimeWithOffset";
let unit = 'C'


const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
form.addEventListener("submit", (e) => {
  const location = searchInput.value;
  e.preventDefault();
  if (location) {
    console.log(`Searching for weather in ${location}`);
    getWeatherInfo(location);
  }
});

async function getWeatherInfo(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=9MHVYPDZHDF6Q88W7JB5KUQVL&contentType=json`
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function parseWeatherData(data) {
    const currentData = data.currentConditions
  return {
    city: data.resolvedAddress,
    iconURL: getIcon(currentData.icon),
    time: getTimeWithOffset(data.tzoffset),
    description: data.description,
    conditions: currentData.conditions,
    temperature: currentData.temp,
    feelsLike: currentData.feelslike,
    pop: currentData.precipprob,
    uvIndex: currentData.uvindex,
    humidity: currentData.humidity,
  };
}

getWeatherInfo("toronto").then(weatherData => {if (weatherData) {
    console.log(parseWeatherData(weatherData))
}})
