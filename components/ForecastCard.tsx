import React from "react";


// type for the full forecast object
interface Forecast {
  date: string;
  high: number;
  low: number;
  wind: number;
  condition: string;
}

// smaller type for the props needed in getPredictions
interface WeatherConditions {
  high: number;
  wind: number;
  condition: string;
}

// helper function to return an emoji icon based on the weather condition.
const getIcon = (condition: string): string => {
  const c = condition.toLowerCase();

  if (c.includes("sun") || c.includes("clear")) return "☀️";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("fog")) return "☁️";
  if (c.includes("rain")) return "🌧️";
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("snow") || c.includes("cold")) return "❄️";
  if (c.includes("wind")) return "💨";

  return "❓"; // fallback
};

// Another helper function that generates safety or recommendation messages
// based on the weather condition (like high temperature, rain, wind, etc.)
const getPredictions = ({ high, wind, condition }: WeatherConditions): string[] => {
  const messages: string[] = [];
  // array is empty so if no condition matches then no alert is displayed
  if (high > 40) messages.push("Extreme Heat Warning 🌡️");
  if (condition.toLowerCase() === "rain") messages.push("Carry an Umbrella ☔");
  if (wind > 10) messages.push("Wind Alert 💨");
  if (condition.toLowerCase() === "thunderstorm") messages.push("Stay Indoors ⚡");
  return messages;
};

// Props type for ForecastCard component expecting an array of Forecasts
interface ForecastCardProps {
  forecasts: Forecast[];
}

const ForecastCard = ({ forecasts }: ForecastCardProps) => {
  // Define a functional React component named ForecastCard
  // It accepts one prop: forecasts (an array of weather data objects)
  return (
    // Container div that holds all forecast day cards
    <div className="forecast-card-enhanced">
      {/* Destructure the forecast object into individual values */}
      {forecasts.map(({ date, high, low, wind, condition }, idx) => (
        // 'key' helps React identify each element uniquely
        <div key={idx} className="forecast-day-enhanced">
          <div className="forecast-top-row">
            <div className="forecast-date-icon">
              <span className="forecast-date">📅 {date}</span>
              <span className="forecast-icon-big">{getIcon(condition)}</span>
            </div>
            <div className="forecast-temps">
              <span className="temp-high">🌡️ {high}°C</span>
              <span className="temp-low">❄️ {low}°C</span>
            </div>
          </div>
          <div className="forecast-details">
            <span className="forecast-condition">📝 {condition}</span>
            <span className="forecast-wind">💨 Wind: {wind} mph</span>
            <ul className="forecast-predictions">
              {/* Call getPredictions to get an array of alert strings,
                  Then use .map() to render each message inside a <li> */}
              {getPredictions({ high, wind, condition }).map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;
