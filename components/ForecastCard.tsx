// components/ForecastCard.tsx
import React from 'react';
import styled from 'styled-components';
import { Forecast } from '../types/weather';

const ForecastContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

const ForecastCardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #edf2f7;
`;

const DateIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateText = styled.span`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

const WeatherIcon = styled.span`
  font-size: 2.5rem;
  margin-top: 0.5rem;
`;

const TempsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const HighTemp = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e53e3e;
`;

const LowTemp = styled.span`
  font-size: 1rem;
  color: #3182ce;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ConditionText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3748;
  text-transform: capitalize;
`;

const CurrentTemp = styled.div`
  font-size: 1rem;
  color: #4a5568;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #4a5568;

  & > span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const AdviceWrapper = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #e2e8f0;
  font-size: 0.9rem;
  color: #4a5568;

  & > div:first-child {
    font-weight: 600;
    margin-bottom: 0.3rem;
    color: #2d3748;
  }
`;

const getIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    "01d": "☀️", "01n": "🌙", 
    "02d": "⛅", "02n": "☁️🌙",
    "03d": "☁️", "03n": "☁️",
    "04d": "☁️", "04n": "☁️",
    "09d": "🌧️", "09n": "🌧️",
    "10d": "🌦️", "10n": "🌧️",
    "11d": "⛈️", "11n": "⛈️",
    "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️"
  };
  return iconMap[iconCode] || "❓";
};

interface ForecastCardProps {
  forecasts: Forecast[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecasts }) => {
  if (!forecasts || forecasts.length === 0) {
    return <div>No forecast data available</div>;
  }

  return (
    <ForecastContainer>
      {forecasts.map((forecast, idx) => (
        <ForecastCardWrapper key={`${forecast.date}-${idx}`}>
          <CardHeader>
            <DateIconWrapper>
              <DateText>
                {new Date(forecast.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </DateText>
              <WeatherIcon>{getIcon(forecast.icon)}</WeatherIcon>
            </DateIconWrapper>
            <TempsWrapper>
              <HighTemp>H: {forecast.high}°C</HighTemp>
              <LowTemp>L: {forecast.low}°C</LowTemp>
            </TempsWrapper>
          </CardHeader>

          <CardBody>
            <ConditionText>{forecast.condition}</ConditionText>
            <CurrentTemp>Now: {forecast.currentTemp}°C</CurrentTemp>
            <CurrentTemp>Feels like: {forecast.feelsLike}°C</CurrentTemp>
            
            <DetailsWrapper>
              <span>💨 {forecast.wind} mph</span>
              <span>🌧️ {forecast.precipitationProbability}%</span>
              <span>💧 {forecast.humidity}%</span>
              <span>📊 {forecast.pressure} hPa</span>
              {forecast.rainTotal && <span>🌧 Total: {forecast.rainTotal}mm</span>}
            </DetailsWrapper>

            <AdviceWrapper>
              <div>Tip:</div>
              <div>{forecast.advice[0]}</div>
            </AdviceWrapper>
          </CardBody>
        </ForecastCardWrapper>
      ))}
    </ForecastContainer>
  );
};

export default ForecastCard;