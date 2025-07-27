// Importing React (required even if not directly used)
import React from 'react';

// Importing testing utilities
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Importing the component we are testing
import Home from '../pages/index'; 

// Mocking the fetchLiveWeather function from utils
jest.mock('../utils/fetchWeather', () => ({
  fetchLiveWeather: jest.fn(),
}));

// Importing the mocked function so we can control its behavior in tests
import { fetchLiveWeather } from '../utils/fetchWeather';

// Mocking CityInput component with a simple dropdown that can trigger city change
jest.mock('../components/CityInput', () => (props: any) => {
  return (
    <select
      data-testid="city-input"
      value={props.selectedCity}
      onChange={(e) => props.onCityChange(e.target.value)}
    >
      {props.cities.map((city: string) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
});

// Mocking ToggleModeOffline component with a simple button to toggle mode
jest.mock('../components/ToggleModeOffline', () => (props: any) => (
  <button data-testid="toggle-mode" onClick={props.toggleOffline}>
    {props.isOffline ? 'Mock Mode' : 'Live Mode'}
  </button>
));

// Mocking ForecastCard component to just show how many forecasts are passed
jest.mock('../components/ForecastCard', () => (props: any) => (
  <div data-testid="forecast-card">
    {props.forecasts.length} forecast(s) shown
  </div>
));

// Sample mock data (like a simplified version of mockForecastData.json)
const mockDataSample = [
  {
    city: 'Delhi',
    date: '2025-07-20',
    high: 40,
    low: 28,
    wind: 10,
    condition: 'Sunny',
  },
  {
    city: 'Mumbai',
    date: '2025-07-20',
    high: 35,
    low: 27,
    wind: 12,
    condition: 'Rainy',
  },
];

describe('Home component', () => {
  // This runs before every test — clears all mocks to avoid data carry-over
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: When useMock is true, the component should show mock data
  it('renders initial loading and shows mock data when useMock is true', async () => {
    // Force the component to use mock data for Delhi
    //jest.spyOn(object, 'functionName')
    jest.spyOn(require('../data/mockForecastData.json'), 'filter').mockReturnValueOnce(
      mockDataSample.filter(d => d.city === 'Delhi')
    );

    // Render the page component
    render(<Home />);

    // Check for loading message at first
    expect(screen.getByText(/loading weather/i)).toBeInTheDocument();

    // Wait for forecast card to appear with mock data
    await waitFor(() => {
      expect(screen.getByTestId('forecast-card')).toHaveTextContent('1 forecast(s) shown');
    });
  });

  // Test 2: When useMock is false, it should fetch live data using fetchLiveWeather
  it('fetches live weather data when useMock is false', async () => {
    // Mock API response with one forecast
    (fetchLiveWeather as jest.Mock).mockResolvedValueOnce([
      {
        date: '2025-07-20',
        high: 38,
        low: 26,
        wind: 8,
        condition: 'Cloudy',
      },
    ]);

    render(<Home />);

    // Wait for API call and forecast card to appear
    await waitFor(() => {
      expect(fetchLiveWeather).toHaveBeenCalledWith('Delhi');
      expect(screen.getByTestId('forecast-card')).toHaveTextContent('1 forecast(s) shown');
    });
  });

  // Test 3: Switching city from dropdown should fetch weather for new city
  it('switches city when dropdown changes', async () => {
    // Mock the fetch result when city changes
    (fetchLiveWeather as jest.Mock).mockResolvedValue([
      {
        date: '2025-07-21',
        high: 36,
        low: 24,
        wind: 7,
        condition: 'Clear',
      },
    ]);

    render(<Home />);

    // Change city to Mumbai
    fireEvent.change(screen.getByTestId('city-input'), { target: { value: 'Mumbai' } });

    // Wait for the new city's data to be fetched
    await waitFor(() => {
      expect(fetchLiveWeather).toHaveBeenCalledWith('Mumbai');
    });
  });

  // Test 4: Toggling between live and mock mode changes the mode and reloads data
  it('toggles between mock and live data mode', async () => {
    // Mock a live response
    (fetchLiveWeather as jest.Mock).mockResolvedValue([
      {
        date: '2025-07-22',
        high: 34,
        low: 23,
        wind: 9,
        condition: 'Windy',
      },
    ]);

    render(<Home />);

    const toggleBtn = screen.getByTestId('toggle-mode');

    // Initially, mode should be live
    expect(toggleBtn).toHaveTextContent('Live Mode');

    // Click to switch to mock mode
    fireEvent.click(toggleBtn);

    // After click, button should reflect the new mode
    expect(toggleBtn).toHaveTextContent('Mock Mode');

    // At this point, mock data should be shown (if component handles toggle state correctly)
  });

  // Test 5: If live API fails, the component should fallback to mock data
  it('shows fallback mock data on API error', async () => {
    // Make the API call fail
    (fetchLiveWeather as jest.Mock).mockRejectedValue(new Error('API failure'));

    render(<Home />);

    // Wait for fallback UI (forecast card) to still appear using mock data
    await waitFor(() => {
      expect(screen.getByTestId('forecast-card')).toBeInTheDocument();
    });
  });
});
