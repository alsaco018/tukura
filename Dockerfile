# Multi-stage build: Astro static site → nginx
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
# Use npm install so optional platform deps (linux/musl) resolve inside Alpine
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
