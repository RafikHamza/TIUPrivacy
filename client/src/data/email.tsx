import { Module, Slide, Quiz, Challenge } from "@/lib/types";

// Email slides content
const emailSlides: Slide[] = [
  {
    id: "email-intro",
    title: "Introduction to Email Safety",
    type: "intro",
    content: (
      <>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">Module 2 of 5</span>
        <h2 className="text-3xl font-bold font-inter text-neutral-800 mb-4">Email Safety</h2>
        <p className="text-neutral-600 text-lg mb-6">Learn how to protect yourself from email-based threats and keep your information secure.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-mail-lock-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Secure Email</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-attachment-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Attachment Safety</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-spam-2-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Spam Detection</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "email-threats",
    title: "Common Email Threats",
    type: "content",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center items-start text-left">
          <h3 className="text-neutral-800 text-2xl font-bold font-inter mb-4">Common Email Threats</h3>
          <ul className="text-neutral-700 space-y-3">
            <li className="flex items-start">
              <i className="ri-spam-2-line text-destructive mt-1 mr-2"></i>
              <span><strong>Phishing:</strong> Deceptive emails trying to steal credentials or information</span>
            </li>
            <li className="flex items-start">
              <i className="ri-virus-line text-destructive mt-1 mr-2"></i>
              <span><strong>Malware:</strong> Malicious software delivered via email attachments</span>
            </li>
            <li className="flex items-start">
              <i className="ri-money-dollar-circle-line text-destructive mt-1 mr-2"></i>
              <span><strong>Scams:</strong> Fraudulent schemes like fake invoices or prize notifications</span>
            </li>
            <li className="flex items-start">
              <i className="ri-account-circle-line text-destructive mt-1 mr-2"></i>
              <span><strong>Spoofing:</strong> Emails that appear to be from trusted sources but aren't</span>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-mail-warning-line text-primary"></i>
              </div>
              <h4 className="font-bold text-lg">Email Threat Statistics</h4>
            </div>
            <ul className="space-y-3">
              <li className="pb-2 border-b border-neutral-100">
                <p className="text-sm text-neutral-600">94% of malware is delivered via email</p>
              </li>
              <li className="pb-2 border-b border-neutral-100">
                <p className="text-sm text-neutral-600">Phishing accounts for more than 80% of reported security incidents</p>
              </li>
              <li className="pb-2 border-b border-neutral-100">
                <p className="text-sm text-neutral-600">Business email compromise costs organizations over $1.8 billion annually</p>
              </li>
              <li>
                <p className="text-sm text-neutral-600">The average user receives 16 malicious emails per month</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "email-safety-tips",
    title: "Email Safety Best Practices",
    type: "content",
    content: (
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 w-full h-full">
        <h3 className="text-neutral-800 text-2xl font-bold font-inter mb-6 text-center">Email Safety Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-shield-check-line text-primary text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Authentication</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Use strong, unique passwords for email accounts</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Enable two-factor authentication when available</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Never share login credentials via email</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Log out of email accounts on shared devices</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-file-text-line text-primary text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Content Safety</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Verify sender addresses before responding</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Don't open unexpected attachments</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Hover over links to check destination URLs</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                <span>Be wary of urgent requests and pressure tactics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "email-security-tools",
    title: "Email Security Tools",
    type: "summary",
    content: (
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold font-inter text-neutral-800 mb-6">Tools to Enhance Email Security</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-spam-2-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Spam Filters</h4>
            <p className="text-sm text-neutral-600">Block unwanted emails and keep your inbox clean. Make sure they're enabled in your email settings.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-virus-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Antivirus Software</h4>
            <p className="text-sm text-neutral-600">Scans attachments for malware before you open them. Keep it updated for best protection.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-lock-password-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Password Managers</h4>
            <p className="text-sm text-neutral-600">Generate and store strong, unique passwords for all your email and online accounts.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-fingerprint-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
            <p className="text-sm text-neutral-600">Adds an extra layer of security beyond your password using your phone or security key.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-mail-check-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Email Verification Tools</h4>
            <p className="text-sm text-neutral-600">Services that can help verify if an email is legitimate or potentially harmful.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-shield-keyhole-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Email Encryption</h4>
            <p className="text-sm text-neutral-600">Protects sensitive content in your emails from unauthorized access.</p>
          </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg inline-block">
          <p className="text-accent font-medium">Remember: The best security tool is a cautious approach to all unexpected or suspicious emails.</p>
        </div>
      </div>
    ),
  },
];

// Email quizzes
const emailQuizzes: Quiz[] = [
  {
    id: "email-quiz-1",
    question: "Which of these is a sign of a potentially suspicious email?",
    options: [
      {
        id: "e1-opt1",
        text: "The email comes from a company you regularly do business with",
        isCorrect: false,
      },
      {
        id: "e1-opt2",
        text: "The email requests you to verify your password immediately",
        isCorrect: true,
      },
      {
        id: "e1-opt3",
        text: "The email has the company's correct logo",
        isCorrect: false,
      },
      {
        id: "e1-opt4",
        text: "The email address matches the company's domain",
        isCorrect: false,
      },
    ],
    explanation: "Legitimate companies will never ask you to verify your password via email. This is a common phishing tactic.",
    points: 10,
  },
  {
    id: "email-quiz-2",
    question: "What should you do before opening an email attachment?",
    options: [
      {
        id: "e2-opt1",
        text: "Open it immediately if it looks important",
        isCorrect: false,
      },
      {
        id: "e2-opt2",
        text: "Forward it to colleagues to see if they received it too",
        isCorrect: false,
      },
      {
        id: "e2-opt3",
        text: "Verify that you were expecting an attachment from that sender",
        isCorrect: true,
      },
      {
        id: "e2-opt4",
        text: "Reply to the sender asking what the attachment contains",
        isCorrect: false,
      },
    ],
    explanation: "Always verify that you were expecting an attachment from the sender before opening it, as unexpected attachments may contain malware.",
    points: 15,
  },
  {
    id: "email-quiz-3",
    question: "Which email security practice is most effective?",
    options: [
      {
        id: "e3-opt1",
        text: "Using the same password across all your email accounts",
        isCorrect: false,
      },
      {
        id: "e3-opt2",
        text: "Clicking 'unsubscribe' in all promotional emails",
        isCorrect: false,
      },
      {
        id: "e3-opt3",
        text: "Enabling two-factor authentication",
        isCorrect: true,
      },
      {
        id: "e3-opt4",
        text: "Opening emails in a private browsing window",
        isCorrect: false,
      },
    ],
    explanation: "Two-factor authentication adds an extra layer of security by requiring something you know (password) and something you have (like your phone) to access your account.",
    points: 15,
  },
];

// Email challenge
const emailChallenge: Challenge = {
  id: "email-challenge-1",
  title: "Email Threat Detection Challenge",
  description: "Identify the Email Security Risks",
  scenario: "Review this email and identify all the elements that suggest it might be dangerous or fraudulent.",
  items: [
    {
      id: "ec-item1",
      text: "Sender address doesn't match the company name",
      description: "The email claims to be from PayPal but comes from a different domain",
      isCorrect: true,
    },
    {
      id: "ec-item2",
      text: "Urgency in the subject line ('Act Now!')",
      description: "Creating false urgency is a common tactic to make recipients act without thinking",
      isCorrect: true,
    },
    {
      id: "ec-item3",
      text: "Requesting password or account information",
      description: "Legitimate companies never ask for your password or full account details via email",
      isCorrect: true,
    },
    {
      id: "ec-item4",
      text: "Suspicious attachment (.exe file)",
      description: "Executable files in emails are rarely legitimate and often contain malware",
      isCorrect: true,
    },
    {
      id: "ec-item5",
      text: "Poor grammar and spelling errors",
      description: "Professional companies have proper editing processes; errors often indicate phishing",
      isCorrect: true,
    },
    {
      id: "ec-item6",
      text: "Contains the company's logo",
      description: "Many fraudulent emails copy legitimate logos to appear authentic",
      isCorrect: false,
    },
    {
      id: "ec-item7",
      text: "Includes a phone number to call",
      description: "Both legitimate and fraudulent emails may include contact information",
      isCorrect: false,
    },
    {
      id: "ec-item8",
      text: "Generic greeting ('Dear Customer')",
      description: "Legitimate emails from companies you do business with often use your name",
      isCorrect: true,
    },
  ],
  points: 30,
};

// Email module
export const emailModule: Module = {
  id: "email",
  title: "Email Safety",
  subtitle: "Protect yourself from email-based threats",
  icon: "mail-lock-line",
  duration: "15 min",
  pointsAvailable: 70,
  order: 2,
  slides: emailSlides,
  quizzes: emailQuizzes,
  challenges: [emailChallenge],
};
