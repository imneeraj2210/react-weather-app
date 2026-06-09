import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = async (city) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );

  return response.data;
};

export const getWeatherByCoordinate = async (
  latitude,
  longitude
) => {

  console.log(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
  );

  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
  );

  return response.data;
};

export const getForecast = async (city) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
  );

  return response.data;
};  