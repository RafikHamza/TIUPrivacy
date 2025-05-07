import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { UserProgress } from "@shared/schema";
import { loadProgress, initialProgress, saveProgress, resetProgress } from "@/lib/storage";
import { isIndexedDBAvailable } from "@/lib/indexedDBStorage";
import { apiRequest } from "@/lib/queryClient";

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
  
  // Define a temporary user type to avoid circular dependencies with auth hook
  interface TempUser {
    id: number;
    uniqueId: string;
    displayName: string;
  }
  
  // For now, we're not using the auth context directly to avoid circular dependencies
  const user: TempUser | null = null;
  
  // Function to sync progress with server if user is logged in
  const syncProgressWithServer = async (progressData: UserProgress) => {
    if (!user) return;
    
    try {
      // If progress doesn't have userId set, add it
      const progressWithUserId = {
        ...progressData,
        userId: user.uniqueId
      };
      
      // Save to server
      await apiRequest("POST", `/api/progress/${user.uniqueId}`, progressWithUserId);
      
    } catch (error) {
      console.error("Failed to sync progress with server:", error);
    }
  };
  
  // Function to fetch progress from server if user is logged in
  const fetchProgressFromServer = async (): Promise<UserProgress | null> => {
    if (!user) return null;
    
    try {
      const response = await apiRequest("GET", `/api/progress/${user.uniqueId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch progress from server");
      }
      
      const serverProgress = await response.json();
      return serverProgress;
      
    } catch (error) {
      console.error("Failed to fetch progress from server:", error);
      return null;
    }
  };

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
    
    // Reset server progress if user is logged in
    if (user) {
      apiRequest("POST", `/api/progress/${user.uniqueId}/reset`).catch(error => {
        console.error("Failed to reset server progress:", error);
      });
    }
  };

  // Custom progress setter that also saves to storage
  const handleSetProgress = (newProgress: UserProgress) => {
    // If user is logged in, ensure userId is set
    const progressToSave = user 
      ? { ...newProgress, userId: user.uniqueId }
      : newProgress;
    
    // Update the state immediately for UI responsiveness
    setProgress(progressToSave);
    
    // Then save to storage without waiting (fire and forget)
    if (storageAvailable) {
      saveProgress(progressToSave).catch(error => {
        console.error("Failed to save progress:", error);
      });
    }
    
    // Sync with server if user is logged in
    if (user) {
      syncProgressWithServer(progressToSave);
    }
  };

  // Load user progress from storage on initial render or when user changes
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
        // First try to get progress from server if user is logged in
        let userProgress: UserProgress | null = null;
        
        if (user) {
          userProgress = await fetchProgressFromServer();
          console.log("Fetched user progress from server:", userProgress);
        }
        
        // If no server progress or not logged in, load from local storage
        if (!userProgress) {
          userProgress = await loadProgress();
        }
        
        // If user is logged in but progress doesn't have userId, add it
        if (user && userProgress && userProgress.userId !== user.uniqueId) {
          userProgress = {
            ...userProgress,
            userId: user.uniqueId
          };
          // Save the updated progress
          await saveProgress(userProgress);
          
          // Also sync with server
          await syncProgressWithServer(userProgress);
        }
        
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
  }, [user]); // Re-load when user changes

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
