FROM node:18-alpine AS builder

WORKDIR /app

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn prisma migrate deploy

RUN yarn prisma generate

RUN yarn build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]