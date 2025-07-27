# weather-forecast-updated
<img width="949" height="448" alt="Weatherfinal" src="https://github.com/user-attachments/assets/77451ddb-e853-4051-bdcc-2f230281f2f5" />
<img width="105" height="206" alt="weather phone" src="https://github.com/user-attachments/assets/c30f1232-d367-4b7e-9de9-557cf596d40a" />
<img width="448" height="212" alt="test result" src="https://github.com/user-attachments/assets/1c8a15d1-4a47-4a9f-80eb-70011d3e7e9f" />



🌦️ India Weather Forecast App (Next.js Version)
A modern Next.js weather forecast app displaying a 3-day forecast for major Indian cities. Users can toggle between local mock data and live weather data fetched from WeatherAPI.com using a reusable axios-based API caller.

#🚀 Features

#🔍 Select city from a dropdown dynamically generated from mock data.


#📅 View a 3-day weather forecast in a clean, card-based UI


#🌤️ Weather emojis dynamically rendered based on conditions (☀️, 🌧️, ⛈️, etc.)


#⚠️ Safety & recommendation messages like “Extreme Heat Warning” or “Carry an Umbrella”

#🔁 Toggle between offline mock data and live API data

#🔐 API keys stored securely using .env with Next.js environment variables (NEXT_PUBLIC_)


#⚡ Fast SSR and SEO-friendly with Next.js page routing


#✅ Unit tested with Jest and React Testing Library


#Responsiveness


·       🗂️ Updated Project Structure

·       graphql

·     #   weather-ui/

·     #   ├── components/

·      #  │   ├── CityInput.tsx

·      #  │   ├── ForecastCard.tsx

·     #   │   ├── ToggleOfflineMode.tsx

·     #  ├── data/

·      #  │   └── mockForecastData.json

·      #  ├── pages/

·      #  │   ├── _app.tsx                 # Custom App for global styles & props

·      # │   └── index.tsx                # Home page (formerly Home component)

·     #   ├── styles/

·      #  │   └── globals.css

·      #  ├── utils/

·     #   │   ├── apiCaller.ts             # Generic axios API caller

·      #  │   └── fetchWeather.ts          # Weather data fetching function

·      #  ├── jest.config.js               # Jest config

·      #  ├── tsconfig.json                # TypeScript config

·       # ├── .env.local                   # API keys (gitignored)

·      #  ├── package.json

·      #  └── README.md

⚙️ Setup Instructions

 

git clone <repo-url>


cd weather-ui


npm install


NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here


NEXT_PUBLIC_API_BASE_URL=https://api.weatherapi.com/v1


npm run dev


 

📊 Key Next.js & React Concepts Used

#Next.js Pages & Routing: File-based routing in /pages/index.tsx


#TypeScript: Strong typing for components and API responses


#React Hooks: useState and useEffect for state and lifecycle


#API Layer: Centralized reusable apiCaller using axios for HTTP requests


#Environment Variables: Secure API keys using .env.local and NEXT_PUBLIC_ prefix


#Conditional Rendering: Loading state, toggling between mock and live data


#Component Props: Well-typed props interfaces for component communication


#Unit Testing: Jest + React Testing Library for component and util tests


#🌐 Live Weather API


#Uses WeatherAPI.com for real-time data


#Forecast fetched for next 3 days


#Wind speed converted from km/h to mph


#On API failure or invalid key, automatically falls back to local mock data


#🧪 Testing



#Jest configured with TypeScript support
#React Testing Library for UI interaction testing
#Sample tests for components and API caller available
#npm test

 

📝 Future Improvements

#Save favorite cities in local storage or backend
#Add Progressive Web App (PWA) support
#Enhance accessibility
