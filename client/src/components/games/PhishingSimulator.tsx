import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, CheckCircle, XCircle, Mail, Shield, Award } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import type { UserProgress } from '@/lib/storage';

interface PhishingEmail {
  id: number;
  subject: string;
  sender: string;
  body: string;
  cta: string;
  isPhishing: boolean;
  clues: string[];
}

const phishingExamples: PhishingEmail[] = [
  {
    id: 1,
    subject: "Your Account Has Been Compromised",
    sender: "security@amaz0n-security.net",
    body: "Dear Customer, We have detected unusual activity in your account. Please click the link below to verify your identity and secure your account immediately. If you do not verify within 24 hours, your account will be suspended.",
    cta: "Click here to secure your account",
    isPhishing: true,
    clues: [
      "The sender domain is not the official amazon.com domain",
      "Urgent action request with threats is a common phishing tactic",
      "Suspicious URL in the 'click here' link"
    ]
  },
  {
    id: 2,
    subject: "Your Tax Refund is Ready",
    sender: "refunds@irs-gov.org",
    body: "You are eligible for a tax refund of $820.50. To receive your refund, you need to complete the verification process by providing your bank account details. Click below to claim your refund now.",
    cta: "Claim Your Refund Now",
    isPhishing: true,
    clues: [
      "The IRS never initiates contact via email about tax refunds",
      "The domain is not the official .gov domain",
      "Requesting bank details via email is a red flag"
    ]
  },
  {
    id: 3,
    subject: "Your Order has Shipped",
    sender: "orders@amazon.com",
    body: "Hello, Your recent order #A8792345 has shipped and is on its way. You can track your package using the tracking number below. Thank you for shopping with us!",
    cta: "Track Your Package",
    isPhishing: false,
    clues: [
      "Legitimate sender domain from amazon.com",
      "No urgent action required or threats",
      "Specific order number mentioned",
      "No personal or financial information requested"
    ]
  },
  {
    id: 4,
    subject: "Action Required: Verify Your Google Account",
    sender: "security@accounts.g00gle.com",
    body: "Your Google Account needs verification. Someone tried to access your account from a new device. If this wasn't you, please verify your account immediately to prevent unauthorized access.",
    cta: "Verify Account Now",
    isPhishing: true,
    clues: [
      "Misspelled domain (g00gle instead of google)",
      "Creates a sense of urgency",
      "Vague information about the supposed login attempt"
    ]
  },
  {
    id: 5,
    subject: "Password Reset Request",
    sender: "noreply@dropbox.com",
    body: "You recently requested a password reset for your Dropbox account. Please click the button below to set a new password. If you didn't request this, you can safely ignore this email.",
    cta: "Reset Password",
    isPhishing: false,
    clues: [
      "Legitimate sender domain",
      "No urgency or threats",
      "Option to ignore if you didn't request it",
      "No request for personal information in the email"
    ]
  }
];

export default function PhishingSimulator() {
  const { progress, setProgress } = useContext(AppContext);
  const [currentEmail, setCurrentEmail] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [shuffledEmails, setShuffledEmails] = useState<PhishingEmail[]>([]);
  const [showClues, setShowClues] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [lastAnswer, setLastAnswer] = useState<{ correct: boolean; isPhishing: boolean }>({
    correct: false,
    isPhishing: false,
  });

  useEffect(() => {
    setShuffledEmails([...phishingExamples].sort(() => Math.random() - 0.5));
  }, []);

  const handleAnswer = (selectedIsPhishing: boolean) => {
    const correct = selectedIsPhishing === shuffledEmails[currentEmail].isPhishing;
    if (correct) {
      setScore(score + 1);
    }
    setLastAnswer({ correct, isPhishing: shuffledEmails[currentEmail].isPhishing });
    setShowFeedback(true);
  };

  const nextEmail = () => {
    if (currentEmail < shuffledEmails.length - 1) {
      setCurrentEmail(currentEmail + 1);
      setShowClues(false);
      setShowFeedback(false);
    } else {
      // Game complete
      setGameComplete(true);
      
      const updatedProgress: UserProgress = {
        ...progress,
        points: progress.points + score * 10, // 10 points per correct answer
        badges: score >= 8 && !progress.badges.includes('phishing-expert')
          ? [...progress.badges, 'phishing-expert']
          : progress.badges,
        modules: {
          ...progress.modules,
          'phishing': {
            ...progress.modules['phishing'],
            completed: score >= 8, // Complete if score is 80% or higher
            challenges: {
              ...progress.modules['phishing'].challenges,
              'phishing-simulator': true
            }
          }
        }
      };
      
      setProgress(updatedProgress);
    }
  };

  const restartGame = () => {
    setCurrentEmail(0);
    setScore(0);
    setGameComplete(false);
    setShowClues(false);
    setShowFeedback(false);
    setShuffledEmails([...phishingExamples].sort(() => Math.random() - 0.5));
  };

  if (shuffledEmails.length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (gameComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Phishing Simulation Complete!</CardTitle>
          <CardDescription className="text-center">
            You scored {score} out of {shuffledEmails.length} points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto text-primary" />
            <p className="mt-4 text-lg">
              {score >= 80 ? "Excellent work! You're a phishing detection expert." :
               score >= 60 ? "Good job! You've got solid phishing awareness skills." :
               "You're making progress. Keep learning about phishing tactics!"}
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Remember these key phishing indicators:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Check the sender's email domain carefully</li>
              <li>Be suspicious of urgent requests or threats</li>
              <li>Hover over links before clicking them</li>
              <li>Be wary of requests for personal information</li>
              <li>Watch for poor grammar and spelling</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={restartGame}>
            Play Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const email = shuffledEmails[currentEmail];
  
  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Phishing Email Simulator</CardTitle>
          <CardDescription>
            Can you identify which emails are phishing attempts? Review each email and decide if it's legitimate or a phishing attempt.
          </CardDescription>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm">
              Email {currentEmail + 1} of {shuffledEmails.length}
            </div>
            <div className="text-sm font-medium">
              Score: {score}/{shuffledEmails.length}
            </div>
          </div>
          <Progress value={(currentEmail / shuffledEmails.length) * 100} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">From: {email.sender}</div>
              </div>
              <div className="text-base font-semibold">Subject: {email.subject}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{email.body}</p>
              <Button variant="link" className="mt-4 p-0 h-auto text-blue-600">
                {email.cta}
              </Button>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button 
            variant="outline" 
            className="w-1/2" 
            onClick={() => handleAnswer(false)}
            disabled={showFeedback}
          >
            <Shield className="mr-2 h-4 w-4" />
            Legitimate
          </Button>
          <Button 
            variant="outline" 
            className="w-1/2" 
            onClick={() => handleAnswer(true)} 
            disabled={showFeedback}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Phishing
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {lastAnswer.correct ? (
                <><CheckCircle className="h-5 w-5 text-green-500" /> Correct!</>
              ) : (
                <><XCircle className="h-5 w-5 text-red-500" /> Incorrect!</>
              )}
            </DialogTitle>
            <DialogDescription>
              {lastAnswer.isPhishing ? (
                <Alert variant="destructive" className="mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>This is a phishing email</AlertTitle>
                  <AlertDescription>
                    {shuffledEmails[currentEmail].clues.join('. ')}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="mt-2 border-green-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>This is a legitimate email</AlertTitle>
                  <AlertDescription>
                    {shuffledEmails[currentEmail].clues.join('. ')}
                  </AlertDescription>
                </Alert>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={nextEmail}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}