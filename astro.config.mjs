// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  redirects: {
    "/mantenimiento": "/",
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
