function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.location.name}</h2>

      <img
        src={weather.current.condition.icon}
        alt="Weather Icon"
      />

      <h3>{weather.current.temp_c}°C</h3>

      <p>{weather.current.condition.text}</p>

      <p>Humidity: {weather.current.humidity}%</p>

      <p>Wind: {weather.current.wind_kph} km/h</p>

      <p>Region: {weather.location.region}</p>

      <p>Country: {weather.location.country}</p>
    </div>
  );
}

export default WeatherCard;