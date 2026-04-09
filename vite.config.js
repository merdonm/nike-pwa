import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",

      manifestFilename: "manifest.webmanifest",

      // 🔥 ADD THIS BLOCK (IMPORTANT)
      includeAssets: ["favicon.svg", "icon-192.png", "icon-512.png"],

      devOptions: {
        enabled: true,
      },
      manifest: false,
      // manifest: {
      //   id: "/",
      //   name: "Nike Store PWA",
      //   short_name: "Nike",
      //   start_url: "/",
      //   scope: "/",
      //   display: "standalone",
      //   background_color: "#111827",
      //   theme_color: "#111827",
      //   icons: [
      //     {
      //       src: "/icon-192.png",
      //       sizes: "192x192",
      //       type: "image/png",
      //       purpose: "any maskable",
      //     },
      //     {
      //       src: "/icon-512.png",
      //       sizes: "512x512",
      //       type: "image/png",
      //       purpose: "any maskable",
      //     },
      //   ],
      // },
    }),
  ],
});
