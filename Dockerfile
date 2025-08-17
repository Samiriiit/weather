# Step 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
RUN npm run build

# Step 2: Production image
FROM node:18-alpine
WORKDIR /app

# Copy build and dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# Start Next.js app in production mode
CMD ["npx", "next", "start", "-p", "3000"]
