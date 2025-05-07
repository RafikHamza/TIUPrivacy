import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create the app without auth for now - we'll add it directly in App.tsx
// to avoid circular dependency problems
const app = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// Render the app
createRoot(document.getElementById("root")!).render(app);
