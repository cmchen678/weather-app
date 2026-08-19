"use strict";

let currentLocation;
let unitGroup = "us";

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  currentLocation = formData.get("location-search");

  getWeatherData().then((data) => displayWeatherData(data));

  searchForm.reset();
});

const getWeatherData = async () => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentLocation}?unitGroup=${unitGroup}&key=GSF8BJNKB4TS3XL6TGZP3BAF7`,
    );

    if (!response.ok) {
      throw new Error("Fetch request failed.");
    }

    const weatherData = await response.json();
    console.log(weatherData);

    const processedWeatherData = await {
      location: weatherData.resolvedAddress,
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
  const content = document.querySelector(".content");
  content.innerHTML = "";

  displayCurrentWeather(data);
  displayWeeklyWeather(data);
};

const displayCurrentWeather = (data) => {
  const content = document.querySelector(".content");
  const currentWeatherContainer = document.createElement("div");
  currentWeatherContainer.classList.add("current-weather-container");

  const tempContainer = document.createElement("div");
  tempContainer.classList.add("current-temp");
  const temp = document.createElement("p");
  temp.textContent = Math.round(data.temp);
  temp.style.fontSize = "64px";
  const fahrenheit = document.createElement("span");
  fahrenheit.classList.add("fahrenheit");
  fahrenheit.textContent = "°F |";
  const celsius = document.createElement("span");
  celsius.classList.add("celsius");
  celsius.textContent = "°C";

  if (unitGroup === "us") {
    fahrenheit.classList.remove("unactive");
    celsius.classList.add("unactive");
    celsius.addEventListener("click", () => {
      unitGroup = "metric";
      getWeatherData().then((data) => displayWeatherData(data));
    });
  } else if (unitGroup === "metric") {
    celsius.classList.remove("unactive");
    fahrenheit.classList.add("unactive");
    fahrenheit.addEventListener("click", () => {
      unitGroup = "us";
      getWeatherData().then((data) => displayWeatherData(data));
    });
  }

  tempContainer.append(temp, fahrenheit, celsius);

  const condition = document.createElement("p");
  condition.classList.add("current-condition");
  condition.textContent = data.condition;

  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = data.location;

  const miscInfoList = document.createElement("ul");
  miscInfoList.classList.add("misc-info-list");

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
  if (unitGroup === "us") {
    windSpeed.textContent = `${data.wind} mph`;
  } else if (unitGroup === "metric") {
    windSpeed.textContent = `${data.wind} km/h`;
  }
  wind.append(windLabel, windSpeed);

  miscInfoList.append(precip, humidity, wind);

  currentWeatherContainer.append(
    location,
    tempContainer,
    condition,
    miscInfoList,
  );
  content.append(currentWeatherContainer);
};

const displayWeeklyWeather = (data) => {
  const content = document.querySelector(".content");
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

  for (let i = 1; i <= 7; i++) {
    const day = document.createElement("li");
    day.classList.add("day");

    const iconID = data.days[i - 1].icon;
    const iconUrl = `./icons/${iconID}.svg`;
    const icon = document.createElement("img");
    icon.src = iconUrl;
    icon.alt = data.days[i - 1].condition;

    const dayNameAndConditionBox = document.createElement("div");

    const dayName = document.createElement("p");
    dayName.classList.add("day-name");
    dayName.textContent = days[(today + i) % 7];

    const condition = document.createElement("p");
    condition.textContent = data.days[i - 1].condition;
    condition.style.fontSize = "16px";
    condition.style.color = "gray";

    dayNameAndConditionBox.append(dayName, condition);

    const temp = document.createElement("p");
    if (unitGroup === "us") {
      temp.textContent = `${Math.round(data.days[i - 1].temp)}°F`;
    } else if (unitGroup === "metric") {
      temp.textContent = `${Math.round(data.days[i - 1].temp)}°C`;
    }

    day.append(icon, dayNameAndConditionBox, temp);
    daysList.append(day);
  }

  weeklyWeatherContainer.append(daysList);
  content.append(weeklyWeatherContainer);
};
