#!/bin/bash
# Netlify build script for cross-platform compatibility

echo "Building for Netlify deployment..."

# Set production environment to avoid Replit-specific plugins
export NODE_ENV=production
# Ensure REPL_ID is not set to avoid loading Replit plugins
unset REPL_ID

# Use Netlify-specific Vite config to avoid Replit dependencies
if [ -f "vite.config.netlify.ts" ]; then
    echo "Using Netlify-specific Vite config..."
    npx vite build --config vite.config.netlify.ts
else
    echo "Using default Vite config..."
    npm run build
fi

# Check if build output is in dist/public (Replit format)
if [ -d "dist/public" ]; then
    echo "Detected Replit build format (dist/public), copying to dist..."
    # Copy files from dist/public to dist root for Netlify
    cp -r dist/public/* dist/
    # Keep dist/public for Replit compatibility but ensure dist/ has the files too
    echo "Build files prepared for Netlify deployment"
else
    echo "Standard build format detected (dist/)"
fi

# Copy redirects file if it exists
if [ -f "client/_redirects" ]; then
    cp client/_redirects dist/_redirects
    echo "Copied _redirects file for SPA routing"
fi

echo "Netlify build completed successfully!"
