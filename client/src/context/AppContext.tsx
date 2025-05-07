import { createContext, useState, useEffect, ReactNode } from "react";
import { UserProgress } from "@shared/schema";
import { loadProgress, initialProgress } from "@/lib/storage";

interface AppContextType {
  progress: UserProgress;
  setProgress: (progress: UserProgress) => void;
  loading: boolean;
}

export const AppContext = createContext<AppContextType>({
  progress: initialProgress,
  setProgress: () => {},
  loading: true,
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [loading, setLoading] = useState(true);

  // Load user progress from localStorage on initial render
  useEffect(() => {
    const loadUserProgress = () => {
      try {
        const userProgress = loadProgress();
        setProgress(userProgress);
      } catch (error) {
        console.error("Failed to load user progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProgress();
  }, []);

  return (
    <AppContext.Provider value={{ progress, setProgress, loading }}>
      {children}
    </AppContext.Provider>
  );
};
