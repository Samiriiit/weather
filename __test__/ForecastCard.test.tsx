// Importing React (required in some setups even if not directly used here)
import React from 'react';

// Importing testing utilities from React Testing Library
import { render, screen } from '@testing-library/react';

// Importing the component we want to test
import ForecastCard from '../components/ForecastCard'; 

// Grouping all tests related to the ForecastCard component
describe('ForecastCard component', () => {

  // 🔹 Sample forecast data we'll pass into the component for testing
  const sampleForecasts = [
    {
      date: '2025-07-19',
      high: 42, // high temp
      low: 30,  // low temp
      wind: 12, // wind speed in mph
      condition: 'Thunderstorm', // weather condition
    },
    {
      date: '2025-07-20',
      high: 25,
      low: 18,
      wind: 8,
      condition: 'Clear',
    },
  ];

  // Test Case 1: Make sure the correct number of forecast day cards are shown
  it('renders the correct number of forecast days', () => {
    // Render the component with sample forecast data
    render(<ForecastCard forecasts={sampleForecasts} />);
    
    // Look for elements that contain the 📅 emoji (assuming this represents each forecast card's date)
    const dayCards = screen.getAllByText(/📅/i);

    // Check if the number of rendered 📅 cards equals the number of forecast entries
    expect(dayCards.length).toBe(sampleForecasts.length);
  });

  // Test Case 2: Make sure the date and corresponding weather icon (emoji) is shown
  it('displays the date and weather icons correctly', () => {
    render(<ForecastCard forecasts={sampleForecasts} />);

    // Loop through each forecast item to check if the correct data and icon are shown
    sampleForecasts.forEach(({ date, condition }) => {
      // Check if the forecast date is present in the document
      expect(screen.getByText(new RegExp(date))).toBeInTheDocument();

      // Determine which icon should be shown based on the weather condition
      let expectedIcon = '❓'; // default fallback icon
      const c = condition.toLowerCase();

      if (c.includes('sun') || c.includes('clear')) expectedIcon = '☀️';
      else if (c.includes('cloud') || c.includes('fog')) expectedIcon = '☁️';
      else if (c.includes('rain')) expectedIcon = '🌧️';
      else if (c.includes('thunder')) expectedIcon = '⛈️';
      else if (c.includes('snow') || c.includes('cold')) expectedIcon = '❄️';
      else if (c.includes('wind')) expectedIcon = '💨';

      // Check if the correct icon is shown
      expect(screen.getByText(expectedIcon)).toBeInTheDocument();
    });
  });

  // Test Case 3: Make sure detailed weather info is shown, like temp, wind, condition, and alerts
  it('displays weather details including temperature, condition, wind, and predictions', () => {
    render(<ForecastCard forecasts={sampleForecasts} />);

    sampleForecasts.forEach(({ high, low, condition, wind }) => {
      // Check if high and low temperatures are shown
      expect(screen.getByText(new RegExp(`${high}°C`))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${low}°C`))).toBeInTheDocument();

      // Check if the condition text (e.g., "Clear", "Thunderstorm") is shown
      expect(screen.getByText(new RegExp(condition))).toBeInTheDocument();

      // Check if wind speed in mph is shown
      expect(screen.getByText(new RegExp(`${wind} mph`))).toBeInTheDocument();

      // Additional predictions based on data (like alerts or advice messages)
      
      if (high > 40)
        expect(screen.getByText(/Extreme Heat Warning/i)).toBeInTheDocument();

      if (condition.toLowerCase() === 'rain')
        expect(screen.getByText(/Carry an Umbrella/i)).toBeInTheDocument();

      if (wind > 10)
        expect(screen.getByText(/Wind Alert/i)).toBeInTheDocument();

      if (condition.toLowerCase() === 'thunderstorm')
        expect(screen.getByText(/Stay Indoors/i)).toBeInTheDocument();
    });
  });
});
