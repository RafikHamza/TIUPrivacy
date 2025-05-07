// Module types
export type ModuleId = 'phishing' | 'email' | 'social-media' | 'ai-chatbots' | 'final-challenge';

export interface Module {
  id: ModuleId;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  pointsAvailable: number;
  order: number;
  slides: Slide[];
  quizzes: Quiz[];
  challenges: Challenge[];
}

// Slide types
export interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
  type: 'intro' | 'content' | 'summary';
}

// Quiz types
export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
  points: number;
}

// Challenge types
export interface ChallengeItem {
  id: string;
  text: string;
  description: string;
  isCorrect: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  scenario: string;
  image?: string;
  items: ChallengeItem[];
  points: number;
}

// Badge types
export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  moduleId: ModuleId;
  requiredScore?: number; // Optional, if badge requires a certain score
}
