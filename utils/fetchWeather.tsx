import apiCaller from './apiCaller';
// Define a type for the Forecast data we want to return
export interface Forecast {
  city: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  wind: number;
}

// Define the structure of the API response (we only type what we use)
interface WeatherApiResponse {
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        maxwind_kph: number;
        condition: {
          text: string;
        };
      };
    }[];
  };
}

export async function fetchLiveWeather(city: string): Promise<Forecast[]> {
  // Get the API key securely from the .env file
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const endpoint = `/forecast.json?key=${API_KEY}&q=${city}&days=3`;

  //calling apiCaller
  const data = await apiCaller<any>(endpoint, 'GET');
  
  const res = await fetch(
    // Fetch weather for the next 3 days
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
  );

  // Map API data to our Forecast structure
  return data.forecast.forecastday.map((day:any) => ({
    city,
    date: day.date,
    high: Math.round(day.day.maxtemp_c), // Round temperature
    low: Math.round(day.day.mintemp_c),
    condition: day.day.condition.text,
    wind: Math.round(day.day.maxwind_kph / 1.6) // Convert km/h to mph
  }));
}
