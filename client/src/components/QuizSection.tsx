import { useState, useContext, useEffect } from "react";
import { Quiz, ModuleId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import { addPoints, updateModuleProgress } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface QuizSectionProps {
  quizzes: Quiz[];
  moduleId: ModuleId;
  onComplete: () => void;
}

const QuizSection = ({ quizzes, moduleId, onComplete }: QuizSectionProps) => {
  const { toast } = useToast();
  const { progress, setProgress } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Calculate total available points
    const total = quizzes.reduce((sum, quiz) => sum + quiz.points, 0);
    setTotalPoints(total);
  }, [quizzes]);

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const currentQuiz = quizzes[currentQuestionIndex];
    const selectedOptionObj = currentQuiz.options.find(o => o.id === selectedOption);
    
    if (!selectedOptionObj) return;
    
    const correct = selectedOptionObj.isCorrect;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      // Award points for correct answer
      const pointsAwarded = currentQuiz.points;
      const updatedProgress = addPoints(pointsAwarded);
      setProgress(updatedProgress);
      setScore(prev => prev + pointsAwarded);

      toast({
        title: "Correct!",
        description: `You earned ${pointsAwarded} points.`,
        variant: "success",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Try again next time.",
        variant: "destructive",
      });
    }

    // Save quiz progress
    updateModuleProgress(moduleId, (moduleProgress) => {
      return {
        ...moduleProgress,
        quizzes: {
          ...moduleProgress.quizzes,
          [currentQuiz.id]: correct ? currentQuiz.points : 0
        },
        lastVisited: new Date().toISOString()
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete();
    }
  };

  if (!quizzes.length) return null;

  const currentQuiz = quizzes[currentQuestionIndex];

  return (
    <div className="pt-6 border-t border-neutral-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-inter text-xl font-bold text-neutral-800">Knowledge Check</h2>
        <div className="bg-neutral-100 rounded-full px-3 py-1">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {quizzes.length}
          </span>
        </div>
      </div>
      
      {/* Quiz Progress */}
      <div className="mb-4">
        <Progress value={(score / totalPoints) * 100} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-neutral-500">
          <span>{score} points earned</span>
          <span>{totalPoints} total points</span>
        </div>
      </div>
      
      {/* Quiz Question */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium text-neutral-700 mb-4">{currentQuiz.question}</h3>
          
          <div className="space-y-3">
            {currentQuiz.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={isAnswered}
                className={`quiz-option group w-full text-left px-4 py-3 rounded-lg border-2 
                  ${selectedOption === option.id 
                    ? isAnswered
                      ? option.isCorrect 
                        ? "border-success bg-success/5" 
                        : "border-destructive bg-destructive/5"
                      : "border-primary bg-primary/5"
                    : "border-neutral-200 hover:border-primary"
                  } transition-all duration-200 flex items-center`}
              >
                <div className={`w-6 h-6 rounded-full border-2 
                  ${selectedOption === option.id
                    ? isAnswered
                      ? option.isCorrect 
                        ? "border-success" 
                        : "border-destructive"
                      : "border-primary"
                    : "border-neutral-300 group-hover:border-primary"
                  } flex-shrink-0 flex items-center justify-center mr-3`}
                >
                  {selectedOption === option.id && isAnswered && (
                    <div className={`w-3 h-3 rounded-full ${
                      option.isCorrect ? "bg-success" : "bg-destructive"
                    }`}></div>
                  )}
                  {selectedOption === option.id && !isAnswered && (
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  )}
                  {selectedOption !== option.id && (
                    <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-20"></div>
                  )}
                </div>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
          
          {isAnswered && (
            <div className={`mt-4 p-3 rounded-lg ${isCorrect ? "bg-success/10" : "bg-destructive/10"}`}>
              <p className={`text-sm ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect 
                  ? "Correct! " 
                  : "Incorrect. "}
                {currentQuiz.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Quiz Navigation */}
      <div className="flex justify-end">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmitAnswer}
            disabled={!selectedOption}
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < quizzes.length - 1 ? "Next Question" : "Complete Quiz"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
