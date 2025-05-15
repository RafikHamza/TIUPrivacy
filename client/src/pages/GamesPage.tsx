import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Key, BookOpen, BadgeCheck } from 'lucide-react';
import PhishingSimulator from '@/components/games/PhishingSimulator';
import PasswordStrengthGame from '@/components/games/PasswordStrengthGame';
import SecurityQuiz from '@/components/games/SecurityQuiz';
import { AppContext } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState('phishing');
  const { progress } = useContext(AppContext);

  // Calculate completion percentage
  const totalChallenges = Object.values(progress.modules).reduce(
    (acc, module) => acc + Object.keys(module.challenges || {}).length,
    0
  );
  const completedChallenges = Object.values(progress.modules).reduce(
    (acc, module) => acc + Object.values(module.challenges || {}).filter(Boolean).length,
    0
  );
  const completionPercentage = totalChallenges ? (completedChallenges / totalChallenges) * 100 : 0;

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Security Activities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn essential cybersecurity skills through interactive activities, simulations, and quizzes.
          Practice identifying threats and strengthen your digital safety knowledge.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Your Progress</CardTitle>
            <Badge variant="secondary">
              <BadgeCheck className="mr-1 h-4 w-4" />
              {completedChallenges} / {totalChallenges} Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={completionPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Points: {progress.points}</span>
              <span>Badges: {progress.badges.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
          <TabsTrigger value="phishing" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Phishing Simulator</span>
            <span className="sm:hidden">Phishing</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden sm:inline">Password Strength</span>
            <span className="sm:hidden">Password</span>
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Security Quiz</span>
            <span className="sm:hidden">Quiz</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phishing">
          <Card>
            <CardHeader>
              <CardTitle>Phishing Email Simulator</CardTitle>
              <CardDescription>
                Test your ability to identify phishing attempts in business emails. Learn to spot common tactics used by cybercriminals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PhishingSimulator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password Strength Game</CardTitle>
              <CardDescription>
                Create strong passwords that meet security requirements. Learn what makes a password secure and hard to crack.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordStrengthGame />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Cybersecurity Quiz</CardTitle>
              <CardDescription>
                Test your knowledge of cybersecurity best practices with this interactive quiz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityQuiz />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}