import { Switch, Route, Router } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import useHashLocation from "./hooks/use-hash-location";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ModulePage from "@/pages/ModulePage";
import FinalChallenge from "@/pages/FinalChallenge";
import ActivitiesPage from "@/pages/GamesPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <div className="flex flex-col min-h-screen">
        <Switch>
          <Route path="/">
            <Header />
            <div className="flex-grow">
              <Home />
            </div>
            <Footer />
          </Route>

          <Route path="/module/:id">
            <Header />
            <div className="flex-grow">
              <ModulePage />
            </div>
            <Footer />
          </Route>

          <Route path="/activities">
            <Header />
            <div className="flex-grow">
              <ActivitiesPage />
            </div>
            <Footer />
          </Route>

          <Route path="/final-challenge">
            <Header />
            <div className="flex-grow">
              <FinalChallenge />
            </div>
            <Footer />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppRouter />
          </AppProvider>
          <Toaster />
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
