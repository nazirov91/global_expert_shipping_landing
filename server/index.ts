#!/usr/bin/env node
// Force Vite to run on port 5000 for static website
process.env.VITE_PORT = "5000";
process.env.PORT = "5000";

console.log("Starting Auto Transport Broker website...");

import { execSync } from "child_process";

try {
  // Force Vite to use port 5000 with command line arguments
  execSync("npx vite --host 0.0.0.0 --port 5000", {
    stdio: "inherit",
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: "5000",
      VITE_PORT: "5000"
    }
  });
} catch (error) {
  console.error("❌ Error starting Vite server:", error);
  process.exit(1);
}