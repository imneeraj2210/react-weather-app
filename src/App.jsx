import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeather, 
        getWeatherByCoordinate, 
        getForecast } from "./services/weatherService";
import "./App.css";
import Forecast from "./components/Forecast";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] =
  useState(() => {
    return JSON.parse(
      localStorage.getItem("darkMode")
    ) || false;
  });

  
  const toggleTheme = () => {
  setDarkMode(!darkMode);
};
  
  // Load search history when app starts
  // useEffect

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("weatherHistory")) || [];

    setHistory(savedHistory);
  }, []);
useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}, [darkMode]);


  // Search by city

  const handleSearch = async (city) => {
    console.log("Searching:", city);

    try {
      setLoading(true);
      setError("");

      const [weatherData, forecastData] =
  await Promise.all([
    getWeather(city),
    getForecast(city)
  ]);

setWeather(weatherData);

setForecast(
  forecastData.forecast.forecastday
);
      // Update history
      const updatedHistory = [
        city,
        ...history.filter(
          (item) => item.toLowerCase() !== city.toLowerCase()
        ),
      ].slice(0, 5);

      setHistory(updatedHistory);

      localStorage.setItem(
        "weatherHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error(error);

      setError("City not found!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Search by location

 const handleCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        setLoading(true);
        setError("");

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

       const data =
  await getWeatherByCoordinate(
    latitude,
    longitude
  );

setWeather(data);
setError("");
      } catch (error) {
        console.error("Location Error:", error);

        setError("Unable to fetch location weather");
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      console.error("Geolocation Error:", error);

      setError("Location permission denied");
    }
  );
};

  //jsx

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <h1>Weather App</h1>
      <button className="theme-btn" onClick={toggleTheme} >
  {darkMode
    ? "☀️ Light Mode"
    : "🌙 Dark Mode"}
</button>
      <SearchBar onSearch={handleSearch} />

      <button className="location-btn" onClick={handleCurrentLocation}>
      📍 Use My Location
      </button>
      {history.length > 0 && (
        <div className="history">
          <h3>Recent Searches</h3>

          {history.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSearch(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

     {weather && <WeatherCard weather={weather} />}

{forecast.length > 0 && (
  <Forecast forecastDays={forecast} />
)}
    </div>
  );
}

export default App;