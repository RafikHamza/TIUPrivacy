import { UserProgress, progressSchema } from "@shared/schema";
import { initialProgress } from "./storage";

const DB_NAME = "CybersecurityAppDB";
const DB_VERSION = 1;
const PROGRESS_STORE = "userProgress";

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB error:", (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for user progress
      if (!db.objectStoreNames.contains(PROGRESS_STORE)) {
        db.createObjectStore(PROGRESS_STORE, { keyPath: "id" });
      }
    };
  });
};

// Save progress to IndexedDB
export const saveProgressToIndexedDB = async (progress: UserProgress): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([PROGRESS_STORE], "readwrite");
    const store = transaction.objectStore(PROGRESS_STORE);
    
    // We use a fixed ID for the single user progress object
    const progressToSave = { ...progress, id: "user-progress" };
    store.put(progressToSave);
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      
      transaction.onerror = (event) => {
        console.error("Transaction error:", transaction.error);
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error("Error saving progress to IndexedDB:", error);
    // Fall back to localStorage if IndexedDB fails
    localStorage.setItem("userProgress", JSON.stringify(progress));
  }
};

// Load progress from IndexedDB
export const loadProgressFromIndexedDB = async (): Promise<UserProgress> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([PROGRESS_STORE], "readonly");
    const store = transaction.objectStore(PROGRESS_STORE);
    const request = store.get("user-progress");
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        if (request.result) {
          // Remove the ID before returning
          const { id, ...progressData } = request.result;
          resolve(progressData as UserProgress);
        } else {
          // If no data found, return initial progress
          resolve(initialProgress);
        }
      };
      
      request.onerror = (event) => {
        console.error("Request error:", request.error);
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error loading progress from IndexedDB:", error);
    // Fall back to localStorage if IndexedDB fails
    const savedProgress = localStorage.getItem("userProgress");
    return savedProgress ? JSON.parse(savedProgress) : initialProgress;
  }
};

// Reset progress in IndexedDB
export const resetProgressInIndexedDB = async (): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([PROGRESS_STORE], "readwrite");
    const store = transaction.objectStore(PROGRESS_STORE);
    
    // Delete the progress record
    store.delete("user-progress");
    
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        db.close();
        resolve();
      };
      
      transaction.onerror = (event) => {
        console.error("Transaction error:", transaction.error);
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error("Error resetting progress in IndexedDB:", error);
    // Fall back to localStorage if IndexedDB fails
    localStorage.removeItem("userProgress");
  }
};

// Check if IndexedDB is available
export const isIndexedDBAvailable = (): boolean => {
  return !!window.indexedDB;
};

// Wait until a promise is resolved to avoid race conditions
export function waitForPromise<T>(promise: Promise<T>): Promise<T> {
  return promise;
}