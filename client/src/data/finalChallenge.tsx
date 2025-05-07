import { Module, Slide, Challenge } from "@/lib/types";

// Final Challenge slides content
const finalChallengeSlides: Slide[] = [
  {
    id: "final-challenge-intro",
    title: "The Final Cybersecurity Challenge",
    type: "intro",
    content: (
      <>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">Module 5 of 5</span>
        <h2 className="text-3xl font-bold font-inter text-neutral-800 mb-4">Comprehensive Security Challenge</h2>
        <p className="text-neutral-600 text-lg mb-6">Test your knowledge across all cybersecurity topics we've covered.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-spy-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Phishing Recognition</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-mail-lock-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Email Security</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-group-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Social Media Safety</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-robot-line text-primary text-xl mr-2"></i>
            <span className="font-medium">AI Chatbot Safety</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "final-challenge-instructions",
    title: "Challenge Instructions",
    type: "content",
    content: (
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold font-inter text-neutral-800 mb-6 text-center">How This Challenge Works</h3>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
              <i className="ri-trophy-line text-accent text-2xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-bold">Earn Your Cyber Champion Badge</h4>
              <p className="text-neutral-600">Complete this challenge to prove your cybersecurity expertise</p>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-bold">1</span>
              </div>
              <div>
                <h5 className="font-medium text-neutral-800">Comprehensive Scenarios</h5>
                <p className="text-neutral-600 text-sm">You'll face realistic scenarios that combine threats from all the modules.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-bold">2</span>
              </div>
              <div>
                <h5 className="font-medium text-neutral-800">Identify Multiple Threats</h5>
                <p className="text-neutral-600 text-sm">Each scenario will have various security concerns for you to identify.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-bold">3</span>
              </div>
              <div>
                <h5 className="font-medium text-neutral-800">Score at Least 70%</h5>
                <p className="text-neutral-600 text-sm">To earn the Cyber Champion badge, correctly identify at least 70% of the threats.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="font-bold">4</span>
              </div>
              <div>
                <h5 className="font-medium text-neutral-800">Apply Your Knowledge</h5>
                <p className="text-neutral-600 text-sm">Use everything you've learned about digital security to succeed.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg text-center">
          <p className="text-accent font-medium">Good luck! Remember that cybersecurity is about being observant and questioning suspicious elements.</p>
        </div>
      </div>
    ),
  },
];

// Final challenge items
const finalChallengeItems: Challenge = {
  id: "final-challenge-1",
  title: "Comprehensive Security Challenge",
  description: "Identify All Security Threats",
  scenario: "You've received a suspicious email, encountered a questionable social media post, and had an unusual AI chatbot interaction. Identify all the security concerns across these scenarios.",
  items: [
    // Email threats
    {
      id: "fc-item1",
      text: "Email sender address doesn't match company domain",
      description: "The email claims to be from Amazon but uses a different domain",
      isCorrect: true,
    },
    {
      id: "fc-item2",
      text: "Email contains an urgent call to action",
      description: "The message creates false urgency to prompt immediate action",
      isCorrect: true,
    },
    {
      id: "fc-item3",
      text: "Email attachment has an executable (.exe) file",
      description: "Executable attachments often contain malware",
      isCorrect: true,
    },
    {
      id: "fc-item4",
      text: "Email requests password verification",
      description: "Legitimate companies never ask for your password via email",
      isCorrect: true,
    },
    
    // Social media threats
    {
      id: "fc-item5",
      text: "Social post shares home address and vacation dates",
      description: "Announcing when a home will be empty is a security risk",
      isCorrect: true,
    },
    {
      id: "fc-item6",
      text: "Account uses public visibility for personal information",
      description: "Making personal information publicly available increases risk",
      isCorrect: true,
    },
    {
      id: "fc-item7",
      text: "Profile has location tracking enabled for all posts",
      description: "Automatic location sharing reveals patterns and current location",
      isCorrect: true,
    },
    {
      id: "fc-item8",
      text: "Social post includes a suspicious shortened link",
      description: "Shortened links can hide malicious destinations",
      isCorrect: true,
    },
    
    // AI chatbot threats
    {
      id: "fc-item9",
      text: "User shared credit card details with an AI chatbot",
      description: "Financial information should never be shared with AI systems",
      isCorrect: true,
    },
    {
      id: "fc-item10",
      text: "AI chatbot asks for login credentials to help with account",
      description: "Never share passwords or login credentials with any AI system",
      isCorrect: true,
    },
    {
      id: "fc-item11",
      text: "User requested medical diagnosis from an AI chatbot",
      description: "AI should not be used for professional medical advice",
      isCorrect: true,
    },
    {
      id: "fc-item12",
      text: "AI chatbot doesn't have a clear privacy policy link",
      description: "Unable to verify how your conversation data will be used",
      isCorrect: true,
    },
    
    // Safe items (incorrect options)
    {
      id: "fc-item13",
      text: "Email includes the company's logo",
      description: "Both legitimate and fraudulent emails may include company logos",
      isCorrect: false,
    },
    {
      id: "fc-item14",
      text: "Social post includes a photo of a pet",
      description: "Sharing pet photos generally presents minimal security risk",
      isCorrect: false,
    },
    {
      id: "fc-item15",
      text: "AI chatbot was asked for help with general math problem",
      description: "This is a safe use of AI that doesn't involve personal information",
      isCorrect: false,
    },
  ],
  points: 100,
};

// Final challenge module
export const finalChallengeModule: Module = {
  id: "final-challenge",
  title: "Final Challenge",
  subtitle: "Test your complete cybersecurity knowledge",
  icon: "trophy-line",
  duration: "20 min",
  pointsAvailable: 100,
  order: 5,
  slides: finalChallengeSlides,
  quizzes: [],
  challenges: [finalChallengeItems],
};
