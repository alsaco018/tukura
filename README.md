# TUKURA

Sitio web de TUKURA masajes (Astro + React + Tailwind CSS 4).

**Dominios:** [tukura.es](https://tukura.es) · `tu-kura.com` redirige a `tukura.es`

## Páginas

- `/` — Portada de mantenimiento (página pública actual)
- `/inicio` — Homepage completa (diseño Figma, en desarrollo)

## Desarrollo local

```bash
npm install
npm run dev
```

- Pública: `http://localhost:4322/`
- Home en desarrollo: `http://localhost:4322/inicio`

## Deploy (Hostinger VPS, mismo que el portfolio)

Comparte la red Docker `portfolio_web` y el Caddy del portfolio (puertos 80/443).

### 1. DNS (Hostinger)

Apunta a la IP del VPS:

| Tipo | Nombre | Valor |
|------|--------|--------|
| A | `@` y `www` en **tukura.es** | IP del VPS |
| A | `@` y `www` en **tu-kura.com** | IP del VPS |

### 2. Primera vez en el VPS

```bash
# Caddy del portfolio debe estar corriendo (con el Caddyfile actualizado)
cd /opt/portfolio && docker compose up -d

git clone <url-repo-tukura> /opt/tukura
cd /opt/tukura
docker compose up -d --build
```

### 3. GitHub Actions

Secrets del repo (iguales que el portfolio):

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_PORT` (opcional)

Cada push a `main` hace deploy en `/opt/tukura`.

### 4. Tras cambiar el Caddyfile del portfolio

Hay que redesplegar el portfolio una vez para que Caddy cargue `tukura.es` y la redirección de `tu-kura.com`:

```bash
cd /opt/portfolio
git pull   # o el workflow Deploy del portfolio
docker compose up -d
```

## Contenido editable

- `src/data/site.ts` — textos, CTA, redes
- `src/data/services.ts` — servicios
- `src/data/carta.ts` — carta de masajes
- `public/fonts/` — Poppins y Tan-paradiso
