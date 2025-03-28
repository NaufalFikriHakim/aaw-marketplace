FROM node:18.18.2 AS builder

WORKDIR /aaw-marketplace-microservices/orders

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production image
FROM node:18.18.2-slim

ENV PORT 8002
ENV NODE_ENV production

WORKDIR /aaw-marketplace-microservices/orders


COPY --from=builder /aaw-marketplace-microservices/orders/dist/ ./dist
COPY --from=builder /aaw-marketplace-microservices/orders/package.json ./dist/package.json

# Set Working Directory to `dist/`
WORKDIR /aaw-marketplace-microservices/orders/dist

# Install pnpm in the final container as well
RUN npm install -g pnpm

# Install production dependencies from dist/
RUN npm install --only=production

EXPOSE 8002

# CMD ["node", "src/server.js"]
# CMD pnpm run generate && pnpm run migrate && pnpm start
CMD pnpm run generate && pnpm run migrate && pnpm start
