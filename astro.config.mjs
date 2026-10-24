// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://tukura.es",
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/mantenimiento") && !page.includes("/tarjeta-regalo"),
    }),
  ],
  redirects: {
    "/inicio": "/",
  },
  server: {
    host: true,
    port: 4322,
  },
  preview: {
    host: true,
    port: 4322,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
