import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Brain, User, ShieldCheck } from 'lucide-react';

// Define types for game progress
interface GameScore {
  phishingSimulator: number;
  passwordStrength: number;
  securityQuiz: number;
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
  },
  completedGames: [],
  lastPlayed: {},
  highScores: {
    phishingSimulator: 0,
    passwordStrength: 0,
    securityQuiz: 0,
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
    const { phishingSimulator, passwordStrength, securityQuiz } = gameProgress.highScores;
    const totalScore = phishingSimulator + passwordStrength + securityQuiz;
    const maxPossibleScore = 300; // Assuming each game has a max score of 100
    return Math.round((totalScore / maxPossibleScore) * 100);
  };
  
  // Check if user has completed all games and qualifies for certificate
  const qualifiesForCertificate = () => {
    const { phishingSimulator, passwordStrength, securityQuiz } = gameProgress.highScores;
    // Check if all three games have been played and have a score
    return phishingSimulator > 0 && passwordStrength > 0 && securityQuiz > 0;
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
          <CardTitle>Game Progress</CardTitle>
          <CardDescription>
            Log in to track your progress across cybersecurity games.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const overallProgress = getOverallProgress();
  const hasCompletedAll = qualifiesForCertificate();
  const { phishingSimulator, passwordStrength, securityQuiz } = gameProgress.highScores;
  
  return (
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
    </Card>
  );
}