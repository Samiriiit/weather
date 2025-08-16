"use client"; // Next.js 13+: mark as client component

import React, { useState, useEffect } from 'react';
import ForecastCard from '../components/ForecastCard';
import { fetchLiveWeather } from '../utils/fetchWeather';
import { Forecast } from '../types/weather';
import CityInput from '../components/CityInput';
import {
  HomeContainer,
  Title,
  Controls,
  ErrorMessage,
  LoadingState,
  Spinner,
  NoData,
  StatusWrapper,
  StatusDot,
} from './Home.style';

const Home: React.FC = () => {
  const [city, setCity] = useState("Patna");
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [useMock, setUseMock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTrigger, setSearchTrigger] = useState(0);
//   const [isOnline, setIsOnline] = useState(true);

  const transformMockData = (mockData: any[]): Forecast[] =>
    mockData.map(item => ({
      date: item.date || new Date().toISOString().split('T')[0],
      high: item.high || 0,
      low: item.low || 0,
      currentTemp: item.currentTemp || Math.round(((item.high || 0) + (item.low || 0)) / 2),
      feelsLike: item.feelsLike || Math.round(((item.high || 0) + (item.low || 0)) / 2),
      wind: item.wind || 0,
      condition: item.condition || "Unknown",
      icon: item.icon || "01d",
      precipitationProbability: item.precipitationProbability || 0,
      humidity: item.humidity || 50,
      pressure: item.pressure || 1013,
      rainTotal: item.rainTotal,
      advice: item.advice || ["No special advice for the day"]
    }));

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    setSearchTrigger(prev => prev + 1);
  };

  const [isOnline, setIsOnline] = useState<boolean | null>(null); // null initially
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true); // component is now mounted
    if (typeof window === "undefined") return;
  
    // Initial value
    setIsOnline(navigator.onLine);
  
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
  
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return; // wait until mounted
  
  const loadData = async () => {
  setLoading(true);
  setError(null);

  const liveData = await fetchLiveWeather(city);

  if (liveData && liveData.length > 0) {
    setForecasts(liveData);
  } else {
    setForecasts([]);
    setError(
      typeof window !== 'undefined' && !navigator.onLine
        ? "⚠ Offline — no cached data available."
        : "⚠ Unable to load weather data."
    );
  }

  setLoading(false);
};
  
    const timer = setTimeout(loadData, 500);
    return () => clearTimeout(timer);
  }, [city, useMock, searchTrigger, isOnline, mounted]);
  

  return (
    <HomeContainer>
      <Title>🌦️ Weather Forecast</Title>

      <Controls>
        <CityInput onSearch={handleSearch} disabled={loading} initialCity={city} />
       {mounted && (<StatusWrapper>
    <StatusDot online={!!isOnline} />
    {isOnline ? "Online" : "Offline"}
    
  </StatusWrapper>)}
      </Controls>

      {!isOnline && <ErrorMessage>⚠ You are offline — showing cached data if available.</ErrorMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingState>
          <Spinner />
          <p>Loading weather data...</p>
        </LoadingState>
      ) : forecasts.length > 0 ? (
        <ForecastCard forecasts={forecasts} />
      ) : (
        <NoData>
          <p>No weather data available for {city}</p>
        </NoData>
      )}
    </HomeContainer>
  );
};

export default Home;
