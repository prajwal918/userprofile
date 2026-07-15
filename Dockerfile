# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and lockfile
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build client and server
RUN pnpm run build

# Stage 2: Production runtime
FROM node:22-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Copy built assets and package files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Copy production node_modules or just run using the compiled server entry point
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Run the compiled server
CMD ["node", "dist/server/production.mjs"]