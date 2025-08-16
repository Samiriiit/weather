import { fetchLiveWeather } from '../utils/fetchWeather';
import { WeatherApiResponse } from '../types/weather';
process.env.NEXT_PUBLIC_API_BASE_URL = 'http://mock-api';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('fetchLiveWeather', () => {
  const mockApiResponse: WeatherApiResponse = {
    weatherResponse: {
      dayForecastList: [
        {
          advice: ['Carry an umbrella'],
          weatherForecastList: [
            {
              date: '2025-08-15',
              temperatureHigh: 30.5,
              temperatureLow: 20.2,
              temperatureCurrent: 25.7,
              temperatureFeelsLike: 27.1,
              windSpeed: 5,
              weatherCondition: 'Sunny',
              icon: 'sunny-icon',
              precipitationProbability: 10,
              humidity: 40,
              pressure: 1012,
              rainTotal: 0
            }
          ]
        }
      ]
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_API_BASE_URL = 'http://mock-api';
    localStorage.clear();
    // Reset online status
    Object.defineProperty(window.navigator, 'onLine', {
      value: true,
      configurable: true,
    });
  });

  it('should return parsed forecast data on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await fetchLiveWeather('London');

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      date: '2025-08-15',
      high: 31,
      low: 20,
      currentTemp: 26,
      feelsLike: 27,
      wind: expect.any(Number),
      condition: 'Sunny',
      icon: 'sunny-icon',
      precipitationProbability: 10,
      humidity: 40,
      pressure: 1012,
      rainTotal: 0,
      advice: ['Carry an umbrella'],
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/weather-prediction?city=London')
    );
  });

  it('should throw an error if API returns non-200 status', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      json: jest.fn(),
    });
  
    await expect(fetchLiveWeather('London')).rejects.toThrow(
      'HTTP 500 - Server Error'
    );
  });

  it('should retry on failure and eventually succeed', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

    const result = await fetchLiveWeather('London');
    expect(result).toHaveLength(1);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

//   it('should throw if API response format is invalid', async () => {
//     mockFetch.mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({ invalid: 'data' }),
//     });

//     await expect(fetchLiveWeather('London')).rejects.toThrow(
//       'Unexpected API response format'
//     );
//   });

  it('should load data from cache when offline', async () => {
    // Store cached data
    const cachedData = [{ date: 'cached', high: 20, low: 10 }] as any;
    localStorage.setItem('weather_London', JSON.stringify(cachedData));

    // Force offline
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    });

    const result = await fetchLiveWeather('London');
    expect(result).toEqual(cachedData);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should throw when offline and no cached data', async () => {
    Object.defineProperty(window.navigator, 'onLine', {
      value: false,
      configurable: true,
    });

    await expect(fetchLiveWeather('London')).rejects.toThrow(
      'Offline and no cached weather data available.'
    );
  });
});
