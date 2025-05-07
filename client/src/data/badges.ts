import { Badge } from "@/lib/types";

// Define all available badges in the application
export const allBadges: Badge[] = [
  {
    id: "phishing-expert",
    title: "Phishing Master",
    description: "Successfully completed the Phishing Recognition module",
    icon: "spy-line",
    moduleId: "phishing",
  },
  {
    id: "email-guardian",
    title: "Email Guardian",
    description: "Successfully completed the Email Safety module",
    icon: "mail-lock-line",
    moduleId: "email",
  },
  {
    id: "social-defender",
    title: "Social Defender",
    description: "Successfully completed the Social Media Safety module",
    icon: "group-line",
    moduleId: "social-media",
  },
  {
    id: "ai-safety-expert",
    title: "AI Safety Expert",
    description: "Successfully completed the AI Chatbot Safety module",
    icon: "robot-line",
    moduleId: "ai-chatbots",
  },
  {
    id: "cyber-champion",
    title: "Cyber Champion",
    description: "Successfully completed the Final Challenge",
    icon: "trophy-line",
    moduleId: "final-challenge",
  }
];

// Export badge by ID for easy lookup
export const getBadgeById = (id: string): Badge | undefined => {
  return allBadges.find(badge => badge.id === id);
};
