# Build Stage
FROM node:18.18.2 AS builder

WORKDIR /authentication

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

WORKDIR /authentication

RUN npm install -g pnpm

# Copy only necessary files
COPY --from=builder /authentication/dist ./dist
COPY --from=builder /authentication/package.json ./
COPY --from=builder /authentication/pnpm-lock.yaml ./
COPY --from=builder /authentication/db ./db
COPY --from=builder /authentication/drizzle.config.ts ./

# Install only production dependencies
RUN pnpm install --only=production
RUN pnpm install drizzle-kit
RUN pnpm add bcrypt


EXPOSE 8000

CMD ["sh", "-c", "pnpm run generate && pnpm run migrate && pnpm run generate-token && pnpm start"]