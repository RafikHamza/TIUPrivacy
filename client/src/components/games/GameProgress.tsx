import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TrendingUp, Award, Brain, User, ShieldCheck, Download, Share2, Briefcase, Building } from 'lucide-react';

// Define types for game progress
interface GameScore {
  phishingSimulator: number;
  passwordStrength: number;
  securityQuiz: number;
  workplaceSecurity: number;
  businessPrivacy: number;
}

interface GameProgress {
  scores: GameScore;
  completedGames: string[];
  lastPlayed: Record<string, Date>;
  highScores: GameScore;
}

// Initial game progress state
const initialGameProgress: GameProgress = {
  scores: {
    phishingSimulator: 0,
    passwordStrength: 0,
    securityQuiz: 0,
    workplaceSecurity: 0,
    businessPrivacy: 0,
  },
  completedGames: [],
  lastPlayed: {},
  highScores: {
    phishingSimulator: 0,
    passwordStrength: 0,
    securityQuiz: 0,
    workplaceSecurity: 0,
    businessPrivacy: 0,
  }
};

export function useGameProgress() {
  const { user } = useAuth();
  const [gameProgress, setGameProgress] = useState<GameProgress>(initialGameProgress);
  
  // Load game progress from localStorage when component mounts
  useEffect(() => {
    if (user) {
      try {
        const savedProgress = localStorage.getItem(`gameProgress_${user.uniqueId}`);
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          
          // Convert string dates back to Date objects
          if (parsedProgress.lastPlayed) {
            Object.keys(parsedProgress.lastPlayed).forEach(game => {
              parsedProgress.lastPlayed[game] = new Date(parsedProgress.lastPlayed[game]);
            });
          }
          
          setGameProgress(parsedProgress);
        }
      } catch (error) {
        console.error('Failed to load game progress:', error);
      }
    }
  }, [user]);
  
  // Save game progress to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`gameProgress_${user.uniqueId}`, JSON.stringify(gameProgress));
    }
  }, [gameProgress, user]);
  
  // Function to update a game score
  const updateGameScore = (game: keyof GameScore, score: number) => {
    setGameProgress(prev => {
      const isHighScore = score > prev.highScores[game];
      const newCompletedGames = prev.completedGames.includes(game) 
        ? prev.completedGames 
        : [...prev.completedGames, game];
      
      return {
        scores: {
          ...prev.scores,
          [game]: score
        },
        completedGames: newCompletedGames,
        lastPlayed: {
          ...prev.lastPlayed,
          [game]: new Date()
        },
        highScores: {
          ...prev.highScores,
          [game]: isHighScore ? score : prev.highScores[game]
        }
      };
    });
  };
  
  // Function to get the overall progress percentage
  const getOverallProgress = () => {
    const { phishingSimulator, passwordStrength, securityQuiz, workplaceSecurity, businessPrivacy } = gameProgress.highScores;
    const totalScore = phishingSimulator + passwordStrength + securityQuiz + workplaceSecurity + businessPrivacy;
    const maxPossibleScore = 500; // Assuming each activity has a max score of 100
    return Math.round((totalScore / maxPossibleScore) * 100);
  };
  
  // Check if user has completed all games and qualifies for certificate
  const qualifiesForCertificate = () => {
    const { phishingSimulator, passwordStrength, securityQuiz, workplaceSecurity, businessPrivacy } = gameProgress.highScores;
    // Check if all five activities have been played and have a score
    return phishingSimulator > 0 && passwordStrength > 0 && securityQuiz > 0 && 
           workplaceSecurity > 0 && businessPrivacy > 0;
  };
  
  return {
    gameProgress,
    updateGameScore,
    getOverallProgress,
    qualifiesForCertificate
  };
}

export function GameProgressDisplay() {
  const { gameProgress, getOverallProgress, qualifiesForCertificate } = useGameProgress();
  const { user } = useAuth();
  const [certificateDialog, setCertificateDialog] = useState(false);
  
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Progress</CardTitle>
          <CardDescription>
            Log in to track your progress across cybersecurity activities.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const overallProgress = getOverallProgress();
  const hasCompletedAll = qualifiesForCertificate();
  const { phishingSimulator, passwordStrength, securityQuiz, workplaceSecurity, businessPrivacy } = gameProgress.highScores;
  
  // Function to update record in the backend that user has completed training
  const recordCompletion = async () => {
    try {
      if (user) {
        await fetch('/api/record-completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uniqueId: user.uniqueId,
            displayName: user.displayName,
            completionDate: new Date().toISOString(),
            scores: {
              phishingSimulator,
              passwordStrength,
              securityQuiz,
              workplaceSecurity,
              businessPrivacy,
              overall: overallProgress
            }
          })
        });
      }
    } catch (error) {
      console.error('Failed to record completion:', error);
    }
  };

  const handleShowCertificate = () => {
    setCertificateDialog(true);
    // Record this completion in the database for the instructor to see
    if (hasCompletedAll) {
      recordCompletion();
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Learning Progress
          </CardTitle>
          <CardDescription>
            Track your performance across all cybersecurity games
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
          
          <div className="grid gap-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Phishing Simulator</span>
              </div>
              <Badge variant={phishingSimulator > 0 ? "default" : "outline"} className="bg-blue-500 hover:bg-blue-600">
                {phishingSimulator > 0 ? `${phishingSimulator}%` : 'Not played'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Password Strength</span>
              </div>
              <Badge variant={passwordStrength > 0 ? "default" : "outline"} className="bg-green-500 hover:bg-green-600">
                {passwordStrength > 0 ? `${passwordStrength}%` : 'Not played'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Security Quiz</span>
              </div>
              <Badge variant={securityQuiz > 0 ? "default" : "outline"} className="bg-purple-500 hover:bg-purple-600">
                {securityQuiz > 0 ? `${securityQuiz}%` : 'Not played'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Workplace Security</span>
              </div>
              <Badge variant={workplaceSecurity > 0 ? "default" : "outline"} className="bg-amber-500 hover:bg-amber-600">
                {workplaceSecurity > 0 ? `${workplaceSecurity}%` : 'Not played'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-cyan-500" />
                <span className="text-sm font-medium">Digital Business</span>
              </div>
              <Badge variant={businessPrivacy > 0 ? "default" : "outline"} className="bg-cyan-500 hover:bg-cyan-600">
                {businessPrivacy > 0 ? `${businessPrivacy}%` : 'Not played'}
              </Badge>
            </div>
          </div>
          
          <div className="pt-2 border-t mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user.displayName}'s learning journey</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Complete all games to become a cybersecurity expert!
            </p>
          </div>
        </CardContent>
        {hasCompletedAll && (
          <CardFooter>
            <Button className="w-full" onClick={handleShowCertificate}>
              <Award className="mr-2 h-4 w-4" />
              View Completion Certificate
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={certificateDialog} onOpenChange={setCertificateDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Certificate of Completion</DialogTitle>
            <DialogDescription className="text-center">
              Privacy Awareness Training
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm my-4">
            <div className="text-center space-y-6">
              <div className="border-b border-t py-4 border-primary/30">
                <h2 className="text-xl font-bold text-primary">Certificate of Achievement</h2>
                <p className="text-muted-foreground">Introduction to Digital Privacy and Data Security</p>
              </div>
              
              <div className="py-8">
                <p className="text-lg font-medium">This certificate is presented to</p>
                <h3 className="text-3xl font-bold mt-2 text-primary">{user.displayName}</h3>
                <p className="mt-4">For successfully completing the cybersecurity awareness training</p>
                <p className="mt-2 text-muted-foreground">
                  Demonstrating competence in recognizing phishing attacks, workplace security practices,
                  digital business privacy considerations, and the safe use of social media and AI-powered chatbots
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-8 border-t pt-4">
                <div className="text-left">
                  <p className="font-semibold">Prof. HAMZA Rafik</p>
                  <p className="text-sm text-muted-foreground">Course Instructor</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p className="text-sm text-muted-foreground">Date of Completion</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto" variant="outline" onClick={() => setCertificateDialog(false)}>
              Close
            </Button>
            <Button className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
            <Button className="w-full sm:w-auto" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}