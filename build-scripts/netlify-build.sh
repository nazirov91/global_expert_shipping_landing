#!/usr/bin/env bash
set -euo pipefail

echo "Building for Netlify deployment..."

export NODE_ENV=production
unset REPL_ID

REPO_ROOT="$(pwd)"

# 1) Detect app directory (root or client)
APP_DIR="."
if [ -f "client/package.json" ]; then
  APP_DIR="client"
fi
echo "App directory: ${APP_DIR}"

# 2) Install deps (Netlify usually runs npm ci at root; we need app deps too)
if [ -f "${APP_DIR}/package.json" ]; then
  if [ "${SKIP_INSTALL:-0}" = "1" ]; then
    echo "Skipping dependency installation (SKIP_INSTALL=1) in ${APP_DIR}..."
  else
    echo "Installing dependencies in ${APP_DIR}..."
    pushd "${APP_DIR}" >/dev/null
    npm ci
    popd >/dev/null
  fi
fi

# 3) Build within APP_DIR
pushd "${APP_DIR}" >/dev/null
npm run build
BUILD_DIR="$(pwd)"
popd >/dev/null

# 4) Locate build output
# 4) Locate build output (relative to APP_DIR)
OUTPUT_CANDIDATES=(
  "dist"
  "dist/public"         # replit vite format
  "build"
  "out"                  # next export
  ".output/public"       # nitro/nuxt
  ".vercel/output/static"
)
FOUND_OUTPUT=""
for p in "${OUTPUT_CANDIDATES[@]}"; do
  if [ -d "${APP_DIR}/$p" ] && [ "$(ls -A "${APP_DIR}/$p")" ]; then
    FOUND_OUTPUT="$p"
    break
  fi
done

if [ -z "${FOUND_OUTPUT}" ]; then
  echo "ERROR: Could not find build output in any of:"
  printf ' - %s\n' "${OUTPUT_CANDIDATES[@]}"
  exit 2
fi

echo "Found build output at: ${APP_DIR}/${FOUND_OUTPUT}"

# 5) Normalize to repo-level dist/ for Netlify publish
rm -rf "${REPO_ROOT}/dist"
mkdir -p "${REPO_ROOT}/dist"
# If we built into dist/public (replit), flatten it; else copy as-is
if [[ "${FOUND_OUTPUT}" == "dist/public" ]]; then
  echo "Flattening Replit-style dist/public -> dist"
  cp -R "${APP_DIR}/${FOUND_OUTPUT}/." "${REPO_ROOT}/dist/"
else
  cp -R "${APP_DIR}/${FOUND_OUTPUT}/." "${REPO_ROOT}/dist/"
fi

# 6) Copy _redirects for SPA routing (if present)
if [ -f "${APP_DIR}/_redirects" ]; then
  cp "${APP_DIR}/_redirects" "${REPO_ROOT}/dist/_redirects"
  echo "Copied _redirects from ${APP_DIR}"
elif [ -f "${APP_DIR}/public/_redirects" ]; then
  cp "${APP_DIR}/public/_redirects" "${REPO_ROOT}/dist/_redirects"
  echo "Copied _redirects from ${APP_DIR}/public"
fi

# 7) Sanity check
echo "Final dist/ contents:"
ls -lah "${REPO_ROOT}/dist" | sed -n '1,120p'

if [ ! -d "${REPO_ROOT}/dist" ] || [ -z "$(ls -A "${REPO_ROOT}/dist")" ]; then
  echo "ERROR: dist/ not created or is empty."
  exit 2
fi

echo "Netlify build completed successfully!"
