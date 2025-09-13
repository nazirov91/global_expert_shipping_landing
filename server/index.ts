// Minimal server file to run Vite dev server for static website
import { createServer } from "vite";

async function startViteDevServer() {
  try {
    const server = await createServer({
      server: {
        host: "0.0.0.0",
        port: 5000,
      },
    });

    await server.listen();
    
    console.log("Auto Transport Broker website is running!");
    console.log("Frontend available at: http://localhost:5000");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startViteDevServer();