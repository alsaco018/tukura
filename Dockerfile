# Multi-stage build: Astro static site → nginx
FROM node:22.23.4-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
# Use npm install so optional platform deps (linux/musl) resolve inside Alpine
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

# htpasswd for gift-card Basic Auth (see docker/entrypoint.sh)
RUN apk add --no-cache apache2-utils

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

