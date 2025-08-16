import styled from 'styled-components';

export const ForecastContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

export const ForecastCardWrapper = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #edf2f7;
  padding-bottom: 1rem;
`;

export const DateIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateText = styled.span`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

export const WeatherIcon = styled.span`
  font-size: 2.5rem;
  margin-top: 0.5rem;
`;

export const TempsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const HighTemp = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #e53e3e;
`;

export const LowTemp = styled.span`
  font-size: 1rem;
  color: #3182ce;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ConditionText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2d3748;
  text-transform: capitalize;
`;

export const CurrentTemp = styled.div`
  font-size: 1rem;
  color: #4a5568;
`;

export const DetailsWrapper = styled.div`
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

export const AdviceWrapper = styled.div`
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
