FROM node:18.18.2 AS builder

WORKDIR /aaw-marketplace-microservices/wishlist

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

ENV PORT 8005
ENV NODE_ENV production

WORKDIR /aaw-marketplace-microservices/wishlist


COPY --from=builder /aaw-marketplace-microservices/wishlist/dist/ ./dist
COPY --from=builder /aaw-marketplace-microservices/wishlist/package.json ./dist/package.json

# Set Working Directory to `dist/`
WORKDIR /aaw-marketplace-microservices/wishlist/dist

# Install pnpm in the final container as well
RUN npm install -g pnpm

# Install production dependencies from dist/
RUN npm install --only=production

EXPOSE 8005

# CMD ["node", "src/server.js"]
# CMD pnpm run generate && pnpm run migrate && pnpm start
CMD pnpm run generate && pnpm run migrate && pnpm start
