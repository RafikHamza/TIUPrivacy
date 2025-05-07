import { Module, Slide, Quiz, Challenge } from "@/lib/types";

// Social Media slides content
const socialMediaSlides: Slide[] = [
  {
    id: "social-media-intro",
    title: "Introduction to Social Media Safety",
    type: "intro",
    content: (
      <>
        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">Module 3 of 5</span>
        <h2 className="text-3xl font-bold font-inter text-neutral-800 mb-4">Staying Safe on Social Media</h2>
        <p className="text-neutral-600 text-lg mb-6">Learn how to identify risks and protect your personal information while using social media platforms.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-lock-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Privacy Settings</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-user-follow-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Safe Connections</span>
          </div>
          <div className="bg-white/90 p-3 rounded-lg shadow-sm flex items-center">
            <i className="ri-eye-line text-primary text-xl mr-2"></i>
            <span className="font-medium">Information Sharing</span>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "social-media-privacy",
    title: "Privacy Settings Matter",
    type: "content",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full bg-neutral-800 p-8 rounded-xl">
        <div className="flex flex-col justify-center items-start text-left">
          <h3 className="text-white text-2xl font-bold font-inter mb-4">Privacy Settings Matter</h3>
          <ul className="text-white/90 space-y-3">
            <li className="flex items-start">
              <i className="ri-check-line text-success mt-1 mr-2"></i>
              <span>Review privacy settings regularly on all platforms</span>
            </li>
            <li className="flex items-start">
              <i className="ri-check-line text-success mt-1 mr-2"></i>
              <span>Limit who can see your posts and personal information</span>
            </li>
            <li className="flex items-start">
              <i className="ri-check-line text-success mt-1 mr-2"></i>
              <span>Use two-factor authentication when available</span>
            </li>
            <li className="flex items-start">
              <i className="ri-check-line text-success mt-1 mr-2"></i>
              <span>Be cautious about location sharing and check-ins</span>
            </li>
          </ul>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm">
            <div className="border-b border-neutral-200 pb-3 mb-3">
              <h4 className="font-medium text-neutral-800">Privacy Settings</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Who can see your posts</span>
                <span className="text-sm font-medium bg-neutral-100 px-2 py-1 rounded">Friends Only</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile visibility</span>
                <span className="text-sm font-medium bg-neutral-100 px-2 py-1 rounded">Limited</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Location sharing</span>
                <span className="text-sm font-medium bg-destructive/10 text-destructive px-2 py-1 rounded">Off</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-factor authentication</span>
                <span className="text-sm font-medium bg-success/10 text-success px-2 py-1 rounded">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "social-media-sharing",
    title: "Think Before You Share",
    type: "content",
    content: (
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl w-full h-full">
        <h3 className="text-neutral-800 text-2xl font-bold font-inter mb-6 text-center">Think Before You Share</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Do's column */}
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-thumb-up-line text-success text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Safe Sharing</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span>Share with trusted groups only</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span>Review friend/connection requests carefully</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span>Check sources before resharing information</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-line text-success mr-2 mt-1"></i>
                <span>Use direct messages for sensitive conversations</span>
              </li>
            </ul>
          </div>
          
          {/* Don'ts column */}
          <div className="bg-white/90 rounded-xl p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
                <i className="ri-thumb-down-line text-destructive text-xl"></i>
              </div>
              <h4 className="font-inter font-bold text-lg text-neutral-800">Risky Behaviors</h4>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span>Share personal details (address, phone number)</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span>Post vacation plans or current location</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span>Accept requests from unknown accounts</span>
              </li>
              <li className="flex items-start">
                <i className="ri-close-circle-line text-destructive mr-2 mt-1"></i>
                <span>Share financial or identification information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "social-media-protection",
    title: "Protecting Your Digital Identity",
    type: "summary",
    content: (
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold font-inter text-neutral-800 mb-6">Protecting Your Digital Identity</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-user-settings-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Profile Review</h4>
            <p className="text-sm text-neutral-600">Regularly review your profiles to ensure they don't contain excessive personal information.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-lock-password-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Strong Authentication</h4>
            <p className="text-sm text-neutral-600">Use unique, strong passwords and two-factor authentication for all social accounts.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-account-circle-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Friend Management</h4>
            <p className="text-sm text-neutral-600">Regularly audit your connections and remove people you don't know or trust.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-map-pin-off-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Turn Off Location</h4>
            <p className="text-sm text-neutral-600">Disable automatic location sharing in apps and avoid checking in at locations in real-time.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-image-edit-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Image Privacy</h4>
            <p className="text-sm text-neutral-600">Be mindful of photos you share and check if they contain metadata with location information.</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-logout-circle-line text-primary text-xl"></i>
            </div>
            <h4 className="font-medium mb-2">Log Out on Shared Devices</h4>
            <p className="text-sm text-neutral-600">Always log out of accounts when using shared or public computers and devices.</p>
          </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-lg inline-block">
          <p className="text-accent font-medium">Remember: Once information is shared online, it can be difficult or impossible to completely remove.</p>
        </div>
      </div>
    ),
  },
];

// Social media quizzes
const socialMediaQuizzes: Quiz[] = [
  {
    id: "social-media-quiz-1",
    question: "What is a best practice for protecting your social media accounts?",
    options: [
      {
        id: "sm1-opt1",
        text: "Enable two-factor authentication",
        isCorrect: true,
      },
      {
        id: "sm1-opt2",
        text: "Use the same password for all accounts",
        isCorrect: false,
      },
      {
        id: "sm1-opt3",
        text: "Accept all friend requests",
        isCorrect: false,
      },
      {
        id: "sm1-opt4",
        text: "Share your current location on all posts",
        isCorrect: false,
      },
    ],
    explanation: "Two-factor authentication adds an extra layer of security by requiring a second verification method beyond your password.",
    points: 10,
  },
  {
    id: "social-media-quiz-2",
    question: "Which of the following should you avoid sharing on social media?",
    options: [
      {
        id: "sm2-opt1",
        text: "Photos of pets",
        isCorrect: false,
      },
      {
        id: "sm2-opt2",
        text: "Your vacation plans and dates",
        isCorrect: true,
      },
      {
        id: "sm2-opt3",
        text: "Articles from reputable news sources",
        isCorrect: false,
      },
      {
        id: "sm2-opt4",
        text: "Recommendations for movies you've enjoyed",
        isCorrect: false,
      },
    ],
    explanation: "Sharing vacation plans publicly announces when your home will be empty, which can be a security risk.",
    points: 15,
  },
  {
    id: "social-media-quiz-3",
    question: "What is the safest approach to social media privacy settings?",
    options: [
      {
        id: "sm3-opt1",
        text: "Set everything to public so you don't miss connection opportunities",
        isCorrect: false,
      },
      {
        id: "sm3-opt2",
        text: "Only use the default settings as they're secure enough",
        isCorrect: false,
      },
      {
        id: "sm3-opt3",
        text: "Regularly review and limit access to your personal information",
        isCorrect: true,
      },
      {
        id: "sm3-opt4",
        text: "Share your profile only with close friends but make posts public",
        isCorrect: false,
      },
    ],
    explanation: "Privacy settings should be reviewed regularly as platforms often update their options, and your sharing preferences may change over time.",
    points: 15,
  },
];

// Social media challenge
const socialMediaChallenge: Challenge = {
  id: "social-media-challenge-1",
  title: "Social Media Safety Challenge",
  description: "Identify the Risk",
  scenario: "Review this social media post and identify all potential security risks.",
  image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
  items: [
    {
      id: "smc-item1",
      text: "Home address is shared",
      description: "Personal address details should never be posted publicly",
      isCorrect: true,
    },
    {
      id: "smc-item2",
      text: "Announcing empty house",
      description: "Reveals when home will be vacant - security risk",
      isCorrect: true,
    },
    {
      id: "smc-item3",
      text: "Phone number exposed",
      description: "Personal contact information visible to all",
      isCorrect: true,
    },
    {
      id: "smc-item4",
      text: "Public visibility setting",
      description: "Post is visible to everyone, not just friends",
      isCorrect: true,
    },
    {
      id: "smc-item5",
      text: "Vacation photo shared",
      description: "Sharing vacation photos is generally safe if other precautions are taken",
      isCorrect: false,
    },
    {
      id: "smc-item6",
      text: "Mentioning security system",
      description: "While seemingly a deterrent, this confirms valuables worth protecting",
      isCorrect: true,
    },
    {
      id: "smc-item7",
      text: "Names of family members",
      description: "Sharing family names alone is generally low risk",
      isCorrect: false,
    },
    {
      id: "smc-item8",
      text: "Location tagging enabled",
      description: "Location tags provide exact coordinates of where the post was made",
      isCorrect: true,
    },
  ],
  points: 30,
};

// Social media module
export const socialMediaModule: Module = {
  id: "social-media",
  title: "Social Media Safety",
  subtitle: "Learn to protect your information on social platforms",
  icon: "group-line",
  duration: "15 min",
  pointsAvailable: 70,
  order: 3,
  slides: socialMediaSlides,
  quizzes: socialMediaQuizzes,
  challenges: [socialMediaChallenge],
};
