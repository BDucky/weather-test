import React, { useEffect, useState } from "react";
import "./index.css";
import data from "../../../data/data.json";

const Display = ({ input }) => {
  const api_key = "f9130498316f20bd78ac535154dd9cd3";
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

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
        setLat(result[0].lat.toFixed(2));
        setLon(result[0].lon.toFixed(2));
      })
      .catch((error) => console.log("error", error));
  }, [input]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}.99&appid=${api_key}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  }, [lat, lon]);

  //   console.log(data);
  console.log(lat, lon);

  return (
    <div className="display-container">
      <h1>{input}</h1>
    </div>
  );
};

export default Display;
