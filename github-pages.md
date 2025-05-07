# GitHub Pages Deployment Instructions

This application can be deployed to GitHub Pages by following these steps:

## Step 1: Create a Production Build

1. Run the command to create a production build:
```bash
npm run build
```

2. This will create a `dist` folder with the compiled application.

## Step 2: Configure for GitHub Pages

1. Create or update the `vite.config.ts` file to include a base path for GitHub Pages:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cartographer from '@replit/vite-plugin-cartographer';
import errorModal from '@replit/vite-plugin-runtime-error-modal';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cartographer(),
    errorModal(),
  ],
  // Set the base URL for GitHub Pages deployment
  // Replace 'your-repo-name' with your actual repository name
  base: '/your-repo-name/',
  build: {
    outDir: 'dist',
  },
});
```

## Step 3: Update the Router Configuration

Since GitHub Pages serves your app from a subdirectory, you need to update the router configuration to handle this correctly:

1. Modify your App.tsx file to use the correct base path:

```tsx
function App() {
  // Get the base URL from the environment or use the default
  const basePath = import.meta.env.BASE_URL || '/';

  return (
    <Router base={basePath}>
      {/* Your routes here */}
    </Router>
  );
}
```

## Step 4: Create a .github/workflows/deploy.yml file

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

## Step 5: Push to GitHub and Enable GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages"
4. Set the source to "GitHub Actions"

Your application will be deployed to `https://[your-username].github.io/[your-repo-name]`

## Note About Local Storage

This application uses localStorage to save progress. When testing on GitHub Pages, note that:

- The localStorage is domain-specific, so data won't transfer between your local development environment and the GitHub Pages deployment
- Each user will have their own independent progress storage
- Clearing browser data/cache will reset progress