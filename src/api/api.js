const api_key = "f9130498316f20bd78ac535154dd9cd3";
const lat = "";
const lon = "";
const input = "London";

const getCurrentData = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}.99&appid=${api_key}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const getLatLon = () => {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${api_key}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
