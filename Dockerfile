
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

