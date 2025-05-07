import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LogIn, UserPlus } from "lucide-react";

const loginFormSchema = z.object({
  uniqueId: z.string().min(6, {
    message: "Your ID must be at least 6 characters.",
  }),
});

const registerFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type RegisterFormValues = z.infer<typeof registerFormSchema>;

type AuthModalProps = {
  children?: React.ReactNode;
};

export function AuthModal({ children }: AuthModalProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [registrationSuccess, setRegistrationSuccess] = useState<{ uniqueId: string } | null>(null);
  const { loginWithId, registerUser } = useAuth();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      uniqueId: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      displayName: "",
      email: "",
    },
  });

  // Handle login form submission
  function onLoginSubmit(data: LoginFormValues) {
    loginWithId.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  // Handle register form submission
  function onRegisterSubmit(data: RegisterFormValues) {
    registerUser.mutate(data, {
      onSuccess: (responseData) => {
        setRegistrationSuccess({
          uniqueId: responseData.uniqueId,
        });
      },
    });
  }

  // Reset the form and state when the dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      loginForm.reset();
      registerForm.reset();
      setTab("login");
      setRegistrationSuccess(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Sign In</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Access</DialogTitle>
          <DialogDescription>
            Sign in with your unique ID or create a new account to track your progress.
          </DialogDescription>
        </DialogHeader>

        {registrationSuccess ? (
          <div className="space-y-4 text-center">
            <div className="text-xl font-bold text-green-600">Registration Successful!</div>
            <p className="text-muted-foreground">
              Your unique ID is:
            </p>
            <p className="text-xl font-mono bg-muted p-2 rounded-md">
              {registrationSuccess.uniqueId}
            </p>
            <p className="text-sm text-muted-foreground">
              Please save this ID. You will need it to log in to your account in the future.
            </p>
            <div className="pt-4 flex gap-2">
              <Button 
                className="w-full" 
                onClick={() => {
                  setTab("login");
                  setRegistrationSuccess(null);
                  loginForm.setValue("uniqueId", registrationSuccess.uniqueId);
                }}
              >
                Continue to Sign In
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue={tab} value={tab} onValueChange={(value) => setTab(value as "login" | "register")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border-0 shadow-none">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                    <FormField
                      control={loginForm.control}
                      name="uniqueId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unique ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your unique ID" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the ID you received when registering
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={loginWithId.isPending}
                    >
                      {loginWithId.isPending ? "Signing in..." : "Sign In"}
                      <LogIn className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="border-0 shadow-none">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                    <FormField
                      control={registerForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={registerUser.isPending}
                    >
                      {registerUser.isPending ? "Creating account..." : "Create Account"}
                      <UserPlus className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}