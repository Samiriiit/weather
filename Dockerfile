# Dockerfile
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# Start the app
EXPOSE 3000
CMD ["npm", "start"]
