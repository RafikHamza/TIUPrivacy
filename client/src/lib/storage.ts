import { 
  saveProgressToIndexedDB, 
  loadProgressFromIndexedDB, 
  resetProgressInIndexedDB,
  isIndexedDBAvailable
} from "./indexedDBStorage";

// User progress types
export type ModuleProgress = {
  completed: boolean;
  slides: Record<string, boolean>;
  quizzes: Record<string, boolean>;
  challenges: Record<string, boolean>;
  lastVisited?: string;
};

export type UserProgress = {
  modules: Record<string, ModuleProgress>;
  points: number;
  badges: string[];
  currentLevel: number;
};

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
    "socialMedia": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    },
    "aiChatbots": {
      completed: false,
      slides: {},
      quizzes: {},
      challenges: {},
      lastVisited: undefined,
    }
  },
  points: 0,
  badges: [],
  currentLevel: 1
};

// Storage key for localStorage fallback
const PROGRESS_STORAGE_KEY = 'cybersafe-learning-progress';

// Save progress
export const saveProgress = async (progress: UserProgress): Promise<void> => {
  try {
    if (await isIndexedDBAvailable()) {
      await saveProgressToIndexedDB(progress);
    } else {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    }
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// Load progress
export const loadProgress = async (): Promise<UserProgress> => {
  try {
    if (await isIndexedDBAvailable()) {
      // Use IndexedDB
      const progress = await loadProgressFromIndexedDB();
      if (progress) {
        return progress as UserProgress;
      }
    } else {
      // Fall back to localStorage if IndexedDB is not available
      const storedData = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData) as UserProgress;
      }
    }
  } catch (error) {
    console.error('Failed to load progress, starting fresh:', error);
  }
  return initialProgress;
};

// For synchronous operations that need immediate access to progress
export const loadProgressSync = (): UserProgress => {
  try {
    const storedData = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (storedData) {
      return JSON.parse(storedData) as UserProgress;
    }
  } catch (error) {
    console.error('Failed to load progress synchronously, starting fresh:', error);
  }
  return initialProgress;
};

// Update a specific module's progress
export const updateModuleProgress = async (
  moduleId: string,
  updateFn: (currentModuleProgress: ModuleProgress) => ModuleProgress
): Promise<UserProgress> => {
  const currentProgress = await loadProgress();
  
  const updatedProgress = {
    ...currentProgress,
    modules: {
      ...currentProgress.modules,
      [moduleId]: updateFn(currentProgress.modules[moduleId] || {
        completed: false,
        slides: {},
        quizzes: {},
        challenges: {},
        lastVisited: undefined,
      }),
    },
  };
  
  await saveProgress(updatedProgress);
  return updatedProgress;
};

// Add points to user's progress
export const addPoints = async (points: number): Promise<UserProgress> => {
  const currentProgress = await loadProgress();
  
  const updatedProgress = {
    ...currentProgress,
    points: currentProgress.points + points,
  };
  
  await saveProgress(updatedProgress);
  return updatedProgress;
};

// Award a badge
export const awardBadge = async (badgeId: string): Promise<UserProgress> => {
  const currentProgress = await loadProgress();
  
  // Check if user already has this badge
  if (currentProgress.badges.includes(badgeId)) {
    return currentProgress;
  }
  
  const updatedProgress = {
    ...currentProgress,
    badges: [...currentProgress.badges, badgeId],
  };
  
  await saveProgress(updatedProgress);
  return updatedProgress;
};

// Get completed modules count
export const getCompletedModulesCount = async (): Promise<number> => {
  const currentProgress = await loadProgress();
  return Object.values(currentProgress.modules).filter(module => module.completed).length;
};

// Get total modules count
export const getTotalModulesCount = async (): Promise<number> => {
  const currentProgress = await loadProgress();
  return Object.keys(currentProgress.modules).length;
};

// Reset all progress (for testing)
export const resetProgress = async (): Promise<void> => {
  if (await isIndexedDBAvailable()) {
    await resetProgressInIndexedDB();
  }
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
};
