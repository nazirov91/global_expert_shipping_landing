import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Production-only Vite config for Netlify deployment
// This avoids Replit-specific plugins that aren't available on Netlify
export default defineConfig({
  plugins: [
    react(),
    // No Replit-specific plugins for Netlify builds
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  define: {
    // Ensure production environment
    'process.env.NODE_ENV': '"production"'
  }
});
