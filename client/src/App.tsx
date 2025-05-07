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
import GamesPage from "@/pages/GamesPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/hooks/use-auth";

// Get the base URL from the environment or use the default
// This is necessary for GitHub Pages deployment where the app is served from a subfolder
const basePath = import.meta.env.BASE_URL || '/';

function AppRouter() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/module/:id" component={ModulePage} />
          <Route path="/challenge" component={FinalChallenge} />
          <Route path="/games" component={GamesPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <TooltipProvider>
        <AuthProvider>
          <AppProvider>
            <WouterRouter base={basePath}>
              <Toaster />
              <AppRouter />
            </WouterRouter>
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
