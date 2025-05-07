import { Module, Slide, Quiz, Challenge } from "@/lib/types";

// AI Chatbots slides content
const aiChatbotsSlides: Slide[] = [
  {
    id: "ai-chatbots-intro",
    title: "Introduction to AI Chatbot Safety",
    type: "intro",
    content: (
      <>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">Module 4 of 5</span>
        <h2 className="text-3xl font-bold font-inter text-neutral-800 mb-4">AI Chatbot Safety</h2>
        <p className="text-neutral-600 text-lg mb-6">Learn how to safely interact with AI-powered chatbots while protecting your personal information.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-robot-line text-primary text-xl mr-2"></i>
            <span className="font-medium">AI Limitations</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-lock-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Data Privacy</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-shield-check-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Safe Usage</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "ai-chatbots-understanding",
    title: "Understanding AI Chatbots",
    type: "content",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="flex flex-col justify-center items-start text-left">
          <h3 className="text-neutral-800 text-2xl font-bold font-inter mb-4">Understanding AI Chatbots</h3>
          <p className="text-neutral-600 mb-4">
            AI chatbots are computer programs that use artificial intelligence to simulate conversation with humans. They have become increasingly popular for customer service, information retrieval, and general assistance.
          </p>
          <div className="bg-primary/10 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-primary mb-2">How AI Chatbots Work:</h4>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start">
                <i className="ri-arrow-right-circle-line text-primary mr-2 mt-1"></i>
                <span>Trained on large datasets of text from the internet</span>
              </li>
              <li className="flex items-start">
                <i className="ri-arrow-right-circle-line text-primary mr-2 mt-1"></i>
                <span>Generate responses based on patterns in training data</span>
              </li>
              <li className="flex items-start">
                <i className="ri-arrow-right-circle-line text-primary mr-2 mt-1"></i>
                <span>May have access to specific knowledge bases or tools</span>
              </li>
              <li className="flex items-start">
                <i className="ri-arrow-right-circle-line text-primary mr-2 mt-1"></i>
                <span>Often collect conversation data to improve over time</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm border border-neutral-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-robot-line text-accent"></i>
              </div>
              <div>
                <h4 className="font-bold">AI Chatbot Limitations</h4>
                <p className="text-sm text-neutral-500">Important to understand</p>
              </div>
            </div>
            
            <ul className="space-y-3">
              <li className="pb-2 border-b border-neutral-100 flex items-start">
                <i className="ri-error-warning-line text-warning mr-2 mt-0.5"></i>
                <p className="text-sm text-neutral-600">May provide incorrect or outdated information</p>
              </li>
              <li className="pb-2 border-b border-neutral-100 flex items-start">
                <i className="ri-error-warning-line text-warning mr-2 mt-0.5"></i>
                <p className="text-sm text-neutral-600">Cannot truly verify facts or check sources</p>
              </li>
              <li className="pb-2 border-b border-neutral-100 flex items-start">
                <i className="ri-error-warning-line text-warning mr-2 mt-0.5"></i>
                <p className="text-sm text-neutral-600">May have inherent biases from training data</p>
              </li>
              <li className="flex items-start">
                <i className="ri-error-warning-line text-warning mr-2 mt-0.5"></i>
                <p className="text-sm text-neutral-600">Not a replacement for professional advice (medical, legal, etc.)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ai-chatbots-privacy",
    title: "Protecting Your Privacy with AI Chatbots",
    type: "content",
    content: (
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-8 w-full h-full">
        <h3 className="text-neutral-800 text-2xl font-bold font-inter mb-6 text-center">Protecting Your Privacy with AI Chatbots</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-forbid-line text-destructive text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Never Share</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span><strong>Personal identifiers:</strong> SSN, ID numbers, full birth date</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span><strong>Financial information:</strong> Account numbers, credit card details</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span><strong>Authentication:</strong> Passwords, security questions, codes</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span><strong>Private addresses:</strong> Home, work, or frequently visited locations</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span><strong>Medical details:</strong> Health conditions, medication information</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-shield-check-line text-success text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Best Practices</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span><strong>Read privacy policies:</strong> Understand how your data is used</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span><strong>Check data retention:</strong> Know how long conversations are stored</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span><strong>Use anonymized details:</strong> When examples are needed</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span><strong>Clear conversation history:</strong> When available after sensitive topics</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span><strong>Be selective:</strong> Only use trusted, reputable AI services</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ai-chatbots-usage",
    title: "Safe and Responsible AI Chatbot Usage",
    type: "summary",
    content: (
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold font-inter text-neutral-800 mb-6">Safe and Responsible AI Chatbot Usage</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-file-search-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Verify Information</h4>
            <p className="text-sm text-neutral-600">Always verify important information from AI chatbots with reliable sources.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-user-settings-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Control Permissions</h4>
            <p className="text-sm text-neutral-600">Review and limit what permissions and data access AI apps have.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-parent-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Supervise Children</h4>
            <p className="text-sm text-neutral-600">Monitor children's interactions with AI chatbots and review privacy settings.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-error-warning-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Recognize Limitations</h4>
            <p className="text-sm text-neutral-600">Understand that AI may provide incorrect information and can't replace experts.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-question-answer-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Be Specific</h4>
            <p className="text-sm text-neutral-600">Use clear, specific prompts to get more accurate and useful responses.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-logout-circle-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Log Out & Update</h4>
            <p className="text-sm text-neutral-600">Sign out of AI services when not in use and keep apps updated for security.</p>
          </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg inline-block">
          <p className="text-accent font-medium">Remember: AI chatbots can be useful tools when used responsibly and with appropriate privacy considerations.</p>
        </div>
      </div>
    ),
  },
];

// AI chatbots quizzes
const aiChatbotsQuizzes: Quiz[] = [
  {
    id: "ai-chatbots-quiz-1",
    question: "Which of the following should you NOT share with an AI chatbot?",
    options: [
      {
        id: "ai1-opt1",
        text: "General questions about public topics",
        isCorrect: false,
      },
      {
        id: "ai1-opt2",
        text: "Your professional industry",
        isCorrect: false,
      },
      {
        id: "ai1-opt3",
        text: "Your social security number or government ID",
        isCorrect: true,
      },
      {
        id: "ai1-opt4",
        text: "Questions about historical events",
        isCorrect: false,
      },
    ],
    explanation: "Never share sensitive personal identifiers like your social security number, as this information could be stored in the AI's logs and potentially compromised.",
    points: 10,
  },
  {
    id: "ai-chatbots-quiz-2",
    question: "Why is it important to verify information provided by AI chatbots?",
    options: [
      {
        id: "ai2-opt1",
        text: "AI chatbots charge fees for accurate information",
        isCorrect: false,
      },
      {
        id: "ai2-opt2",
        text: "AI chatbots may provide incorrect or outdated information",
        isCorrect: true,
      },
      {
        id: "ai2-opt3",
        text: "AI chatbots only work with verified information",
        isCorrect: false,
      },
      {
        id: "ai2-opt4",
        text: "AI chatbots are programmed to always provide false information",
        isCorrect: false,
      },
    ],
    explanation: "AI chatbots generate responses based on patterns in their training data and may produce inaccurate, outdated, or fabricated information. Always verify important facts from reliable sources.",
    points: 15,
  },
  {
    id: "ai-chatbots-quiz-3",
    question: "What is a best practice when using AI chatbots for assistance?",
    options: [
      {
        id: "ai3-opt1",
        text: "Share detailed medical conditions to get accurate health advice",
        isCorrect: false,
      },
      {
        id: "ai3-opt2",
        text: "Use them as replacements for professional legal or medical advice",
        isCorrect: false,
      },
      {
        id: "ai3-opt3",
        text: "Be specific in your questions to get more relevant answers",
        isCorrect: true,
      },
      {
        id: "ai3-opt4",
        text: "Always provide your full name and location for personalized help",
        isCorrect: false,
      },
    ],
    explanation: "Being specific in your prompts helps the AI understand exactly what you're asking, resulting in more accurate and relevant responses without needing to share personal information.",
    points: 15,
  },
];

// AI chatbots challenge
const aiChatbotsChallenge: Challenge = {
  id: "ai-chatbots-challenge-1",
  title: "AI Chatbot Safety Challenge",
  description: "Identify Safe vs. Unsafe Interactions",
  scenario: "Review these conversation examples with AI chatbots and identify which interactions are unsafe or risky.",
  items: [
    {
      id: "aic-item1",
      text: "Asking the AI for help writing a general cover letter",
      description: "This is a safe use case that doesn't require sharing sensitive personal information",
      isCorrect: false,
    },
    {
      id: "aic-item2",
      text: "Sharing your credit card details to get purchase recommendations",
      description: "Financial information should never be shared with AI chatbots",
      isCorrect: true,
    },
    {
      id: "aic-item3",
      text: "Asking the AI to diagnose specific medical symptoms you're experiencing",
      description: "Seeking medical diagnosis from AI is risky and should be done by professionals",
      isCorrect: true,
    },
    {
      id: "aic-item4",
      text: "Asking the AI to help with homework by explaining a math concept",
      description: "Educational assistance without sharing personal details is generally safe",
      isCorrect: false,
    },
    {
      id: "aic-item5",
      text: "Providing your home address to get local restaurant recommendations",
      description: "Sharing your exact address is unnecessary and risky - a general area is sufficient",
      isCorrect: true,
    },
    {
      id: "aic-item6",
      text: "Discussing confidential work projects with specific details",
      description: "Sharing confidential work information could violate NDAs and company policies",
      isCorrect: true,
    },
    {
      id: "aic-item7",
      text: "Asking for a summary of a public news article",
      description: "Requesting information about public content is a safe use of AI",
      isCorrect: false,
    },
    {
      id: "aic-item8",
      text: "Sharing your login credentials to get help with an account issue",
      description: "Never share passwords or login credentials with any AI system",
      isCorrect: true,
    },
  ],
  points: 30,
};

// AI Chatbots module
export const aiChatbotsModule: Module = {
  id: "ai-chatbots",
  title: "AI Chatbot Safety",
  subtitle: "Learn to safely interact with AI assistants",
  icon: "robot-line",
  duration: "15 min",
  pointsAvailable: 70,
  order: 4,
  slides: aiChatbotsSlides,
  quizzes: aiChatbotsQuizzes,
  challenges: [aiChatbotsChallenge],
};
