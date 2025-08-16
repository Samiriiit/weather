// Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

// Mock children components to avoid rendering complexity
jest.mock('../components/ForecastCard', () => () => <div data-testid="forecast-card">ForecastCard</div>);
jest.mock('../components/CityInput', () => (props: any) => (
  <input
    data-testid="city-input"
    defaultValue={props.initialCity}
    onChange={(e) => props.onSearch(e.target.value)}
  />
));
jest.mock('../components/ToggleModeOffline', () => (props: any) => (
  <button data-testid="toggle-mode" onClick={props.toggleOffline}>
    {props.isOffline ? 'Offline' : 'Online'}
  </button>
));

// Mock fetch function
jest.mock('../utils/fetchWeather', () => ({
  fetchLiveWeather: jest.fn().mockResolvedValue([]),
}));

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).navigator.onLine = true;
  });

  it('renders title', () => {
    render(<Home />);
    expect(screen.getByText(/Weather Forecast/i)).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<Home />);
    expect(screen.getByText(/Loading weather data/i)).toBeInTheDocument();
  });

  it('renders no data message when no forecasts', async () => {
    render(<Home />);
    expect(await screen.findByText(/No weather data available/i)).toBeInTheDocument();
  });
});
