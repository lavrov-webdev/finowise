# Базовый образ для сборки порядка
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и yarn.lock в контейнер
COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN yarn prisma migrate deploy

CMD ["node", "dist/main"]