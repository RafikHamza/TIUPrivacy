import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle, Info, Key, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppContext } from '@/context/AppContext';
import type { UserProgress } from '@/lib/storage';

interface PasswordCriteria {
  regex: RegExp;
  description: string;
  points: number;
}

interface TestResult {
  password: string;
  strength: number;
}

const passwordCriteria: PasswordCriteria[] = [
  { regex: /.{8,}/, description: "At least 8 characters", points: 1 },
  { regex: /[A-Z]/, description: "Contains uppercase letters", points: 1 },
  { regex: /[a-z]/, description: "Contains lowercase letters", points: 1 },
  { regex: /[0-9]/, description: "Contains numbers", points: 2 },
  { regex: /[^A-Za-z0-9]/, description: "Contains special characters", points: 2 },
  { regex: /.{12,}/, description: "12+ characters (bonus)", points: 1 }
];

const getStrengthCategory = (strength: number): string => {
  const percentage = (strength / 8) * 100;
  if (percentage >= 70) return "Strong";
  if (percentage >= 40) return "Medium";
  return "Weak";
};

const getVariantForStrength = (strength: number): "default" | "outline" | "destructive" => {
  const percentage = (strength / 8) * 100;
  if (percentage >= 70) return "default";
  if (percentage >= 40) return "outline";
  return "destructive";
};

const getColorClassForStrength = (strength: number): string => {
  const percentage = (strength / 8) * 100;
  if (percentage >= 70) return "bg-green-500 hover:bg-green-600 text-white";
  if (percentage >= 40) return "bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500";
  return "";
};

export default function PasswordStrengthGame() {
  const { progress, setProgress } = useContext(AppContext);
  const [password, setPassword] = useState("");
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [metCriteria, setMetCriteria] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [tabValue, setTabValue] = useState("game");
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  useEffect(() => {
    // Check password strength when password changes
    const criteria = passwordCriteria.filter(c => c.regex.test(password));
    setMetCriteria(criteria.map(c => c.description));
    const newScore = criteria.reduce((acc, curr) => acc + curr.points, 0);
    setScore(newScore);
  }, [password]);

  const handleSubmit = () => {
    setGameComplete(true);
    setShowFeedback(true);

    // Update progress
    const updatedProgress: UserProgress = {
      ...progress,
      points: progress.points + score * 10,
      modules: {
        ...progress.modules,
        'email': {
          ...progress.modules['email'],
          completed: score >= 4,
          challenges: {
            ...progress.modules['email'].challenges,
            'password-strength': true
          }
        }
      }
    };

    // Award badge if they created a strong password
    if (score >= 4 && !progress.badges.includes('password-master')) {
      updatedProgress.badges = [...updatedProgress.badges, 'password-master'];
    }

    setProgress(updatedProgress);
  };

  const restartGame = () => {
    setPassword("");
    setScore(0);
    setGameComplete(false);
    setShowFeedback(false);
    setMetCriteria([]);
  };

  const addTestPassword = () => {
    if (password) {
      setTestResults([...testResults, { password, strength: score }]);
      setPassword("");
    }
  };

  return (
    <div className="space-y-4">
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList>
          <TabsTrigger value="game">Password Game</TabsTrigger>
          <TabsTrigger value="test">Password Tester</TabsTrigger>
        </TabsList>

        <TabsContent value="game">
          <Card>
            <CardHeader>
              <CardTitle>Password Strength Game</CardTitle>
              <CardDescription>
                Create a strong password that meets security criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={gameComplete}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Password Strength</span>
                  <span>{getStrengthCategory(score)}</span>
                </div>
                <Progress value={(score / 8) * 100} className="h-2" />
              </div>

              <div className="space-y-2">
                {passwordCriteria.map((criteria) => (
                  <div
                    key={criteria.description}
                    className="flex items-center space-x-2"
                  >
                    {criteria.regex.test(password) ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-300" />
                    )}
                    <span className="text-sm">{criteria.description}</span>
                  </div>
                ))}
              </div>

              {showFeedback && (
                <Alert
                  variant={score >= 4 ? "default" : "destructive"}
                >
                  {score >= 4 ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {score >= 4 ? "Great Password!" : "Try Again"}
                  </AlertTitle>
                  <AlertDescription>
                    {score >= 4
                      ? "Your password meets the security requirements."
                      : "Your password needs to be stronger. Try adding more variety."}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              {!gameComplete ? (
                <Button className="w-full" onClick={handleSubmit}>
                  Submit Password
                </Button>
              ) : (
                <Button className="w-full" onClick={restartGame}>
                  Try Another Password
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Password Tester</CardTitle>
              <CardDescription>
                Test multiple passwords to see their strength
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter a password to test"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addTestPassword}>Test</Button>
              </div>

              <div className="space-y-2">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span className="text-sm">{result.password}</span>
                    <Badge variant={getVariantForStrength(result.strength)}>
                      {getStrengthCategory(result.strength)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}