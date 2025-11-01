# -------- Stage 1: Build the Next.js app --------
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install *all* deps for build (including dev)
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

# -------- Stage 2: Run the production app --------
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what’s needed for runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
