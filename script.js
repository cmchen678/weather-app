"use strict";

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const location = formData.get("location-search");

  getWeatherData(location).then((data) => console.log(data));
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

const displayWeatherData = (data) => {};
