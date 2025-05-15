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

export default function Header() {
  const [location] = useLocation();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { resetUserProgress } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleResetProgress = async () => {
    await resetUserProgress();
    setIsResetDialogOpen(false);
  };

  const isCurrentPage = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/module/phishing", label: "Phishing Safety" },
    { href: "/module/email", label: "Email Security" },
    { href: "/module/socialMedia", label: "Social Media" },
    { href: "/module/aiChatbots", label: "AI Chatbots" },
    { href: "/challenge", label: "Final Challenge" },
  ];

  const renderNavLinks = () => (
    <>
      {navLinks.map(({ href, label }) => (
        <Button
          key={href}
          variant={isCurrentPage(href) ? "secondary" : "ghost"}
          asChild
          className="w-full justify-start md:w-auto"
          onClick={closeMenu}
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              CyberSafe Learning
            </span>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link
                href="/"
                className="flex items-center"
                onClick={closeMenu}
              >
                <span className="font-bold">CyberSafe Learning</span>
              </Link>
            </div>
            <nav className="flex flex-col space-y-3 px-7 pb-4 pt-4">
              {renderNavLinks()}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Reset Progress">
                <RotateCcw className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Progress</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reset all your progress? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setIsResetDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleResetProgress}>
                  Reset
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
