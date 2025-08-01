// components/CityInput.tsx
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  height: 48px;
  position: relative;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  padding-right: 48px;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  &:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 48px;
  background: transparent;
  border: none;
  color: #718096;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 0 0.5rem 0.5rem 0;

  &:hover {
    color: #4299e1;
  }

  &:disabled {
    color: #cbd5e0;
    cursor: not-allowed;
  }

  &::after {
    content: "🔍";
    font-size: 1.25rem;
  }
`;

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Search for a city..."
        aria-label="City search input"
      />
      <SearchButton 
        onClick={handleSearch}
        disabled={disabled || !city.trim()}
        aria-label="Search"
      />
    </SearchContainer>
  );
};

export default CityInput;