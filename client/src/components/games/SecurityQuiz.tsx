import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Award, BookOpen, CheckCircle, XCircle, ArrowLeft, ArrowRight, Loader2, RefreshCcw } from 'lucide-react';

// Define quiz question type
interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// All quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is phishing?",
    options: [
      "A secure authentication method",
      "A technique to trick users into revealing sensitive information",
      "A type of computer virus",
      "A secure way to share files online"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising as a trustworthy entity in electronic communication."
  },
  {
    id: 2,
    question: "Which of the following is a good password practice?",
    options: [
      "Using the same password for all accounts",
      "Writing passwords on sticky notes",
      "Using personal information like birthdates",
      "Using a combination of letters, numbers, and special characters"
    ],
    correctAnswer: 3,
    explanation: "Using a combination of uppercase and lowercase letters, numbers, and special characters makes passwords harder to crack. Additionally, passwords should be unique for each account and never written down or shared."
  },
  {
    id: 3,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Having two passwords for one account",
      "Using two different browsers to log in",
      "A security process requiring two different authentication methods",
      "Changing your password twice a year"
    ],
    correctAnswer: 2,
    explanation: "Two-factor authentication adds an extra layer of security by requiring two different types of identification: something you know (like a password) and something you have (like a phone receiving a verification code)."
  },
  {
    id: 4,
    question: "Which of these is a sign of a potential phishing email?",
    options: [
      "The email is from someone in your contact list",
      "The email has a generic greeting like 'Dear Customer'",
      "The email was sent during business hours",
      "The email has the company's official logo"
    ],
    correctAnswer: 1,
    explanation: "Generic greetings like 'Dear Customer' or 'Dear User' instead of your name are common in phishing emails because attackers often don't know your name."
  },
  {
    id: 5,
    question: "What is a strong defense against malware?",
    options: [
      "Opening all email attachments to check them",
      "Using public Wi-Fi whenever possible",
      "Keeping software and operating systems updated",
      "Disabling your firewall"
    ],
    correctAnswer: 2,
    explanation: "Keeping software, applications, and operating systems updated ensures you have the latest security patches to protect against known vulnerabilities."
  },
  {
    id: 6,
    question: "What is social engineering in cybersecurity?",
    options: [
      "Building secure social media platforms",
      "Psychological manipulation to trick people into revealing confidential information",
      "Creating fake social media profiles",
      "Adding friends to your social networks"
    ],
    correctAnswer: 1,
    explanation: "Social engineering uses psychological manipulation to trick users into making security mistakes or giving away sensitive information. It relies on human error rather than technical hacking techniques."
  },
  {
    id: 7,
    question: "Why should you be cautious about public Wi-Fi?",
    options: [
      "It's always too slow to use",
      "It's always encrypted and secure",
      "Attackers can potentially intercept data on unsecured networks",
      "Public Wi-Fi uses too much battery power"
    ],
    correctAnswer: 2,
    explanation: "Public Wi-Fi networks are often unsecured, allowing attackers to potentially intercept the data you're sending and receiving. Using a VPN can help protect your data when using public Wi-Fi."
  },
  {
    id: 8,
    question: "What is the purpose of encryption?",
    options: [
      "To make data smaller for efficient storage",
      "To convert data into a code to prevent unauthorized access",
      "To scan files for viruses",
      "To speed up internet connections"
    ],
    correctAnswer: 1,
    explanation: "Encryption converts information into a code to prevent unauthorized access. Even if someone intercepts the data, they can't read it without the encryption key."
  },
  {
    id: 9,
    question: "What should you do if you suspect your account has been compromised?",
    options: [
      "Ignore it and hope nothing happens",
      "Only check if money is missing",
      "Immediately change your password and enable 2FA if available",
      "Share the suspicious activity on social media"
    ],
    correctAnswer: 2,
    explanation: "If you suspect your account has been compromised, you should immediately change your password, enable two-factor authentication if available, and check for any unauthorized activity."
  },
  {
    id: 10,
    question: "What is a secure way to back up important data?",
    options: [
      "Store it only on your computer's hard drive",
      "Use the 3-2-1 backup strategy (3 copies, 2 different media types, 1 offsite)",
      "Email copies of important files to yourself",
      "Only save important files on USB drives"
    ],
    correctAnswer: 1,
    explanation: "The 3-2-1 backup strategy involves having at least 3 copies of your data, stored on 2 different types of media, with 1 copy kept offsite. This provides multiple layers of protection against various types of data loss."
  }
];

export default function SecurityQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize quiz with shuffled questions
  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setLoading(false);
  }, []);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    }
  };

  const restartQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
          <CardDescription className="text-center">
            You scored {score} out of {questions.length} questions ({percentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto text-primary" />
            <p className="mt-4 text-lg">
              {percentage >= 80 ? "Excellent job! You have strong cybersecurity knowledge." :
               percentage >= 60 ? "Good work! You have a solid understanding of cybersecurity concepts." :
               "You're making progress. Keep learning about cybersecurity!"}
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Key Security Reminders:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Always be cautious of phishing attempts</li>
              <li>Use strong, unique passwords for each account</li>
              <li>Enable two-factor authentication when possible</li>
              <li>Keep your software and systems updated</li>
              <li>Be careful with sensitive information on public networks</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={restartQuiz}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Take Another Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cybersecurity Quiz</CardTitle>
        <CardDescription>
          Test your knowledge of cybersecurity best practices
        </CardDescription>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="text-sm font-medium">
            Score: {score}/{currentQuestionIndex}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
          
          <RadioGroup value={selectedOption?.toString()} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(index)}
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className={`flex-1 cursor-pointer ${
                    isAnswered && index === currentQuestion.correctAnswer
                      ? "text-green-600 font-medium"
                      : isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer
                      ? "text-red-600 font-medium"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {isAnswered && index === currentQuestion.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {showExplanation && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <div className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Explanation:</h4>
                  <p className="text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {!isAnswered ? (
            <Button 
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "See Results"
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}