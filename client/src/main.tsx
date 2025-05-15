import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context/AppContext";
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

const app = (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <App />
      <Toaster />
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(app);
