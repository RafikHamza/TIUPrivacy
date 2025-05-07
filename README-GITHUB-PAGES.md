# Cybersecurity Education Application for GitHub Pages

## Introduction to Digital Privacy and Data Security (SPRING)

This web application is part of the "Introduction to Digital Privacy and Data Security (SPRING)" course taught by Prof. HAMZA Rafik. It provides interactive educational content about phishing attacks, email safety, social media security, and AI chatbot safety.

## Deployment to GitHub Pages

This application is configured for deployment to GitHub Pages using either GitHub Actions (automated) or manual deployment.

### Automated Deployment (Recommended)

1. Push your changes to the main branch of your repository.
2. GitHub Actions will automatically build and deploy the application to GitHub Pages using the workflow defined in `.github/workflows/deploy.yml`.
3. Your application will be available at `https://[your-username].github.io/[your-repo-name]/`.

### Manual Deployment

If you prefer to deploy manually:

1. Run the deployment script:
   ```bash
   node deploy-to-gh-pages.js
   ```
2. This will build the application using the GitHub Pages specific configuration.
3. Commit the generated files in the `dist` directory to the `gh-pages` branch.
4. Push the `gh-pages` branch to GitHub.

## Configuration

1. Update the `base` path in `vite.github-pages.config.ts` to match your repository name:
   ```typescript
   base: "/your-repo-name/",
   ```

2. If needed, modify the GitHub Actions workflow in `.github/workflows/deploy.yml` to suit your requirements.

## Features

- Interactive educational modules on cybersecurity topics
- Quizzes and challenges to test knowledge
- Progress tracking
- Badges and points for completion
- Mobile-responsive design

## Course Information

- **Course Title**: Introduction to Digital Privacy and Data Security (SPRING)
- **Instructor**: Prof. HAMZA Rafik
- **Course Description**: This course focuses on three key areas: (1) cybersecurity basics, (2) digital privacy, and (3) data security. It provides an overview of cybersecurity, highlights the fundamentals of protecting personal information, and explores the challenges of digital business applications.
- **Objectives**: To understand the concepts of data privacy, digital footprints, and online security. To apply basic methods for securing personal information online, including encryption, authentication, and safe browsing practices.

## Technical Notes

- Built with React, TypeScript, and Vite
- Progress is stored in browser localStorage
- Styled with Tailwind CSS and shadcn/ui components
- Responsive design for desktop and mobile