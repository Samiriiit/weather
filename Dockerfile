# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Give execute permission to node_modules binaries
RUN chmod -R 755 ./node_modules/.bin

# Copy rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
