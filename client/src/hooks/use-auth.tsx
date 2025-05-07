import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient
} from "@tanstack/react-query";
import { LoginWithId, CreateUser } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Define the User type for client-side
interface User {
  id: number;
  uniqueId: string;
  displayName: string;
  points: number;
  badges: string[];
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  loginWithId: UseMutationResult<User, Error, LoginWithId>;
  registerUser: UseMutationResult<{ uniqueId: string; message: string }, Error, CreateUser>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get user from localStorage on initial load
  const [storedUser, setStoredUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('cybersecurityUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  // Save user to localStorage when it changes
  useEffect(() => {
    if (storedUser) {
      localStorage.setItem('cybersecurityUser', JSON.stringify(storedUser));
    } else {
      localStorage.removeItem('cybersecurityUser');
    }
  }, [storedUser]);

  // Login mutation
  const loginWithId = useMutation({
    mutationFn: async (credentials: LoginWithId) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to login");
      }
      return await res.json();
    },
    onSuccess: (user: User) => {
      setStoredUser(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.displayName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Registration mutation
  const registerUser = useMutation({
    mutationFn: async (userData: CreateUser) => {
      const res = await apiRequest("POST", "/api/register", userData);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to register");
      }
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration successful",
        description: `Account created successfully with ID: ${data.user.uniqueId}. You can now log in.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Logout function
  const logout = () => {
    setStoredUser(null);
    // Clear any user-related data
    queryClient.invalidateQueries();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: storedUser,
        isLoading: false, // We don't need loading state since we're using localStorage
        loginWithId,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}