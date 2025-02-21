# Build Stage
FROM node:18.18.2 AS builder

WORKDIR /orders

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript 

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production Stage
FROM node:18.18.2-slim

ENV PORT 8000
ENV NODE_ENV production

WORKDIR /orders

RUN npm install -g pnpm

# Copy only necessary files
COPY --from=builder /orders/dist ./dist
COPY --from=builder /orders/package.json ./
COPY --from=builder /orders/pnpm-lock.yaml ./
COPY --from=builder /orders/db ./db
COPY --from=builder /orders/drizzle.config.ts ./

# Install only production dependencies
RUN pnpm install --only=production
RUN pnpm install drizzle-kit

EXPOSE 8000

CMD ["sh", "-c", "pnpm run generate && pnpm run migrate && pnpm start"]