import "./style.css";
import renderWeatherSection from "./renderWeatherSection";
import getIcon from "./getIcon";
import { celsiusToFahrenheit } from "./unitConverter";
import { fahrenheitToCelsius } from "./unitConverter";
import getTimeWithOffset from "./getTimeWithOffset";
let unit = "C";
let theme = 'light'


const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
form.addEventListener("submit", async (e) => {
  const location = searchInput.value;

  e.preventDefault();
  if (location) {
    console.log(`Searching for weather in ${location}`);
    const weatherData = await getWeatherInfo(location);
    if (weatherData) {
      renderWeatherSection(parseWeatherData(weatherData), unit);
    }
  }
  searchInput.value = ""
});

async function getWeatherInfo(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=9MHVYPDZHDF6Q88W7JB5KUQVL&contentType=json`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

function parseWeatherData(data) {
  const currentData = data.currentConditions;
  
  // Determine if it's day or night based on local time
  const localHour = getLocalHour(data.tzoffset);
  const isDaytime = localHour >= 5 && localHour < 20; // 6 AM to 6 PM is day
  
  // Set theme based on time
  setThemeBasedOnTime(isDaytime);
  
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
    currentConditions: currentData,
    isDaytime: isDaytime, // Add this for debugging
  };
}
// 
function getLocalHour(offsetHrs) {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const localHours = (utcHours + offsetHrs) % 24;
  return localHours < 0 ? localHours + 24 : localHours;
}

function setThemeBasedOnTime(isDaytime) {
  theme = isDaytime ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  console.log(`Theme set to: ${theme} (isDaytime: ${isDaytime})`);
}

function changeTheme() {
  theme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
}

// Apply theme on page load
document.documentElement.setAttribute('data-theme', theme);