import { Module, Slide, Quiz, Challenge } from "@/lib/types";

// Phishing slides content
const phishingSlides: Slide[] = [
  {
    id: "phishing-intro",
    title: "Introduction to Phishing",
    type: "intro",
    content: (
      <>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">Module 1 of 5</span>
        <h2 className="text-3xl font-bold font-inter text-neutral-800 mb-4">Recognizing Phishing Attacks</h2>
        <p className="text-neutral-600 text-lg mb-6">Learn how to identify and avoid phishing attempts to protect your personal information.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-mail-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Email Scams</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-link text-primary text-xl mr-2"></i>
            <span className="font-medium">Fake Websites</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-message-2-line text-primary text-xl mr-2"></i>
            <span className="font-medium">SMS Phishing</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "phishing-types",
    title: "Common Types of Phishing",
    type: "content",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center items-start text-left">
          <h3 className="text-primary text-2xl font-bold font-inter mb-4">Types of Phishing Attacks</h3>
          <ul className="text-neutral-700 space-y-3">
            <li className="flex items-start">
              <i className="ri-spam-2-line text-destructive mt-1 mr-2"></i>
              <span><strong>Email Phishing:</strong> Mass-sent emails impersonating legitimate organizations</span>
            </li>
            <li className="flex items-start">
              <i className="ri-message-2-line text-destructive mt-1 mr-2"></i>
              <span><strong>Smishing:</strong> SMS text messages with malicious links</span>
            </li>
            <li className="flex items-start">
              <i className="ri-user-voice-line text-destructive mt-1 mr-2"></i>
              <span><strong>Vishing:</strong> Voice calls claiming to be from trusted entities</span>
            </li>
            <li className="flex items-start">
              <i className="ri-spy-line text-destructive mt-1 mr-2"></i>
              <span><strong>Spear Phishing:</strong> Targeted attacks using personal information</span>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-virus-line text-destructive"></i>
              </div>
              <h4 className="font-bold text-lg">Phishing Statistics</h4>
            </div>
            <ul className="space-y-3">
              <li className="pb-2 border-b border-neutral-100">
                <p className="text-sm text-neutral-600">Phishing accounts for over 80% of reported security incidents</p>
              </li>
              <li className="pb-2 border-b border-neutral-100">
                <p className="text-sm text-neutral-600">1 in 99 emails is a phishing attack</p>
              </li>
              <li className="pb-2 border-b border-neutral-100">
                <p className="text-sm text-neutral-600">65% of attack groups use spear phishing as their primary infection vector</p>
              </li>
              <li>
                <p className="text-sm text-neutral-600">Phishing attacks increased 350% during the COVID-19 pandemic</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "phishing-signs",
    title: "Warning Signs of Phishing",
    type: "content",
    content: (
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 w-full h-full">
        <h3 className="text-neutral-800 text-2xl font-bold font-inter mb-6 text-center">Warning Signs of Phishing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-mail-line text-destructive text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Email Red Flags</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Urgent action required or threatening language</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Misspelled domain names or sender addresses</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Poor grammar and spelling errors</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Unfamiliar or overly generic greetings</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-link text-destructive text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Link & Website Dangers</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Mismatched or suspicious URLs in hover text</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Missing HTTPS or security certificates</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Request for personal or financial information</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-destructive mr-2 mt-1"></i>
                <span>Suspicious attachments or download prompts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "phishing-protection",
    title: "How to Protect Yourself",
    type: "summary",
    content: (
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold font-inter text-neutral-800 mb-6">Protecting Yourself from Phishing</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-shield-check-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Verify Sources</h4>
            <p className="text-sm text-neutral-600">Always check email sender addresses carefully and contact companies directly through official channels.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-link-check-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Check URLs</h4>
            <p className="text-sm text-neutral-600">Hover over links before clicking to see the actual destination. Look for https:// and correct domains.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-lock-password-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Use 2FA</h4>
            <p className="text-sm text-neutral-600">Enable two-factor authentication on all accounts to prevent unauthorized access.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-file-damage-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Be Cautious with Attachments</h4>
            <p className="text-sm text-neutral-600">Don't open unexpected attachments, especially executable files or documents requesting macros.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-alarm-warning-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Question Urgency</h4>
            <p className="text-sm text-neutral-600">Be skeptical of messages creating a sense of urgency or fear to push you into quick actions.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-update-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Keep Software Updated</h4>
            <p className="text-sm text-neutral-600">Regularly update your browsers, antivirus, and operating systems to protect against vulnerabilities.</p>
          </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg inline-block">
          <p className="text-accent font-medium">Remember: Legitimate organizations will never ask for sensitive information via email, text, or calls.</p>
        </div>
      </div>
    ),
  },
];

// Phishing quizzes
const phishingQuizzes: Quiz[] = [
  {
    id: "phishing-quiz-1",
    question: "Which of the following is a common sign of a phishing email?",
    options: [
      {
        id: "p1-opt1",
        text: "A personalized greeting with your correct name",
        isCorrect: false,
      },
      {
        id: "p1-opt2",
        text: "Urgent language demanding immediate action",
        isCorrect: true,
      },
      {
        id: "p1-opt3",
        text: "Links that match the text shown when hovering",
        isCorrect: false,
      },
      {
        id: "p1-opt4",
        text: "A clear company policy referenced in the email",
        isCorrect: false,
      },
    ],
    explanation: "Phishing emails often create a false sense of urgency to make you act quickly without thinking.",
    points: 10,
  },
  {
    id: "phishing-quiz-2",
    question: "When you receive an unexpected email claiming to be from your bank, what should you do?",
    options: [
      {
        id: "p2-opt1",
        text: "Click the link in the email to check if your account is secure",
        isCorrect: false,
      },
      {
        id: "p2-opt2",
        text: "Reply to the email with your account information",
        isCorrect: false,
      },
      {
        id: "p2-opt3",
        text: "Open any attachments to see what they contain",
        isCorrect: false,
      },
      {
        id: "p2-opt4",
        text: "Contact your bank directly using their official phone number or website",
        isCorrect: true,
      },
    ],
    explanation: "Never click links in suspicious emails. Always contact organizations directly through their official channels.",
    points: 15,
  },
  {
    id: "phishing-quiz-3",
    question: "Which of these is NOT a good way to protect against phishing attacks?",
    options: [
      {
        id: "p3-opt1",
        text: "Using two-factor authentication on your accounts",
        isCorrect: false,
      },
      {
        id: "p3-opt2",
        text: "Sharing suspicious emails with friends to get their opinion",
        isCorrect: true,
      },
      {
        id: "p3-opt3",
        text: "Checking the sender's email address for misspellings or unexpected domains",
        isCorrect: false,
      },
      {
        id: "p3-opt4",
        text: "Hovering over links to verify the destination before clicking",
        isCorrect: false,
      },
    ],
    explanation: "Forwarding suspicious emails can spread potential threats. Report them to your IT department or delete them instead.",
    points: 15,
  },
];

// Phishing challenge
const phishingChallenge: Challenge = {
  id: "phishing-challenge-1",
  title: "Phishing Email Detection Challenge",
  description: "Identify the Phishing Signals",
  scenario: "Review this email and identify all the elements that suggest it's a phishing attempt.",
  items: [
    {
      id: "pc-item1",
      text: "Generic greeting ('Dear Customer')",
      description: "Legitimate companies usually use your name in communications",
      isCorrect: true,
    },
    {
      id: "pc-item2",
      text: "Urgency ('Account will be deactivated in 24 hours')",
      description: "Creating false urgency is a common phishing tactic",
      isCorrect: true,
    },
    {
      id: "pc-item3",
      text: "Suspicious sender address ('amazon-security@mail-verify.com')",
      description: "The domain doesn't match the official Amazon domain",
      isCorrect: true,
    },
    {
      id: "pc-item4",
      text: "Requests sensitive information (password and credit card)",
      description: "Legitimate companies never ask for full passwords or credit card info by email",
      isCorrect: true,
    },
    {
      id: "pc-item5",
      text: "URL doesn't match company ('amzn-verify.net/account')",
      description: "The link doesn't lead to the official amazon.com domain",
      isCorrect: true,
    },
    {
      id: "pc-item6",
      text: "The email mentions an order number",
      description: "Including an order number is standard in legitimate communications",
      isCorrect: false,
    },
    {
      id: "pc-item7",
      text: "The email includes a contact phone number",
      description: "Including contact information is common in both legitimate and phishing emails",
      isCorrect: false,
    },
    {
      id: "pc-item8",
      text: "The email has the company logo",
      description: "Phishers commonly include official logos to appear legitimate",
      isCorrect: false,
    },
  ],
  points: 30,
};

// Phishing module
export const phishingModule: Module = {
  id: "phishing",
  title: "Phishing Recognition",
  subtitle: "Learn to identify and avoid phishing attacks",
  icon: "spy-line",
  duration: "15 min",
  pointsAvailable: 70,
  order: 1,
  slides: phishingSlides,
  quizzes: phishingQuizzes,
  challenges: [phishingChallenge],
};
