import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async ({ command, mode }) => {
  const plugins = [react(), runtimeErrorOverlay()];

  // Only load Replit plugin in dev on Replit
  if (mode !== "production" && process.env.REPL_ID) {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },

    // Your app source lives in /client (keep index.html in /client)
    root: path.resolve(import.meta.dirname, "client"),

    // ✅ Output directly to dist/ (not dist/public) so index.html + assets land in /dist
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },

    // (Optional) If you keep a public folder, leave it at the default (/client/public).
    // publicDir: path.resolve(import.meta.dirname, "client/public"),

    // If you’ll preview/host under a subpath, uncomment:
    // base: "./",

    server: {
      fs: { strict: true, deny: ["**/.*"] },
      // Replit rotates subdomains; allowing all is simplest for dev
      allowedHosts: ["*"],
    },
    preview: {
      // Helpful on Replit
      host: true,
      strictPort: true,
    },
  };
});
