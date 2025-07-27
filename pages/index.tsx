import React, { useState, useEffect } from "react";
import ForecastCard from "../components/ForecastCard"; // Component to show 3-day forecast
import mockData from "../data/mockForecastData.json";  // Local mock data
import { fetchLiveWeather } from "../utils/fetchWeather"; // Function to fetch live API weather
import ToggleModeOffline from "../components/ToggleModeOffline"; // Presentational component
import CityInput from "../components/CityInput"; // Presentational component

// Define the shape of a forecast object
interface Forecast {
  date: string;
  high: number;
  low: number;
  wind: number;
  condition: string;
  city?: string; // city is only in mockData
}

const Home = () => {
  // State to track selected city, forecast data, data source, and loading status
  const [city, setCity] = useState<string>("Delhi");
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [useMock, setUseMock] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Effect hook to load forecast data when city or data mode changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Show loading while fetching

      try {
        if (useMock) {
          // Load mock data for selected city
          const filtered = mockData.filter((item: Forecast) => item.city === city);
          setForecasts(filtered); //connecting the data with the forecast card
        } else {
          // Fetch live weather data for selected city
          const liveData = await fetchLiveWeather(city);
          setForecasts(liveData);
        }
      } catch (err) {
        // If live fetch fails, fallback to mock data
        console.error("Error loading data:", err);
        const fallback = mockData.filter((item: Forecast) => item.city === city);
        setForecasts(fallback);
        setUseMock(true); // Auto-switch to mock mode
      } finally {
        setLoading(false); // Hide loading once data is ready
      }
    };

    loadData(); // Run data fetch function
  }, [city, useMock]); // Re-run when city or mode changes

  // Extract unique city names from mock data for dropdown
  const uniqueCities = [...new Set(mockData.map((d: Forecast) => d.city))] as string[];

  return (
    <div className="home-container">
      <h1 className="title">🌦️ India Weather Forecast</h1>

      <div className="controls">
        {/* City input dropdown */}
        <CityInput cities={uniqueCities} selectedCity={city} onCityChange={setCity} />

        {/* Toggle between live and mock data */}
        <ToggleModeOffline
          isOffline={useMock}
          toggleOffline={() => setUseMock((prev) => !prev)}
        />
      </div>

      {/* Show loading state or weather data */}
      {loading ? (
        <p>Loading weather...</p>
      ) : (
        <ForecastCard forecasts={forecasts} />
      )}
    </div>
  );
};


export default Home;
