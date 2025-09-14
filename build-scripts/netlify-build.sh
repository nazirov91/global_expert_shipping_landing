#!/usr/bin/env bash
set -euo pipefail

echo "Building for Netlify deployment..."

export NODE_ENV=production
unset REPL_ID

# 1) Detect app directory (root or client)
APP_DIR="."
if [ -f "client/package.json" ]; then
  APP_DIR="client"
fi
echo "App directory: ${APP_DIR}"

# 2) Install deps (Netlify usually runs npm ci at root; we need app deps too)
if [ -f "${APP_DIR}/package.json" ]; then
  echo "Installing dependencies in ${APP_DIR}..."
  pushd "${APP_DIR}" >/dev/null
  npm ci
  popd >/dev/null
fi

# 3) Build (prefer vite.config.netlify.ts if present in APP_DIR)
if [ -f "${APP_DIR}/vite.config.netlify.ts" ]; then
  echo "Using Netlify-specific Vite config..."
  (cd "${APP_DIR}" && npx vite build --config vite.config.netlify.ts)
else
  echo "Using package build script..."
  (cd "${APP_DIR}" && npm run build)
fi

# 4) Locate build output
OUTPUT_CANDIDATES=(
  "${APP_DIR}/dist"
  "${APP_DIR}/dist/public"         # replit vite format
  "${APP_DIR}/build"
  "${APP_DIR}/out"                 # next export
  "${APP_DIR}/.output/public"      # nitro/nuxt
  "${APP_DIR}/.vercel/output/static"
)
FOUND_OUTPUT=""
for p in "${OUTPUT_CANDIDATES[@]}"; do
  if [ -d "$p" ] && [ "$(ls -A "$p")" ]; then
    FOUND_OUTPUT="$p"
    break
  fi
done

if [ -z "${FOUND_OUTPUT}" ]; then
  echo "ERROR: Could not find build output in any of:"
  printf ' - %s\n' "${OUTPUT_CANDIDATES[@]}"
  exit 2
fi

echo "Found build output at: ${FOUND_OUTPUT}"

# 5) Normalize to repo-level dist/ for Netlify publish
rm -rf dist
mkdir -p dist
# If we built into dist/public (replit), flatten it; else copy as-is
if [[ "${FOUND_OUTPUT}" == */dist/public ]]; then
  echo "Flattening Replit-style dist/public -> dist"
  cp -R "${FOUND_OUTPUT}/." dist/
else
  cp -R "${FOUND_OUTPUT}/." dist/
fi

# 6) Copy _redirects for SPA routing (if present)
if [ -f "${APP_DIR}/_redirects" ]; then
  cp "${APP_DIR}/_redirects" dist/_redirects
  echo "Copied _redirects from ${APP_DIR}"
elif [ -f "${APP_DIR}/public/_redirects" ]; then
  cp "${APP_DIR}/public/_redirects" dist/_redirects
  echo "Copied _redirects from ${APP_DIR}/public"
fi

# 7) Sanity check
echo "Final dist/ contents:"
ls -lah dist | sed -n '1,120p'

if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
  echo "ERROR: dist/ not created or is empty."
  exit 2
fi

echo "Netlify build completed successfully!"
