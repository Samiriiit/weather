import React from 'react';
import { Forecast } from '../../types/weather';
import {
  ForecastContainer,
  ForecastCardWrapper,
  CardHeader,
  DateIconWrapper,
  DateText,
  WeatherIcon,
  TempsWrapper,
  HighTemp,
  LowTemp,
  CardBody,
  ConditionText,
  CurrentTemp,
  DetailsWrapper,
  AdviceWrapper
} from './index.style';

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
  if (!forecasts || forecasts.length === 0) return <div>No forecast data available</div>;

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
