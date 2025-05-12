import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ModulePage from "@/pages/ModulePage";
import FinalChallenge from "@/pages/FinalChallenge";
import ActivitiesPage from "@/pages/GamesPage"; // File still named GamesPage.tsx but component renamed
import AuthPage from "@/pages/AuthPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Get the base URL from the environment or use the default
// This is necessary for GitHub Pages deployment where the app is served from a subfolder
const basePath = import.meta.env.BASE_URL || '/';

// Make sure all routes work with the base path
const useBasePath = () => {
  return (to: string) => basePath + to.replace(/^\//, '');
};

function AppRouter() {
  return (
    <WouterRouter base={basePath}>
      <div className="flex flex-col min-h-screen">
        <Switch>
          <Route path="/auth" component={AuthPage} />
        
        <Route path="/">
          <ProtectedRoute>
            <Header />
            <div className="flex-grow">
              <Home />
            </div>
            <Footer />
          </ProtectedRoute>
        </Route>
        
        <Route path="/module/:id">
          <ProtectedRoute>
            <Header />
            <div className="flex-grow">
              <ModulePage />
            </div>
            <Footer />
          </ProtectedRoute>
        </Route>
        
        <Route path="/challenge">
          <ProtectedRoute>
            <Header />
            <div className="flex-grow">
              <FinalChallenge />
            </div>
            <Footer />
          </ProtectedRoute>
        </Route>
        
        <Route path="/activities">
          <ProtectedRoute>
            <Header />
            <div className="flex-grow">
              <ActivitiesPage />
            </div>
            <Footer />
          </ProtectedRoute>
        </Route>
        
        <Route>
          <ProtectedRoute>
            <Header />
            <div className="flex-grow">
              <NotFound />
            </div>
            <Footer />
          </ProtectedRoute>
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppProvider>
              <WouterRouter base={basePath}>
                <Toaster />
                <AppRouter />
              </WouterRouter>
            </AppProvider>
          </AuthProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
