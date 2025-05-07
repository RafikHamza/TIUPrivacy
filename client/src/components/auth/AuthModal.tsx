import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

// Login form schema (just unique ID)
const loginFormSchema = z.object({
  uniqueId: z.string().min(6, "Unique ID must be at least 6 characters")
});

// Registration form schema (display name and user-selected ID)
const registerFormSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  uniqueId: z.string().min(6, "ID must be at least 6 characters").max(20, "ID must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "ID can only contain letters, numbers, underscores, and hyphens")
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { loginWithId, registerUser } = useAuth();

  // Login form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      uniqueId: '',
    },
  });

  // Registration form setup
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      displayName: '',
      uniqueId: '',
    },
  });

  // Handle login submit
  function onLoginSubmit(data: LoginFormValues) {
    loginWithId.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        loginForm.reset();
      }
    });
  }

  // Handle register submit
  function onRegisterSubmit(data: RegisterFormValues) {
    registerUser.mutate(data, {
      onSuccess: () => {
        setActiveTab('login');
        registerForm.reset();
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign In / Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Continue Your Learning</DialogTitle>
          <DialogDescription>
            Sign in with your unique ID or create a new account to track your progress.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login with your ID</CardTitle>
                <CardDescription>
                  Enter the unique ID you received when registering.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="uniqueId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Unique ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginWithId.isPending}
                    >
                      {loginWithId.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                  Create an account to track your cybersecurity learning progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="uniqueId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Choose Your Unique ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Create a unique ID to use for login" {...field} />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            Use at least 6 characters. Only letters, numbers, underscores, and hyphens allowed.
                          </p>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerUser.isPending}
                    >
                      {registerUser.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                We collect minimal data. Remember your chosen ID carefully as it's your only way to log back in.
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}