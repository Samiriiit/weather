// utils/fetchWeather.ts
import { Forecast, WeatherApiResponse } from '../types/weather';

export async function fetchLiveWeather(city: string): Promise<Forecast[]> {
  try {
    const response = await fetch(
      `http://localhost:8080/weather-prediction?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WeatherApiResponse = await response.json();
    
    if (!data?.weatherResponse?.dayForecastList) {
      throw new Error("Invalid data format from API");
    }

    return data.weatherResponse.dayForecastList.flatMap(day => {
      return day.weatherForecastList.map(forecast => ({
        date: forecast.date,
        high: Math.round(forecast.temperatureHigh),
        low: Math.round(forecast.temperatureLow),
        currentTemp: Math.round(forecast.temperatureCurrent),
        feelsLike: Math.round(forecast.temperatureFeelsLike),
        wind: Math.round(forecast.windSpeed * 2.237), // Convert m/s to mph
        condition: forecast.weatherCondition,
        icon: forecast.icon,
        precipitationProbability: Math.round(forecast.precipitationProbability),
        humidity: forecast.humidity,
        pressure: forecast.pressure,
        rainTotal: forecast.rainTotal,
        advice: day.advice || ["No special advice for the day"]
      }));
    });
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    throw error;
  }
}