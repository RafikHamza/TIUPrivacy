import { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useUtils } from '@/hooks/use-utils';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to auth page if not logged in
      toast({
        title: "Authentication Required",
        description: "Please log in to access this content.",
        variant: "destructive"
      });
      
      // Store the attempted URL to redirect back after login
      localStorage.setItem('redirectAfterLogin', location);
      
      // Redirect to auth page
      const { createPath } = useUtils();
      setLocation(createPath('/auth'));
    }
  }, [user, isLoading, setLocation, location, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Only render children if user is authenticated
  return user ? <>{children}</> : null;
}