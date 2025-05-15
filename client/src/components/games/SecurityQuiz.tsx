import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, BookOpen, CheckCircle, XCircle, ArrowLeft, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import type { UserProgress } from '@/lib/storage';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a strong indicator that an email might be phishing?",
    options: [
      "The sender's email address looks similar to a legitimate company but has small differences",
      "The email was sent during business hours",
      "The email contains the company's official logo",
      "The email is addressed to you by name"
    ],
    correctAnswer: 0,
    explanation: "Phishers often use email addresses that look similar to legitimate ones but have slight differences (e.g., support@arnaz0n.com instead of amazon.com)."
  },
  {
    id: 2,
    question: "Which password is most secure?",
    options: [
      "Password123",
      "MyBirthday1990",
      "P@ssw0rd!",
      "kM9$pL2#vN5*qR"
    ],
    correctAnswer: 3,
    explanation: "The last option is strongest because it uses a mix of uppercase, lowercase, numbers, and special characters in a random pattern."
  },
  {
    id: 3,
    question: "What should you do if you suspect your account has been compromised?",
    options: [
      "Wait and see if anything unusual happens",
      "Only notify your friends",
      "Immediately change your password and enable two-factor authentication",
      "Just enable two-factor authentication"
    ],
    correctAnswer: 2,
    explanation: "Changing your password and enabling 2FA provides two layers of protection against unauthorized access."
  },
  {
    id: 4,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Having two passwords",
      "A second way to verify your identity, like a code sent to your phone",
      "Logging in from two different devices",
      "Double-checking your password"
    ],
    correctAnswer: 1,
    explanation: "2FA adds an extra layer of security by requiring two different types of verification - typically something you know (password) and something you have (like your phone)."
  },
  {
    id: 5,
    question: "Which practice is most secure for storing passwords?",
    options: [
      "Writing them down in a notebook",
      "Using the same password for all accounts",
      "Using a reputable password manager",
      "Saving them in a text file on your computer"
    ],
    correctAnswer: 2,
    explanation: "Password managers securely encrypt your passwords and often include features like password generation and breach monitoring."
  }
];

export default function SecurityQuiz() {
  const { progress, setProgress } = useContext(AppContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [questionsOrder, setQuestionsOrder] = useState<number[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Generate array of indices and shuffle them
    const indices = Array.from({ length: quizQuestions.length }, (_, i) => i);
    setQuestionsOrder(indices.sort(() => Math.random() - 0.5));
  }, []);

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === quizQuestions[questionsOrder[currentQuestion]].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowExplanation(false);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      
      // Update progress
      const updatedProgress: UserProgress = {
        ...progress,
        points: progress.points + score * 10,
        modules: {
          ...progress.modules,
          'security': {
            ...progress.modules['security'],
            completed: score >= 4,
            challenges: {
              ...progress.modules['security'].challenges,
              'security-quiz': true
            }
          }
        }
      };

      // Award badge if they got a high score
      if (score >= 4 && !progress.badges.includes('quiz-master')) {
        updatedProgress.badges = [...updatedProgress.badges, 'quiz-master'];
      }

      setProgress(updatedProgress);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowExplanation(false);
    }
  };

  const restartQuiz = () => {
    // Generate new shuffled order
    const indices = Array.from({ length: quizQuestions.length }, (_, i) => i);
    setQuestionsOrder(indices.sort(() => Math.random() - 0.5));
    
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizComplete(false);
    setReviewMode(false);
    setShowExplanation(false);
  };

  const startReview = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setReviewMode(true);
    setShowExplanation(false);
  };

  if (questionsOrder.length === 0) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (quizComplete) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete!</CardTitle>
          <CardDescription className="text-center">
            You scored {score} out of {quizQuestions.length} points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto text-primary" />
            <p className="mt-4 text-lg">
              {score >= 4 ? "Great job! You're well-versed in security practices!" :
               "Keep learning about security best practices!"}
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-center">Want to improve your score?</h3>
            <div className="flex justify-center gap-4">
              <Button onClick={restartQuiz}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" onClick={startReview}>
                <BookOpen className="mr-2 h-4 w-4" />
                Review Answers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuizQuestion = quizQuestions[questionsOrder[currentQuestion]];

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge variant="outline">
              Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
            </Badge>
          </div>
          <CardTitle className="mt-4">{currentQuizQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => !showFeedback && handleAnswer(parseInt(value))}
            className="space-y-2"
          >
            {currentQuizQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded ${
                  showFeedback
                    ? index === currentQuizQuestion.correctAnswer
                      ? "bg-green-100"
                      : selectedAnswer === index
                      ? "bg-red-100"
                      : ""
                    : "hover:bg-gray-100"
                }`}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={showFeedback}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer"
                >
                  {option}
                </Label>
                {showFeedback && (
                  index === currentQuizQuestion.correctAnswer ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : selectedAnswer === index ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : null
                )}
              </div>
            ))}
          </RadioGroup>

          {showFeedback && (
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                {showExplanation ? "Hide" : "Show"} Explanation
              </Button>
              {showExplanation && (
                <p className="mt-2 text-sm text-gray-600">
                  {currentQuizQuestion.explanation}
                </p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {!showFeedback ? (
            <Button
              disabled={selectedAnswer === null}
              onClick={() => handleAnswer(selectedAnswer!)}
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              {currentQuestion === quizQuestions.length - 1 ? (
                "Complete Quiz"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="flex justify-between items-center max-w-2xl mx-auto">
        <div className="flex-1 mr-4">
          <Progress
            value={((currentQuestion + (showFeedback ? 1 : 0)) / quizQuestions.length) * 100}
            className="h-2"
          />
        </div>
        <span className="text-sm font-medium">
          Progress: {currentQuestion + (showFeedback ? 1 : 0)}/{quizQuestions.length}
        </span>
      </div>
    </div>
  );
}