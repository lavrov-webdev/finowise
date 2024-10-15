FROM node:18 AS builder

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm i --registry=https://registry.npmjs.org/

COPY . .

RUN pnpm build


FROM nginx:alpine

WORKDIR /app

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]