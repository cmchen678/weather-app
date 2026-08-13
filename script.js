"use strict";

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const location = formData.get("location-search");

  getWeatherData(location).then((data) => displayWeatherData(data));
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
    const currentHour = new Date().getHours();
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
      hours: [
        {
          icon: weatherData.days[0].hours[currentHour + 1].icon,
          temp: weatherData.days[0].hours[currentHour + 1].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 2].icon,
          temp: weatherData.days[0].hours[currentHour + 2].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 3].icon,
          temp: weatherData.days[0].hours[currentHour + 3].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 4].icon,
          temp: weatherData.days[0].hours[currentHour + 4].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 5].icon,
          temp: weatherData.days[0].hours[currentHour + 5].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 6].icon,
          temp: weatherData.days[0].hours[currentHour + 6].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 7].icon,
          temp: weatherData.days[0].hours[currentHour + 7].temp,
        },
        {
          icon: weatherData.days[0].hours[currentHour + 8].icon,
          temp: weatherData.days[0].hours[currentHour + 8].temp,
        },
      ],
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
