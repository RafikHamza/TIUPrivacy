import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle, Info, Key, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PasswordCriteria {
  regex: RegExp;
  description: string;
  points: number;
}

const passwordCriteria: PasswordCriteria[] = [
  { regex: /.{8,}/, description: "At least 8 characters", points: 10 },
  { regex: /[A-Z]/, description: "Contains uppercase letters", points: 10 },
  { regex: /[a-z]/, description: "Contains lowercase letters", points: 10 },
  { regex: /[0-9]/, description: "Contains numbers", points: 10 },
  { regex: /[^A-Za-z0-9]/, description: "Contains special characters", points: 10 },
  { regex: /.{12,}/, description: "At least 12 characters (extra secure)", points: 10 },
  { regex: /^(?!.*(.)\1{2,}).*$/, description: "No repeating characters (aaa)", points: 10 },
  { regex: /^(?!.*(password|123456|qwerty)).*$/i, description: "No common patterns", points: 10 },
];

// Common bad passwords for the guessing game
const commonPasswords = [
  "123456", "password", "12345678", "qwerty", "abc123", 
  "monkey", "letmein", "dragon", "baseball", "football",
  "welcome", "admin", "princess", "sunshine", "master",
  "hello", "freedom", "whatever", "qazwsx", "trustno1"
];

export default function PasswordStrengthGame() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [criteriaMatch, setCriteriaMatch] = useState<boolean[]>([]);
  const [activeTab, setActiveTab] = useState('strength');
  const [gamePassword, setGamePassword] = useState("");
  const [guessAttempts, setGuessAttempts] = useState(0);
  const [gameGuess, setGameGuess] = useState("");
  const [gameResult, setGameResult] = useState<"playing" | "won" | "lost">("playing");
  const [hints, setHints] = useState<string[]>([]);

  // Initialize a random password for the guessing game
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * commonPasswords.length);
    setGamePassword(commonPasswords[randomIndex]);
  }, []);

  // Calculate password strength
  useEffect(() => {
    const matchResults = passwordCriteria.map(criteria => criteria.regex.test(password));
    setCriteriaMatch(matchResults);
    
    // Calculate total points
    const totalPoints = matchResults.reduce((total, matches, index) => {
      return total + (matches ? passwordCriteria[index].points : 0);
    }, 0);
    
    setStrength(totalPoints);
  }, [password]);

  // Get strength category label and color
  const getStrengthCategory = () => {
    if (strength >= 70) return { label: "Strong", color: "bg-green-500" };
    if (strength >= 40) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Weak", color: "bg-red-500" };
  };

  // Handle password guessing game submit
  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (gameResult !== "playing") return;
    
    // Check if the guess matches the password
    if (gameGuess.toLowerCase() === gamePassword.toLowerCase()) {
      setGameResult("won");
      return;
    }
    
    // Increment attempts and provide hints
    const attempts = guessAttempts + 1;
    setGuessAttempts(attempts);
    
    // Generate a new hint
    let newHint = "";
    if (attempts === 1) {
      newHint = `The password has ${gamePassword.length} characters`;
    } else if (attempts === 2) {
      newHint = `The first character is "${gamePassword[0]}"`;
    } else if (attempts === 3) {
      newHint = `The password ${/\d/.test(gamePassword) ? "contains" : "doesn't contain"} numbers`;
    } else if (attempts === 4) {
      newHint = `The last character is "${gamePassword[gamePassword.length - 1]}"`;
    } else if (attempts >= 5) {
      setGameResult("lost");
    }
    
    if (newHint) {
      setHints([...hints, newHint]);
    }
    
    // Clear the input field
    setGameGuess("");
  };

  // Reset the guessing game
  const resetGuessGame = () => {
    const randomIndex = Math.floor(Math.random() * commonPasswords.length);
    setGamePassword(commonPasswords[randomIndex]);
    setGuessAttempts(0);
    setGameGuess("");
    setGameResult("playing");
    setHints([]);
  };

  const strengthCategory = getStrengthCategory();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Password Security Learning</CardTitle>
        <CardDescription>
          Learn about creating strong passwords and the dangers of using common passwords
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="strength">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Password Strength
            </TabsTrigger>
            <TabsTrigger value="guess">
              <Key className="h-4 w-4 mr-2" />
              Common Password Game
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="strength" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="text-sm font-medium">
                  Test your password strength:
                </label>
                <Input
                  id="password"
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter a password to check"
                  className="mt-1"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Strength: {strength}%</span>
                  <Badge variant={
                    strength >= 70 ? "default" : 
                    strength >= 40 ? "outline" : "destructive"
                  } className={
                    strength >= 70 ? "bg-green-500 hover:bg-green-600 text-white" :
                    strength >= 40 ? "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500" : ""
                  }>
                    {strengthCategory.label}
                  </Badge>
                </div>
                <Progress
                  value={strength}
                  className={`h-2 ${strengthCategory.color}`}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Password criteria:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {passwordCriteria.map((criteria, index) => (
                    <div 
                      key={index} 
                      className="flex items-center text-sm"
                    >
                      {criteriaMatch[index] ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      )}
                      <span>{criteria.description}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Password Tips</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Use a mix of characters, numbers, and symbols</li>
                    <li>Make passwords at least 12 characters long</li>
                    <li>Avoid using personal information</li>
                    <li>Don't use the same password for multiple accounts</li>
                    <li>Consider using a password manager</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          
          <TabsContent value="guess" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Alert className="mb-4 border-yellow-500 bg-yellow-50 text-yellow-800">
                  <AlertCircle className="h-4 w-4 text-yellow-800" />
                  <AlertTitle>The Danger of Common Passwords</AlertTitle>
                  <AlertDescription>
                    Hackers often try common passwords first. This game demonstrates how easily they can be guessed.
                  </AlertDescription>
                </Alert>

                {gameResult === "playing" && (
                  <form onSubmit={handleGuessSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="guess" className="text-sm font-medium">
                        Try to guess the common password:
                      </label>
                      <div className="flex mt-1">
                        <Input
                          id="guess"
                          type="text"
                          value={gameGuess}
                          onChange={e => setGameGuess(e.target.value)}
                          placeholder="Enter your guess"
                          className="rounded-r-none"
                        />
                        <Button type="submit" className="rounded-l-none">
                          Guess
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Attempts: {guessAttempts}/5
                      </p>
                    </div>
                    
                    {hints.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Hints:</h3>
                        <ul className="space-y-1">
                          {hints.map((hint, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <Info className="h-3 w-3 text-blue-500 mr-2" />
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </form>
                )}
                
                {gameResult === "won" && (
                  <Alert className="mb-4 border-green-500 bg-green-50 text-green-800">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>You guessed correctly!</AlertTitle>
                    <AlertDescription>
                      The password was "{gamePassword}". This demonstrates why using common passwords is dangerous.
                      <Button 
                        variant="outline" 
                        className="mt-2" 
                        onClick={resetGuessGame}
                      >
                        Play Again
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                {gameResult === "lost" && (
                  <Alert variant="destructive" className="mb-4">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>Game Over</AlertTitle>
                    <AlertDescription>
                      The password was "{gamePassword}". Even though you couldn't guess it in 5 tries, 
                      automated tools can try thousands of passwords per second.
                      <Button 
                        variant="outline" 
                        className="mt-2" 
                        onClick={resetGuessGame}
                      >
                        Play Again
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}
                
                <Alert className="mt-4">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Security Best Practices</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Never use common passwords like "password" or "123456"</li>
                      <li>Avoid using personal information that others might know</li>
                      <li>Use unique passwords for each of your accounts</li>
                      <li>Enable two-factor authentication when available</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}