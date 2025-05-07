import { useState, useContext } from "react";
import { Challenge, ModuleId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import { addPoints, updateModuleProgress, awardBadge } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface InteractiveChallengeProps {
  challenge: Challenge;
  moduleId: ModuleId;
  badgeId?: string;
  onComplete: () => void;
}

const InteractiveChallenge = ({ 
  challenge, 
  moduleId, 
  badgeId,
  onComplete 
}: InteractiveChallengeProps) => {
  const { toast } = useToast();
  const { setProgress } = useContext(AppContext);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctItems, setCorrectItems] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleItemToggle = (itemId: string) => {
    if (isSubmitted) return;
    
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleSubmit = () => {
    if (isSubmitted || selectedItems.length === 0) return;
    
    // Calculate score
    const correctAnswers = challenge.items
      .filter(item => item.isCorrect)
      .map(item => item.id);
    
    const incorrectAnswers = challenge.items
      .filter(item => !item.isCorrect)
      .map(item => item.id);
    
    // Count correct selections
    const correctSelections = selectedItems.filter(id => correctAnswers.includes(id)).length;
    
    // Count incorrect selections
    const incorrectSelections = selectedItems.filter(id => incorrectAnswers.includes(id)).length;
    
    // Calculate points (award points for correct selections, deduct for incorrect)
    const totalCorrectPossible = correctAnswers.length;
    const accuracyPercentage = (correctSelections - incorrectSelections * 0.5) / totalCorrectPossible;
    const awardedPoints = Math.max(0, Math.round(challenge.points * Math.max(0, accuracyPercentage)));
    
    setScore(awardedPoints);
    setCorrectItems(correctAnswers);
    setIsSubmitted(true);
    
    // Update progress
    const updatedProgress = addPoints(awardedPoints);
    
    // Mark challenge as completed
    const finalProgress = updateModuleProgress(moduleId, (moduleProgress) => {
      return {
        ...moduleProgress,
        challenges: {
          ...moduleProgress.challenges,
          [challenge.id]: true
        },
        lastVisited: new Date().toISOString()
      };
    });
    
    setProgress(finalProgress);
    
    // Award badge if provided and score is good
    if (badgeId && accuracyPercentage >= 0.7) {
      awardBadge(badgeId);
      toast({
        title: "Badge Earned!",
        description: "You've earned a new badge for completing this challenge.",
        variant: "success",
      });
    }
    
    // Show toast with results
    if (awardedPoints > 0) {
      toast({
        title: "Challenge Completed!",
        description: `You earned ${awardedPoints} points.`,
        variant: "success",
      });
    } else {
      toast({
        title: "Challenge Attempted",
        description: "Try again to identify more risks correctly.",
        variant: "default",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-inter text-xl font-bold text-neutral-800 flex items-center">
          <i className="ri-gamepad-line text-primary mr-2"></i>
          {challenge.title}
        </h2>
        <div className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium">
          <i className="ri-award-line mr-1"></i> {challenge.points} bonus points
        </div>
      </div>
      
      {/* Scenario-based challenge */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium text-neutral-700 mb-2">{challenge.description}</h3>
          <p className="text-neutral-600 mb-6">{challenge.scenario}</p>
          
          {/* Challenge scenario visual */}
          {challenge.image && (
            <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6 max-w-xl mx-auto shadow-sm">
              <img 
                src={challenge.image} 
                alt={challenge.title} 
                className="w-full h-auto rounded-lg" 
              />
            </div>
          )}
          
          {/* Risk identification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenge.items.map(item => (
              <div
                key={item.id}
                className={`flex items-start p-3 bg-white rounded-lg border-2 
                  ${isSubmitted
                    ? item.isCorrect
                      ? "border-success/50 bg-success/5"
                      : selectedItems.includes(item.id)
                        ? "border-destructive/50 bg-destructive/5"
                        : "border-neutral-200"
                    : selectedItems.includes(item.id)
                      ? "border-primary bg-primary/5"
                      : "border-neutral-200 hover:border-primary"
                  } 
                  transition-colors cursor-pointer`}
                onClick={() => handleItemToggle(item.id)}
              >
                <Checkbox
                  id={item.id}
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleItemToggle(item.id)}
                  disabled={isSubmitted}
                  className="mt-1 mr-3"
                />
                <div>
                  <Label htmlFor={item.id} className="font-medium cursor-pointer">
                    {item.text}
                  </Label>
                  <p className="text-sm text-neutral-500 mt-1">{item.description}</p>
                  
                  {isSubmitted && item.isCorrect && !selectedItems.includes(item.id) && (
                    <p className="text-sm text-success mt-1">This was a correct answer</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {isSubmitted && (
            <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-medium mb-2">Challenge Results</h4>
              <p>You scored {score} out of {challenge.points} possible points.</p>
              {score < challenge.points && (
                <p className="text-sm text-neutral-500 mt-1">
                  For a perfect score, you need to identify all the risks correctly without selecting non-risks.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        {!isSubmitted ? (
          <Button 
            className="bg-accent hover:bg-accent/90"
            onClick={handleSubmit}
            disabled={selectedItems.length === 0}
          >
            Check My Answers
          </Button>
        ) : (
          <Button onClick={onComplete}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default InteractiveChallenge;
