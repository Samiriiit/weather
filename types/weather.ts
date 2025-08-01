// types/weather.ts
export interface Forecast {
    date: string;
    high: number;
    low: number;
    currentTemp: number;
    feelsLike: number;
    wind: number;
    condition: string;
    icon: string;
    precipitationProbability: number;
    humidity: number;
    pressure: number;
    rainTotal?: number;
    advice: string[];
  }
  
  export interface WeatherApiResponse {
    status: string;
    statusCode: string;
    weatherResponse: {
      dayForecastList: Array<{
        weatherForecastList: Array<{
          date: string;
          temperatureHigh: number;
          temperatureLow: number;
          temperatureCurrent: number;
          temperatureFeelsLike: number;
          precipitationProbability: number;
          visibility: number;
          windSpeed: number;
          cloudiness: number;
          humidity: number;
          pressure: number;
          rainTotal?: number;
          icon: string;
          weatherCondition: string;
        }>;
        advice: string[];
      }>;
      city: {
        name: string;
        country: string;
        timezone: number;
      };
    };
  }