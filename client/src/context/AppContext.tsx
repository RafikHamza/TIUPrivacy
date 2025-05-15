import { createContext, useState, useEffect, ReactNode } from "react";
import { UserProgress, initialProgress, saveProgress, resetProgress } from "@/lib/storage";
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
    return true;
  } catch (e) {
    return false;
  }
};

export function AppProvider({ children }: AppProviderProps) {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [loading, setLoading] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    const initializeStorage = async () => {
      const indexedDBAvailable = await isIndexedDBAvailable();
      const localStorageAvailable = isStorageAvailable();
      setStorageAvailable(indexedDBAvailable || localStorageAvailable);

      try {
        setLoading(true);
        const savedProgress = await loadProgress();
        setProgress(savedProgress);
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeStorage();
  }, []);

  useEffect(() => {
    if (!loading && storageAvailable) {
      saveProgress(progress).catch(console.error);
    }
  }, [progress, loading, storageAvailable]);

  const resetProgressState = async () => {
    try {
      await resetProgress();
      setProgress(initialProgress);
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        progress,
        setProgress,
        loading,
        resetProgressState,
        storageAvailable,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
