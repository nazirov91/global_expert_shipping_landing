import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production-only Vite config for Netlify deployment
// This avoids Replit-specific plugins that aren't available on Netlify
export default defineConfig({
  plugins: [
    react(),
    // No Replit-specific plugins for Netlify builds
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  cacheDir: path.resolve(__dirname, ".vite-cache"),
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  define: {
    // Ensure production environment
    'process.env.NODE_ENV': '"production"'
  }
});
