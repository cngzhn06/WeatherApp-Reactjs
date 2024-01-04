import React, { useState } from "react";
import "./WeA.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const WeatherApp = () => {

  const [wicon, setWicon] = useState(cloud_icon);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const toKmPHour = (meterPerSec) => {
    return meterPerSec * 3.6;
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("🚀 ~ file: WeatherApp.jsx:24 ~ search ~ data:", data);

    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temprature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = toKmPHour(data.wind.speed).toFixed(2) + " km/h"; 
    const temperature = kelvinToCelsius(data.main.temp);
    if (temperature >= 8.5) {
      temprature[0].innerHTML = Math.ceil(temperature) + " °C"; 
    } else {
      temprature[0].innerHTML = Math.floor(temperature) + " °C"; 
    }
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  return (
    <>
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Merak Ettiğiniz Şehri Giriniz"
          />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24</div>
        <div className="weather-location">Ankara</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">%64</div>
              <div className="text">Nem</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Rüzgar Hızı</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
