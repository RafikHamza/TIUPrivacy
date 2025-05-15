// GitHub Pages deployment script
import { execSync } from 'child_process';

// Build the app using the GitHub Pages specific config
console.log('Building the application for GitHub Pages...');
execSync('npx vite build --config vite.github-pages.config.ts', { stdio: 'inherit' });

// Create .nojekyll file and copy 404.html
console.log('Creating .nojekyll file and copying 404.html...');
execSync('New-Item -ItemType File -Path dist/.nojekyll -Force; Copy-Item "client/public/404.html" -Destination "dist/404.html" -Force', { stdio: 'inherit', shell: 'powershell.exe' });

// If deploying manually, you would push the dist folder to the gh-pages branch
console.log('\nBuild completed successfully!');
console.log('\nTo deploy manually:');
console.log('1. Commit the dist folder to your gh-pages branch');
console.log('2. Push to GitHub');
console.log('\nOr use the configured GitHub Action for automatic deployment.');