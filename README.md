# TUKURA

Sitio web de TUKURA masajes (Astro + React + Tailwind CSS 4).

**Dominios:** [tukura.es](https://tukura.es) · `tu-kura.com` → `tukura.es`

## Páginas

- `/` — Homepage (masajes y bienestar)
- `/quien-soy` — Patri Guillén
- `/historia` — Nuestra historia
- `/masajes/[id]` — Ficha de cada servicio
- `/mantenimiento` — Portada “próximamente” (noindex)
- `/tarjeta-regalo` — Experiencia de tarjeta regalo (Basic Auth + noindex)

## Desarrollo local

```bash
npm install
npm run dev
```

- `http://localhost:4322/`
- `http://localhost:4322/historia`

## Deploy (Hostinger VPS + Nginx del host)

Arquitectura:

```text
Internet → Nginx (80/443) → 127.0.0.1:8082 → contenedor tukura:80
                         → 127.0.0.1:8081 → contenedor portfolio:80
```

### 1. Contenedor Tukura

```bash
git clone https://github.com/alsaco018/tukura.git /opt/tukura
cd /opt/tukura
cp .env.example .env   # define GIFT_AUTH_USER / GIFT_AUTH_PASSWORD
docker compose up -d --build
```

`/tarjeta-regalo/` está protegida con HTTP Basic Auth (credenciales del `.env`).

Comprueba: `curl -I http://127.0.0.1:8082`  
Auth: `curl -I -u usuario:clave http://127.0.0.1:8082/tarjeta-regalo/`

### 2. Nginx

Plantilla en [`deploy/nginx-tukura.es.conf`](deploy/nginx-tukura.es.conf):

```bash
sudo cp deploy/nginx-tukura.es.conf /etc/nginx/sites-available/tukura.es
sudo ln -sf /etc/nginx/sites-available/tukura.es /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d tukura.es -d www.tukura.es
```

Para `tu-kura.com`, tras el certificado de tukura.es puedes pedir también:

```bash
sudo certbot --nginx -d tu-kura.com -d www.tu-kura.com
```

(o mantener solo la redirección HTTP del archivo de ejemplo).

### 3. Portfolio (mismo VPS)

El compose del portfolio publica `127.0.0.1:8081:80`. En el bloque HTTPS de `albertosaldana.dev` usa:

```nginx
proxy_pass http://127.0.0.1:8081;
```

### 4. GitHub Actions

Secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT` (opcional).  
Deploy path: `/opt/tukura`.

## Contenido editable

- `src/data/site.ts`, `services.ts`, `carta.ts`
- `public/fonts/` — Poppins y Tan-paradiso
