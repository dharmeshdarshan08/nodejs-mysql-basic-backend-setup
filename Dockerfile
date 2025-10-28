# ---- Base (builder) ----
FROM node:20-slim AS builder
WORKDIR /app

# Install deps separately for better layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY . .

# If you have a build step (TypeScript/Nest/Next SSR), uncomment:
# RUN npm run build

# ---- Runtime image ----
FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
# Non-root user for security
RUN useradd -m nodeapp

# Copy only what's needed to run
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# If you built to ./dist, change CMD accordingly (e.g., node dist/main.js)
EXPOSE 5050
USER nodeapp

# Healthcheck (adjust path if different)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://localhost:5050/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "index.js"]
