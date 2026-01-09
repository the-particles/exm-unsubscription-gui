import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      manifest: {
        name: "Unsubscription",
        short_name: "Unsubscription",
        description: "EXM's (Expense Management) subscriptions manager",
        theme_color: "#0a0e12",
        background_color: "#0a0e12",
        display: "standalone",
        icons: [
          {
            src: "/images/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["**/*"],
    }),
  ],
  resolve: {
    alias: {
      "@pars": path.resolve(__dirname, "./src"),
    },
  },
});
