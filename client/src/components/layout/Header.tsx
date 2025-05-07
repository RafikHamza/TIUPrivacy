import { Link, useLocation } from "wouter";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Menu, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
  const [location] = useLocation();
  const { progress, resetProgressState } = useContext(AppContext);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Lessons", href: "/module/phishing" },
  ];

  const handleReset = () => {
    resetProgressState();
    setIsResetDialogOpen(false);
    // Redirect to home page
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <i className="ri-shield-keyhole-line text-primary text-3xl mr-2"></i>
              <Link href="/">
                <span className="font-inter font-bold text-lg text-neutral-800 cursor-pointer">CyberSafe</span>
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span 
                  className={`font-inter font-medium cursor-pointer ${
                    location === item.href || 
                    (item.href !== "/" && location.startsWith(item.href))
                      ? "text-primary border-b-2 border-primary" 
                      : "text-neutral-600 hover:text-primary"
                  } px-3 py-2 text-sm`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <div className="ml-4 flex items-center gap-3">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                <i className="ri-coin-line mr-1"></i>
                <span>{progress.points}</span> points
              </span>
              
              <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" title="Reset Progress">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset All Progress</DialogTitle>
                    <DialogDescription>
                      This will reset all your learning progress, scores, and badges. This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleReset}>
                      Reset Everything
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </nav>
          
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span 
                        className={`font-inter font-medium cursor-pointer ${
                          location === item.href || 
                          (item.href !== "/" && location.startsWith(item.href))
                            ? "text-primary" 
                            : "text-neutral-600 hover:text-primary"
                        } px-3 py-2 text-sm block`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <div className="px-3 py-2 flex items-center justify-between">
                    <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      <i className="ri-coin-line mr-1"></i>
                      <span>{progress.points}</span> points
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsResetDialogOpen(true)}
                      title="Reset Progress"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
