import { createContext, useState, useEffect, ReactNode } from "react";
import { UserProgress } from "@shared/schema";
import { loadProgress, initialProgress, saveProgress, resetProgress } from "@/lib/storage";
import { isIndexedDBAvailable } from "@/lib/indexedDBStorage";

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

// Check if storage is available and working
const isStorageAvailable = () => {
  // Check for localStorage availability
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    
    // Also check for IndexedDB if available
    if (typeof window !== 'undefined' && isIndexedDBAvailable()) {
      return true;
    }
    
    // If IndexedDB is not available, we can still use localStorage
    return true;
  } catch (e) {
    // If localStorage also fails, we have no storage options
    return false;
  }
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [loading, setLoading] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Function to reset progress state
  const resetProgressState = () => {
    // Update state immediately
    setProgress(initialProgress);
    
    // Reset storage (fire and forget)
    if (storageAvailable) {
      resetProgress().catch(error => {
        console.error("Failed to reset progress:", error);
      });
    }
  };

  // Custom progress setter that also saves to storage
  const handleSetProgress = (newProgress: UserProgress) => {
    // Update the state immediately for UI responsiveness
    setProgress(newProgress);
    
    // Then save to storage without waiting (fire and forget)
    if (storageAvailable) {
      saveProgress(newProgress).catch(error => {
        console.error("Failed to save progress:", error);
      });
    }
  };

  // Load user progress from storage on initial render
  useEffect(() => {
    const loadUserProgress = async () => {
      const storageWorks = isStorageAvailable();
      setStorageAvailable(storageWorks);
      
      if (!storageWorks) {
        console.warn("Storage is not available. Progress will not be saved.");
        setLoading(false);
        return;
      }
      
      try {
        const userProgress = await loadProgress();
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
