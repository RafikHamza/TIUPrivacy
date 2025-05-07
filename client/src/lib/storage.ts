import { UserProgress, progressSchema } from "@shared/schema";
import { 
  saveProgressToIndexedDB, 
  loadProgressFromIndexedDB, 
  resetProgressInIndexedDB,
  isIndexedDBAvailable
} from "./indexedDBStorage";

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

// Storage key for localStorage fallback
const PROGRESS_STORAGE_KEY = 'cybersafe-learning-progress';

// Check if we can use IndexedDB
const canUseIndexedDB = typeof window !== 'undefined' && isIndexedDBAvailable();

// Save progress
export const saveProgress = async (progress: UserProgress): Promise<void> => {
  try {
    const validatedProgress = progressSchema.parse(progress);
    
    if (canUseIndexedDB) {
      // Use IndexedDB
      await saveProgressToIndexedDB(validatedProgress);
    } else {
      // Fallback to localStorage
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(validatedProgress));
    }
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// Load progress
export const loadProgress = async (): Promise<UserProgress> => {
  try {
    if (canUseIndexedDB) {
      // Use IndexedDB
      const progress = await loadProgressFromIndexedDB();
      return progressSchema.parse(progress);
    } else {
      // Fallback to localStorage
      const storedData = localStorage.getItem(PROGRESS_STORAGE_KEY);
      
      if (!storedData) {
        return initialProgress;
      }
      
      const parsedData = JSON.parse(storedData);
      return progressSchema.parse(parsedData);
    }
  } catch (error) {
    console.error('Failed to load progress, starting fresh:', error);
    return initialProgress;
  }
};

// For synchronous operations that need immediate access to progress
// This should be used only when absolutely necessary
export const loadProgressSync = (): UserProgress => {
  try {
    // We can only use localStorage for sync operations
    const storedData = localStorage.getItem(PROGRESS_STORAGE_KEY);
    
    if (!storedData) {
      return initialProgress;
    }
    
    const parsedData = JSON.parse(storedData);
    return progressSchema.parse(parsedData);
  } catch (error) {
    console.error('Failed to load progress synchronously, starting fresh:', error);
    return initialProgress;
  }
};

// Update a specific module's progress
export const updateModuleProgress = async (
  moduleId: string,
  updateFn: (currentModuleProgress: UserProgress['modules'][string]) => UserProgress['modules'][string]
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
  if (canUseIndexedDB) {
    await resetProgressInIndexedDB();
  }
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
};
