import { UserProgress, progressSchema } from "@shared/schema";

// Default progress state
export const initialProgress: UserProgress = {
  modules: {
    "phishing": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    },
    "email": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    },
    "social-media": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    },
    "ai-chatbots": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    },
    "final-challenge": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    }
  },
  points: 0,
  badges: [],
};

// Storage key
const PROGRESS_STORAGE_KEY = 'cybersafe-learning-progress';

// Save progress to localStorage
export const saveProgress = (progress: UserProgress): void => {
  try {
    const validatedProgress = progressSchema.parse(progress);
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(validatedProgress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// Load progress from localStorage
export const loadProgress = (): UserProgress => {
  try {
    const storedData = localStorage.getItem(PROGRESS_STORAGE_KEY);
    
    if (!storedData) {
      return initialProgress;
    }
    
    const parsedData = JSON.parse(storedData);
    return progressSchema.parse(parsedData);
  } catch (error) {
    console.error('Failed to load progress, starting fresh:', error);
    return initialProgress;
  }
};

// Update a specific module's progress
export const updateModuleProgress = (
  moduleId: string,
  updateFn: (currentModuleProgress: UserProgress['modules'][string]) => UserProgress['modules'][string]
): UserProgress => {
  const currentProgress = loadProgress();
  
  const updatedProgress = {
    ...currentProgress,
    modules: {
      ...currentProgress.modules,
      [moduleId]: updateFn(currentProgress.modules[moduleId] || {
        completed: false,
        slides: {},
        quizzes: {},
        challenges: {},
      }),
    },
  };
  
  saveProgress(updatedProgress);
  return updatedProgress;
};

// Add points to user's progress
export const addPoints = (points: number): UserProgress => {
  const currentProgress = loadProgress();
  
  const updatedProgress = {
    ...currentProgress,
    points: currentProgress.points + points,
  };
  
  saveProgress(updatedProgress);
  return updatedProgress;
};

// Award a badge
export const awardBadge = (badgeId: string): UserProgress => {
  const currentProgress = loadProgress();
  
  // Check if user already has this badge
  if (currentProgress.badges.includes(badgeId)) {
    return currentProgress;
  }
  
  const updatedProgress = {
    ...currentProgress,
    badges: [...currentProgress.badges, badgeId],
  };
  
  saveProgress(updatedProgress);
  return updatedProgress;
};

// Get completed modules count
export const getCompletedModulesCount = (): number => {
  const currentProgress = loadProgress();
  return Object.values(currentProgress.modules).filter(module => module.completed).length;
};

// Get total modules count
export const getTotalModulesCount = (): number => {
  const currentProgress = loadProgress();
  return Object.keys(currentProgress.modules).length;
};

// Reset all progress (for testing)
export const resetProgress = (): void => {
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
};
