import { useState } from 'react';
import { useLocation } from 'wouter';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from '@/hooks/use-auth';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  uniqueId: z.string().min(6, "ID must be at least 6 characters"),
});

const registerSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  uniqueId: z.string().min(6, "ID must be at least 6 characters").max(20, "ID must not exceed 20 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { loginWithId, registerUser, user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Check if user is already logged in
  if (user) {
    // Get redirect URL if one was saved
    const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
    localStorage.removeItem('redirectAfterLogin');
    
    // Navigate to redirect URL
    navigate(redirectUrl);
    return null;
  }

  // Login form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      uniqueId: "",
    },
  });

  // Register form setup
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      uniqueId: "",
    },
  });

  // Handle login form submission
  async function onLoginSubmit(data: LoginFormValues) {
    try {
      await loginWithId.mutateAsync(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  // Handle register form submission
  async function onRegisterSubmit(data: RegisterFormValues) {
    try {
      await registerUser.mutateAsync(data);
      // Show success message
      toast({
        title: "Registration successful",
        description: "You can now log in with your ID",
      });
      // Switch to login tab after successful registration
      setActiveTab("login");
      // Prefill login form with the ID
      loginForm.setValue("uniqueId", data.uniqueId);
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">TIU Privacy Awareness</h1>
            <p className="text-muted-foreground mt-2">Login to access the digital security training</p>
          </div>

          <Card>
            <CardHeader>
              <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-4">
                  <CardTitle>Login with your ID</CardTitle>
                  <CardDescription>Enter your unique ID to access the training</CardDescription>
                </TabsContent>
                
                <TabsContent value="register" className="mt-4">
                  <CardTitle>Create a new account</CardTitle>
                  <CardDescription>Register with your name and create a unique ID</CardDescription>
                </TabsContent>
              </Tabs>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="login" className="mt-0">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="uniqueId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your unique ID" {...field} />
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
                      {loginWithId.isPending ? "Logging in..." : "Login"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="register" className="mt-0">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
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
                          <FormLabel>Create an ID</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Choose a unique ID (min 6 characters)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-1">
                            Remember this ID as you will need it to log in
                          </p>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={registerUser.isPending}
                    >
                      {registerUser.isPending ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <p className="text-xs text-center text-muted-foreground mt-2">
                {activeTab === "login" 
                  ? "Don't have an ID? Click Register above." 
                  : "Already have an ID? Click Login above."}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Right side - Hero */}
      <div className="hidden lg:flex flex-col w-1/2 bg-slate-50 dark:bg-slate-900 p-12">
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold mb-6">Digital Privacy and Security Training</h2>
            <p className="text-lg mb-6">
              Learn essential skills to protect yourself and your organization online:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span>Recognize phishing attempts and social engineering attacks</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span>Learn about secure email communication practices</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span>Understand safe social media usage and privacy settings</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span>Protect your information when interacting with AI chatbots</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">✓</span>
                <span>Security awareness for workplace and digital business</span>
              </li>
            </ul>
            
            <p className="mt-8 text-sm text-muted-foreground">
              TIU Privacy Awareness for Digital Business - Taught by Prof. HAMZA Rafik
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}