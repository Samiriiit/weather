// components/ToggleModeOffline.tsx
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
 display: flex;
  align-items: center;
  gap: 1rem;
  background: #f7fafc;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
  color: #4a5568;
`;

const ToggleButton = styled.button`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  background-color: ${props => props.theme.isOffline ? '#e2e8f0' : '#4299e1'};
  border-radius: 34px;
  transition: background-color 0.2s;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:after {
    content: '';
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    top: 4px;
    left: ${props => props.theme.isOffline ? '4px' : '30px'};
    transition: left 0.2s;
  }
`;

interface ToggleModeOfflineProps {
  isOffline: boolean;
  toggleOffline: () => void;
  disabled?: boolean;
}

const ToggleModeOffline: React.FC<ToggleModeOfflineProps> = ({ 
  isOffline, 
  toggleOffline, 
  disabled = false 
}) => {
  return (
    <ToggleContainer>
      <ToggleLabel>Live Data</ToggleLabel>
      <ToggleButton
        onClick={toggleOffline}
        disabled={disabled}
        theme={{ isOffline }}
        aria-label={isOffline ? "Switch to live data" : "Switch to offline mode"}
      />
      <ToggleLabel>Offline</ToggleLabel>
    </ToggleContainer>
  );
};

export default ToggleModeOffline;