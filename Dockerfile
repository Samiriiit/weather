
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

# # 1. Build Stage: Uses a full Node environment to run the build process
# FROM node:18-slim AS builder
# WORKDIR /app

# # Install dependencies (including dev dependencies for building)
# COPY package*.json ./
# RUN npm install

# # Copy source code and run the build
# COPY . .
# # Assumes 'npm run build' is defined in package.json to run next build
# RUN npm run build

# # 2. Production Stage (Runner): Uses a minimal Node environment for serving
# FROM node:18-slim
# WORKDIR /app

# # Copy dependency files and install production-only packages
# COPY package*.json ./
# RUN npm install --production

# # Copy built artifacts and static assets from the builder stage
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# # Copy the next binary required for 'npm start'
# COPY --from=builder /app/node_modules/next/dist/bin/next /usr/local/bin/next

# # Security Best Practice: Switch to the non-root 'node' user
# USER node 

# EXPOSE 3000

# # Start the Next.js production server
# CMD ["npm", "start"]
