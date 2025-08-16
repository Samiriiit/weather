import React, { useState } from 'react';
import { SearchContainer, SearchInput, SearchButton } from './index.style';

interface CityInputProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
  initialCity?: string;
}

const CityInput: React.FC<CityInputProps> = ({ 
  onSearch, 
  disabled = false,
  initialCity = ""
}) => {
  const [city, setCity] = useState(initialCity);

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Enter city name..."
        aria-label="City search input"
      />
      <SearchButton 
        onClick={handleSearch}
        disabled={disabled || !city.trim()}
        aria-label="Search city"
      >
        🔍
      </SearchButton>
    </SearchContainer>
  );
};

export default CityInput;
