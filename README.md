# PhishingSafetyTrainer

An interactive web application for learning about cybersecurity, phishing prevention, and digital safety.

## Features

- 🎮 Interactive Games: Hands-on learning through simulations and quizzes
- 🔒 Password Strength Training: Learn to create secure passwords
- 📧 Phishing Simulator: Practice identifying phishing attempts
- 📚 Security Quiz: Test your cybersecurity knowledge
- 🎯 Progress Tracking: Track your learning journey with points and badges

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/PhishingSafetyTrainer.git
cd PhishingSafetyTrainer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## Building for Production

To build the application for production:

```bash
npm run build
```

## GitHub Pages Deployment

The application is configured for automatic deployment to GitHub Pages.

### Manual Deployment

1. Build for GitHub Pages:
```bash
npm run build:gh-pages
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Automatic Deployment

The repository is configured with a GitHub Action that automatically deploys changes to GitHub Pages when you push to the main branch.

To enable automatic deployments:

1. Go to your repository's Settings
2. Navigate to Pages section
3. Set the Source to "GitHub Actions"
4. Push changes to the main branch

The Action will:
- Build the application
- Create necessary GitHub Pages files
- Deploy to your GitHub Pages site

Your site will be available at: https://yourusername.github.io/PhishingSafetyTrainer/

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
