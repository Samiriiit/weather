// importing the function (fetchLiveWeather) and the Forecast type
import { fetchLiveWeather, Forecast } from '../utils/fetchWeather';

// Importing the real API calling function 
import apiCaller from '../utils/apiCaller';

// this line tells Jest: “use a fake/mock version instead.”
jest.mock('./apiCaller');

// This helps TypeScript understand that our mocked apiCaller can use special mock methods
const mockedApiCaller = apiCaller as jest.MockedFunction<typeof apiCaller>;

// Grouping all tests related to fetchLiveWeather into one describe block
describe('fetchLiveWeather', () => {
  const fakeCity = 'Delhi'; // Just a sample city to test with

  // Before each test runs, reset all mocks and set a fake API key
  beforeEach(() => {
    jest.resetAllMocks(); // Clear previous mock data
    process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'dummy_key'; // Fake API key for testing
  });

  // TC1: Check if fetchLiveWeather returns the correct weather info
  it('fetches and maps weather data correctly', async () => {
    // Telling the fake apiCaller to return fake weather data when called
    mockedApiCaller.mockResolvedValue({
      forecast: {
        forecastday: [
          {
            date: '2025-07-19',
            day: {
              maxtemp_c: 42.3,
              mintemp_c: 30.2,
              maxwind_kph: 20,
              condition: { text: 'Sunny' }
            }
          },
          {
            date: '2025-07-20',
            day: {
              maxtemp_c: 38.1,
              mintemp_c: 28.4,
              maxwind_kph: 15,
              condition: { text: 'Rain' }
            }
          }
        ]
      }
    });

    // Actually calling the fetchLiveWeather function with our test city
    const result: Forecast[] = await fetchLiveWeather(fakeCity);

    // Checking, did the function call apiCaller with a URL that includes the city name
    expect(mockedApiCaller).toHaveBeenCalledWith(
      expect.stringContaining(`q=${fakeCity}`),
      'GET'
    );

    // Check if it returns the data in the correct format or not
    expect(result).toEqual([
      {
        city: fakeCity,
        date: '2025-07-19',
        high: 42,
        low: 30,
        condition: 'Sunny',
        wind: Math.round(20 / 1.6) // converting km/h to mph
      },
      {
        city: fakeCity,
        date: '2025-07-20',
        high: 38,
        low: 28,
        condition: 'Rain',
        wind: Math.round(15 / 1.6)
      }
    ]);
  });

  //TC2: Check what happens if the API key is missing
  it('throws error when API key is missing', async () => {
    // Remove the API key to simulate a missing key
    delete process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    // Now the function should throw an error when we try to call it
    await expect(fetchLiveWeather(fakeCity)).rejects.toThrow(
      'API key not found in environment variables'
    );
  });

  // TC3: Check what happens when the API call fails
  it('throws error when apiCaller fails', async () => {
    // Tell the mock API to fail and throw an error
    mockedApiCaller.mockRejectedValue(new Error('API failed'));

    // The fetchLiveWeather function should now also throw that error
    await expect(fetchLiveWeather(fakeCity)).rejects.toThrow('API failed');
  });
});
