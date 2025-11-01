# -------- Stage 1: Build the Next.js app --------
FROM node:18-alpine
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install *all* deps for build (including dev)
RUN npm install

# Copy the source code
COPY . .

# Build the app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
