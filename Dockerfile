
FROM node:18-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure next binary is executable
RUN chmod +x ./node_modules/.bin/next

# Build using local next binary
RUN ./node_modules/.bin/next build

# Production stage
FROM node:18-slim
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]

# # Stage 1: Build
# FROM node:18-alpine AS builder
# WORKDIR /app

# # Install build dependencies
# COPY package*.json ./
# RUN npm ci

# # Copy source files
# COPY . .

# # Build the Next.js app
# RUN npx next build

# # Stage 2: Production
# FROM node:18-alpine
# WORKDIR /app

# # Install only production dependencies
# COPY package*.json ./
# RUN npm ci --production

# # Copy built app from builder stage
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.js ./

# EXPOSE 3000

# # Start the app
# CMD ["npx", "next", "start", "-p", "3000"]
