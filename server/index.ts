// Run Vite dev server on port 5000 for static website
import { createServer } from "vite";
import path from "path";

console.log("Starting Auto Transport Broker website...");

async function startViteServer() {
  try {
    // Load the existing vite config and override the server settings
    const server = await createServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      server: {
        host: "0.0.0.0",
        port: 5000,
        strictPort: true, // Fail if port 5000 is not available
      },
    });

    await server.listen();
    server.printUrls();
    
    console.log("✅ Auto Transport Broker website is running!");
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

startViteServer();