#!/bin/bash
# Netlify-specific build script that reuses the generic static build workflow.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Starting Netlify build using static build pipeline..."

export NODE_ENV="${NODE_ENV:-production}"
export VITE_BUILD_TARGET="${VITE_BUILD_TARGET:-static}"

bash "${SCRIPT_DIR}/static-build.sh"

echo "Netlify build completed successfully."
