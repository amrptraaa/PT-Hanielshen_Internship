FROM oven/bun:1.2.20 AS builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1.1.0-slim
WORKDIR /app

RUN bun install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["serve", "-s", "dist", "-l", "3000"]