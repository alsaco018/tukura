#!/bin/sh
set -eu

AUTH_USER="${GIFT_AUTH_USER:-tukura}"
AUTH_PASS="${GIFT_AUTH_PASSWORD:-}"
HTPASSWD_FILE="/etc/nginx/gift-card.htpasswd"

if [ -z "$AUTH_PASS" ]; then
  echo "ERROR: GIFT_AUTH_PASSWORD is required to protect /tarjeta-regalo/" >&2
  exit 1
fi

# nginx:alpine includes openssl; apache2-utils provides htpasswd
htpasswd -bcB "$HTPASSWD_FILE" "$AUTH_USER" "$AUTH_PASS"
chmod 644 "$HTPASSWD_FILE"

echo "Basic auth enabled for /tarjeta-regalo/ (user: ${AUTH_USER})"

exec nginx -g "daemon off;"
