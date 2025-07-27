import React from "react";

// TypeScript interface for the props
interface CityInputProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

// This component shows a dropdown to let the user pick a city
// It receives three props: list of cities, the selected city, and a function to update the selected city
const CityInput = ({ cities, selectedCity, onCityChange }: CityInputProps) => {
  return (
    // Render a <select> dropdown with the current selected city as its value
    // When the user changes the dropdown, call the onCityChange function with the new value-
    <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
      {/* Loop through all cities and create an <option> for each one */}
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CityInput;
