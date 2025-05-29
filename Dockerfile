# Stage 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# 🔥 Copy environment file for build-time variables
COPY .env.production .env

# Copy all source files
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built files and public assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy next.config.js if exists (optional, based on your project)
# COPY --from=builder /next.config.js ./

# Expose port 3000 for the app
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]
