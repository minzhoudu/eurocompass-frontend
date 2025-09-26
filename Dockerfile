FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm i
COPY . ./

# Build Nuxt
RUN pnpm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.output ./

EXPOSE 3000
CMD ["node", "/app/server/index.mjs"]
