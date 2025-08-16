// // pages/index.tsx
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ForecastCard from '../components/ForecastCard';
// import { fetchLiveWeather } from '../utils/fetchWeather';
// import { Forecast } from '../types/weather';
// import ToggleModeOffline from '../components/ToggleModeOffline';
// import CityInput from '../components/CityInput';

// const HomeContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const Title = styled.h1`
//   text-align: center;
//   margin-bottom: 2rem;
//   color: #1a365d;
// `;

// const Controls = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
//   gap: 1rem;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const ErrorMessage = styled.div`
//   background-color: #fee2e2;
//   color: #b91c1c;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   margin-bottom: 1rem;
//   text-align: center;
// `;

// const LoadingState = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 300px;
// `;

// const Spinner = styled.div`
//   border: 4px solid rgba(0, 0, 0, 0.1);
//   border-radius: 50%;
//   border-top: 4px solid #3498db;
//   width: 40px;
//   height: 40px;
//   animation: spin 1s linear infinite;
//   margin-bottom: 1rem;

//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const NoData = styled.div`
//   text-align: center;
//   padding: 2rem;
//   background-color: #f3f4f6;
//   border-radius: 0.5rem;
//   color: #6b7280;
// `;

// const Home = () => {
//   const [city, setCity] = useState<string>("London");
//   const [forecasts, setForecasts] = useState<Forecast[]>([]);
//   const [useMock, setUseMock] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTrigger, setSearchTrigger] = useState<number>(0);

//   // Mock data transformation function
//   const transformMockData = (mockData: any[]): Forecast[] => {
//     return mockData.map(item => ({
//       date: item.date || new Date().toISOString().split('T')[0],
//       high: item.high || 0,
//       low: item.low || 0,
//       currentTemp: item.currentTemp || Math.round(((item.high || 0) + (item.low || 0)) / 2),
//       feelsLike: item.feelsLike || Math.round(((item.high || 0) + (item.low || 0)) / 2),
//       wind: item.wind || 0,
//       condition: item.condition || "Unknown",
//       icon: item.icon || "01d",
//       precipitationProbability: item.precipitationProbability || 0,
//       humidity: item.humidity || 50,
//       pressure: item.pressure || 1013,
//       rainTotal: item.rainTotal,
//       advice: item.advice || ["No special advice for the day"]
//     }));
//   };

//   const handleSearch = (searchCity: string) => {
//     setCity(searchCity);
//     setSearchTrigger(prev => prev + 1); // Trigger useEffect
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         if (useMock) {
//           // In a real app, you would import mockData from a file
//           const mockData = [
//             {
//               date: new Date().toISOString().split('T')[0],
//               high: 23,
//               low: 14,
//               condition: "Clouds",
//               wind: 3.5,
//               icon: "04n"
//             }
//           ];
//           setForecasts(transformMockData(mockData));
//         } else {
//           const liveData = await fetchLiveWeather(city);
//           setForecasts(liveData);
//         }
//       } catch (err) {
//         console.error("Error loading data:", err);
//         setError("Failed to load weather data. Using mock data instead.");
//         const mockData = [
//           {
//             date: new Date().toISOString().split('T')[0],
//             high: 23,
//             low: 14,
//             condition: "Clouds",
//             wind: 3.5,
//             icon: "04n"
//           }
//         ];
//         setForecasts(transformMockData(mockData));
//         setUseMock(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       loadData();
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [city, useMock, searchTrigger]); // Added searchTrigger to dependencies

//   return (
//     <HomeContainer>
//       <Title>🌦️ Weather Forecast</Title>

//       <Controls>
//         <CityInput 
//           onSearch={handleSearch}
//           disabled={loading}
//           initialCity={city}
//         />

//         <ToggleModeOffline
//           isOffline={useMock}
//           toggleOffline={() => setUseMock(!useMock)}
//           disabled={loading}
//         />
//       </Controls>

//       {error && <ErrorMessage>{error}</ErrorMessage>}

//       {loading ? (
//         <LoadingState>
//           <Spinner />
//           <p>Loading weather data...</p>
//         </LoadingState>
//       ) : forecasts.length > 0 ? (
//         <ForecastCard forecasts={forecasts} />
//       ) : (
//         <NoData>
//           <p>No weather data available for {city}</p>
//         </NoData>
//       )}
//     </HomeContainer>
//   );
// };

// export default Home;
export { default } from '../Home/index';