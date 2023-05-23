import React, { useEffect, useState } from "react";
import "./index.css";
import datas from "../../../data/data.json";
import computerImg from "../../../assets/img/computer.png";

const Display = ({ input }) => {
  const [weather, setWeather] = useState("");
  const [weatherStatus, setWeatherStatus] = useState("");
  const [temp, setTemp] = useState();
  const [pressure, setPressure] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [country, setCountry] = useState("");
  const [isCity, setIsCity] = useState(false)
  const api_key = "f9130498316f20bd78ac535154dd9cd3";

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const renderError = () => {
    return <div className="error">
      {datas?.map(data => {
        if (data.type === "Not Found") {
          return (
            <div className="error-container">
              <div className="weather-img-container">
                <img
                  src={computerImg}
                  alt={data.type}
                  className="weather-img"
                />
              </div>
              <h2 className="weather-status">{data.type}</h2>
            </div>
          )
        }
      })}
    </div>;
  }

  const renderCityWeather = () => {
    return (
      <div>
        <h1>{capitalizeWords(input)}, {country}</h1>
        {datas?.map(data => {
          if (data.type === weather) {
            return (
              <div className="weather-img-container">
                <img
                  src={data.img}
                  alt={data.type}
                  className="weather-img"
                />
              </div>
            )
          }
        })}
        <h2 className="weather-status">{weatherStatus.charAt(0).toUpperCase() + weatherStatus.slice(1)}</h2>
        <h3 className="temp">{parseInt(temp).toFixed(2)}°C</h3>
        <div className="weather-info">
          <div className="weather-pressure">pressure: {pressure}</div>
          <div className="weather-humidity">humidity: {humidity}</div>
          <div className="weather-wind">wind speed: {wind}</div>
        </div>
      </div>
    )
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${api_key}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.length === 0) {
          setIsCity(false);
        } else {
          setIsCity(true);
          getCurrentCity(result[0].lat, result[0].lon);
        }
      })
      .catch((error) => console.log("error", error));
  }, [input]);

  const getCurrentCity = (lat, lon) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setWeather(result.weather[0].main)
        setWeatherStatus(result.weather[0].description)
        setTemp(result.main.temp - 273.15)
        setPressure(result.main.pressure)
        setHumidity(result.main.humidity)
        setWind(result.wind.speed)
        setCountry(result.sys.country)
      })
      .catch((error) => renderError);
  };

  return (
    <div className="display-container">
      {isCity ? renderCityWeather() : renderError()}

    </div>
  );
};

export default Display;
