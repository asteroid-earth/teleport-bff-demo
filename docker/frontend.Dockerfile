# docker/frontend.Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY frontend/package.json ./
COPY frontend/package-lock.json* ./

# Install dependencies
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the frontend code
COPY frontend/ ./

# Build the app
RUN npm run build

# Start a new stage for the final image
FROM node:latest

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/build ./build


# Install serve to run the application
RUN npm install -g serve

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]