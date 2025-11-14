
# FROM node:18-slim AS builder
# WORKDIR /app

# # copy  - package.json aur package-lock.json
# COPY package*.json ./
# RUN npm install

# # code copy all files and folder 
# COPY . .

# # Ensure next binary is executable with permission
# RUN chmod +x ./node_modules/.bin/next

# # Build using local next binary
# RUN ./node_modules/.bin/next build

# # Production stage
# FROM node:18-slim
# WORKDIR /app

# # first factory  package files copy
# COPY --from=builder /app/package*.json ./
# RUN npm install --production

# COPY --from=builder /app/.next ./.next
# # copy all builds and public images
# COPY --from=builder /app/public ./public

# EXPOSE 3000
# CMD ["npx", "next", "start", "-p", "3000"] 

FROM node:18-slim AS builder
WORKDIR /app

# copy package.json & package-lock.json
COPY package*.json ./
RUN npm install

# copy all code
COPY . .

# make next executable
RUN chmod +x ./node_modules/.bin/next

# build next
RUN ./node_modules/.bin/next build


FROM node:18-slim
WORKDIR /app

# minimal fix: copy package*.json
COPY --from=builder /app/package*.json ./

# minimal fix: copy node_modules
COPY --from=builder /app/node_modules ./node_modules

# install only prod deps if needed (optional)
RUN npm install --production=false

# copy .next and public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# minimal fix: remove npx
CMD ["npm", "start"]
