# Multi-Platform Deployment Guide

This project is configured to deploy to multiple platforms while maintaining Replit compatibility.

## Platform Configurations

### Replit (Current Setup)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Status**: ✅ Active and working

### Netlify
- **Configuration File**: `netlify.toml`
- **Build Command**: `bash build-scripts/netlify-build.sh`
- **Output Directory**: `dist`
- **Features**:
  - SPA routing support
  - Optimized caching headers
  - Security headers
  - Automatic _redirects handling

**Deployment Options**:

1. **Netlify Native Build** (Recommended):
   - Connect GitHub repo to Netlify
   - Netlify will automatically use `netlify.toml` configuration
   - The build command properly handles Replit's `dist/public` format

2. **Manual Deployment**:
   - Run: `bash build-scripts/netlify-build.sh`
   - Deploy the `dist` folder to Netlify

3. **GitHub Actions Deployment**:
   - Workflow available in `.github/workflows/deploy-netlify.yml`
   - Set `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets in GitHub
   - Uses Netlify CLI for deployment

### Vercel
- **Configuration File**: `vercel.json`
- **Build Command**: `bash build-scripts/static-build.sh`
- **Output Directory**: `dist`
- **Features**:
  - SPA routing support
  - Optimized caching
  - Zero-config deployment

**Deployment**:
1. Connect GitHub repo to Vercel
2. Vercel will automatically use `vercel.json` configuration

### Decap CMS
- **Admin Interface**: `/admin/`
- **Configuration**: `client/admin/config.yml`
- **Content Storage**: `content/` directory
- **Features**:
  - Content management for pages, testimonials, FAQ
  - Git-based workflow
  - Local development support

**Setup**:
1. Enable Netlify Identity for authentication
2. Set up Git Gateway in Netlify
3. Access admin at `/admin/` after deployment

### Generic Static Hosting
- **Build Script**: `build-scripts/static-build.sh`
- **Output**: Standard `dist/` directory structure
- **Compatible with**: GitHub Pages, CloudFlare Pages, Firebase Hosting, etc.

## Build Output Compatibility

The build system handles different output directory expectations:

- **Replit**: Expects `dist/public/`
- **Others**: Expect `dist/`

The build scripts automatically handle this conversion while maintaining compatibility.

## Content Management

Content is managed through:
1. **Static files**: Direct editing of files in `content/`
2. **Decap CMS**: Visual interface at `/admin/` (when deployed with Netlify)
3. **Git workflow**: All changes are version controlled

## Environment Variables

For different deployment environments, set:
- `NODE_ENV=production` (automatically set by most platforms)
- `VITE_BUILD_TARGET=static` (for non-Replit deployments)

## Testing Locally

1. **Development**: `npm run dev`
2. **Build test**: `npm run build`
3. **Preview**: `npm run preview`
4. **CMS local**: `npx decap-server` (then visit `/admin/`)

## File Structure

```
├── netlify.toml              # Netlify configuration
├── vercel.json              # Vercel configuration
├── client/
│   ├── _redirects           # SPA routing rules
│   └── admin/               # Decap CMS admin
├── build-scripts/           # Cross-platform build scripts
├── content/                 # CMS content files
└── .github/workflows/       # CI/CD workflows
```