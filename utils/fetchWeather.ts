import { Forecast, WeatherApiResponse } from '../types/weather';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const WEATHER_ENDPOINT = `${API_BASE_URL}/weather-prediction`;

async function apiCaller<T>(url: string, retries = 2): Promise<T> {
  let attempt = 0;
  let lastError: unknown;
  while (attempt <= retries) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
      attempt++;
      if (attempt > retries) break;
    }
  }
  throw lastError;
}

export async function fetchLiveWeather(city: string): Promise<Forecast[]> {
  const cacheKey = `weather_${city}`;
  const isBrowser = typeof window !== "undefined";

  const url = `${WEATHER_ENDPOINT}?city=${encodeURIComponent(city)}`;

  // 1️⃣ Try online first
  if (isBrowser && navigator.onLine) {
    try {
      const data = await apiCaller<WeatherApiResponse>(url);

      const days = data?.weatherResponse?.dayForecastList || [];
      const result: Forecast[] = days.flatMap((day) =>
        day.weatherForecastList.map((f) => ({
          date: f.date,
          high: Math.round(f.temperatureHigh),
          low: Math.round(f.temperatureLow),
          currentTemp: Math.round(f.temperatureCurrent),
          feelsLike: Math.round(f.temperatureFeelsLike),
          wind: Math.round(f.windSpeed * 2.237),
          condition: f.weatherCondition,
          icon: f.icon,
          precipitationProbability: Math.round(f.precipitationProbability),
          humidity: f.humidity,
          pressure: f.pressure,
          rainTotal: f.rainTotal,
          advice: day.advice || ["No special advice for the day"],
        }))
      );

      if (isBrowser) localStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    } catch (err) {
      console.warn("Online fetch failed, falling back to cache", err);
      const cached = isBrowser ? localStorage.getItem(cacheKey) : null;
      if (cached) return JSON.parse(cached);
      throw err; // nothing to fallback
    }
  }

  // 2️⃣ Offline → load from cache if available
  if (isBrowser) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log("Offline mode: loaded cached weather data");
      return JSON.parse(cached);
    }
  }

  throw new Error("Offline and no cached weather data available.");
}
