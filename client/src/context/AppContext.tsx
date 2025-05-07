import { createContext, useState, useEffect, ReactNode } from "react";
import { UserProgress } from "@shared/schema";
import { loadProgress, initialProgress, saveProgress } from "@/lib/storage";

interface AppContextType {
  progress: UserProgress;
  setProgress: (progress: UserProgress) => void;
  loading: boolean;
  resetProgressState: () => void;
  storageAvailable: boolean;
}

export const AppContext = createContext<AppContextType>({
  progress: initialProgress,
  setProgress: () => {},
  loading: true,
  resetProgressState: () => {},
  storageAvailable: true,
});

interface AppProviderProps {
  children: ReactNode;
}

// Check if localStorage is available and working
const isStorageAvailable = () => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [loading, setLoading] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Function to reset progress state
  const resetProgressState = () => {
    setProgress(initialProgress);
    if (storageAvailable) {
      localStorage.clear();
      saveProgress(initialProgress);
    }
  };

  // Custom progress setter that also saves to storage
  const handleSetProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    if (storageAvailable) {
      saveProgress(newProgress);
    }
  };

  // Load user progress from localStorage on initial render
  useEffect(() => {
    const loadUserProgress = () => {
      const storageWorks = isStorageAvailable();
      setStorageAvailable(storageWorks);
      
      if (!storageWorks) {
        console.warn("localStorage is not available. Progress will not be saved.");
        setLoading(false);
        return;
      }
      
      try {
        const userProgress = loadProgress();
        setProgress(userProgress);
      } catch (error) {
        console.error("Failed to load user progress:", error);
        // Fallback to initial progress
        setProgress(initialProgress);
      } finally {
        setLoading(false);
      }
    };

    loadUserProgress();
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        progress, 
        setProgress: handleSetProgress, 
        loading, 
        resetProgressState,
        storageAvailable 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
