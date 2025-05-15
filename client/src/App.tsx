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
import ActivitiesPage from "@/pages/GamesPage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/context/AppContext";
import { useUtils } from '@/hooks/use-utils';

function AppRouter() {
  const { createPath } = useUtils();
  return (
    <div className="flex flex-col min-h-screen">
      <Switch>
        <Route path={createPath("/")}>
          <Header />
          <div className="flex-grow">
            <Home />
          </div>
          <Footer />
        </Route>
        
        <Route path={createPath("/module/:id")}>
          <Header />
          <div className="flex-grow">
            <ModulePage />
          </div>
          <Footer />
        </Route>
        
        <Route path={createPath("/challenge")}>
          <Header />
          <div className="flex-grow">
            <FinalChallenge />
          </div>
          <Footer />
        </Route>
        
        <Route path={createPath("/activities")}>
          <Header />
          <div className="flex-grow">
            <ActivitiesPage />
          </div>
          <Footer />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <WouterRouter base={import.meta.env.BASE_URL}>
              <AppRouter />
            </WouterRouter>
          </AppProvider>
          <Toaster />
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
