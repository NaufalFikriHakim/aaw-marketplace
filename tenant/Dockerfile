# Build Stage
FROM node:18.18.2 AS builder

WORKDIR /tenant

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

WORKDIR /tenant

RUN npm install -g pnpm

# Copy only necessary files
COPY --from=builder /tenant/dist ./dist
COPY --from=builder /tenant/package.json ./
COPY --from=builder /tenant/pnpm-lock.yaml ./
COPY --from=builder /tenant/db ./db
COPY --from=builder /tenant/drizzle.config.ts ./

# Install only production dependencies
RUN pnpm install --only=production
RUN pnpm install drizzle-kit

EXPOSE 8000

CMD ["sh", "-c", "pnpm run generate && pnpm run migrate && pnpm start"]