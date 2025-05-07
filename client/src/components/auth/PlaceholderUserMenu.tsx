import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function PlaceholderUserMenu() {
  return (
    <Button variant="outline" size="sm">
      <User className="h-4 w-4 mr-2" />
      Sign In
    </Button>
  );
}