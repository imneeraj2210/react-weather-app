function Forecast({ forecastDays }) {
  return (
    <div className="forecast">
      <h2>3-Day Forecast</h2>

      {forecastDays.map((day) => (
        <div
          key={day.date}
          className="forecast-item"
        >
          <p> {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" } )}</p>

          <img
            src={day.day.condition.icon}
            alt="weather"
          />

          <p>
            {day.day.avgtemp_c}°C
          </p>
        </div>
      ))}
    </div>
  );
}

export default Forecast;