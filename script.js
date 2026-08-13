"use strict";

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const location = formData.get("location-search");

  getWeatherData(location).then((data) => displayWeatherData(data));

  searchForm.reset();
});

const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=GSF8BJNKB4TS3XL6TGZP3BAF7`,
    );

    if (!response.ok) {
      throw new Error("Fetch request failed.");
    }

    const weatherData = await response.json();
    console.log(weatherData);

    const processedWeatherData = await {
      location: weatherData.resolvedAddress,
      description: weatherData.description,
      temp: weatherData.currentConditions.temp,
      humidity: weatherData.currentConditions.humidity,
      precipprob: weatherData.currentConditions.precipprob,
      wind: weatherData.currentConditions.windspeed,
      condition: weatherData.currentConditions.conditions,
      icon: weatherData.currentConditions.icon,
      days: [
        {
          date: weatherData.days[1].datetime,
          temp: weatherData.days[1].temp,
          condition: weatherData.days[1].conditions,
          icon: weatherData.days[1].icon,
        },
        {
          date: weatherData.days[2].datetime,
          temp: weatherData.days[2].temp,
          condition: weatherData.days[2].conditions,
          icon: weatherData.days[2].icon,
        },
        {
          date: weatherData.days[3].datetime,
          temp: weatherData.days[3].temp,
          condition: weatherData.days[3].conditions,
          icon: weatherData.days[3].icon,
        },
        {
          date: weatherData.days[4].datetime,
          temp: weatherData.days[4].temp,
          condition: weatherData.days[4].conditions,
          icon: weatherData.days[4].icon,
        },
        {
          date: weatherData.days[5].datetime,
          temp: weatherData.days[5].temp,
          condition: weatherData.days[5].conditions,
          icon: weatherData.days[5].icon,
        },
        {
          date: weatherData.days[5].datetime,
          temp: weatherData.days[5].temp,
          condition: weatherData.days[5].conditions,
          icon: weatherData.days[5].icon,
        },
        {
          date: weatherData.days[6].datetime,
          temp: weatherData.days[6].temp,
          condition: weatherData.days[6].conditions,
          icon: weatherData.days[6].icon,
        },
      ],
    };
    return processedWeatherData;
  } catch (error) {
    console.log(error);
  }
};

const displayWeatherData = (data) => {
  const container = document.querySelector(".container");
  container.innerHTML = "";

  displayCurrentWeather(data);
  displayWeeklyWeather(data);
};

const displayCurrentWeather = (data) => {
  const container = document.querySelector(".container");
  const currentWeatherContainer = document.createElement("div");
  currentWeatherContainer.classList.add("current-weather-container");

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = data.description;

  const temp = document.createElement("p");
  temp.classList.add("current-temp");
  temp.textContent = `${Math.round(data.temp)}°`;

  const condition = document.createElement("p");
  condition.classList.add("current-condition");
  condition.textContent = data.condition;

  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = data.location;

  const miscInfoContainer = document.createElement("ul");
  miscInfoContainer.classList.add("misc-info-container");

  const precip = document.createElement("li");
  const precipLabel = document.createElement("p");
  precipLabel.textContent = "Precipitation";
  const precipProb = document.createElement("p");
  precipProb.textContent = `${Math.round(data.precipprob)}%`;
  precip.append(precipLabel, precipProb);

  const humidity = document.createElement("li");
  const humidityLabel = document.createElement("p");
  humidityLabel.textContent = "Humidity";
  const humidityPercent = document.createElement("p");
  humidityPercent.textContent = `${Math.round(data.humidity)}%`;
  humidity.append(humidityLabel, humidityPercent);

  const wind = document.createElement("li");
  const windLabel = document.createElement("p");
  windLabel.textContent = "Wind";
  const windSpeed = document.createElement("p");
  windSpeed.textContent = `${data.wind} mph`;
  wind.append(windLabel, windSpeed);

  miscInfoContainer.append(precip, humidity, wind);

  currentWeatherContainer.append(
    description,
    temp,
    condition,
    location,
    miscInfoContainer,
  );
  container.append(currentWeatherContainer);
};

const displayWeeklyWeather = (data) => {
  const container = document.querySelector(".container");
  const weeklyWeatherContainer = document.createElement("div");
  weeklyWeatherContainer.classList.add("weekly-weather-container");
  const daysList = document.createElement("ul");
  daysList.classList.add("days-list");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date().getDay();
  console.log(days[today]);

  for (let i = 1; i <= 7; i++) {
    const day = document.createElement("li");
    day.classList.add("day");

    const dayName = document.createElement("p");
    dayName.classList.add("day-name");
    dayName.textContent = days[(today + i) % 7];

    const temp = document.createElement("p");
    temp.textContent = `${Math.round(data.days[i - 1].temp)}°`;

    const condition = document.createElement("p");
    condition.textContent = data.days[i - 1].condition;

    day.append(dayName, temp, condition);
    daysList.append(day);
  }

  weeklyWeatherContainer.append(daysList);
  container.append(weeklyWeatherContainer);
};
