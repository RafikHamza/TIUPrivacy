// GitHub Pages deployment script
const { execSync } = require('child_process');

// Build the app using the GitHub Pages specific config
console.log('Building the application for GitHub Pages...');
execSync('npx vite build --config vite.github-pages.config.ts', { stdio: 'inherit' });

// Create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
console.log('Creating .nojekyll file...');
execSync('touch dist/.nojekyll', { stdio: 'inherit' });

// If deploying manually, you would push the dist folder to the gh-pages branch
console.log('\nBuild completed successfully!');
console.log('\nTo deploy manually:');
console.log('1. Commit the dist folder to your gh-pages branch');
console.log('2. Push to GitHub');
console.log('\nOr use the configured GitHub Action for automatic deployment.');