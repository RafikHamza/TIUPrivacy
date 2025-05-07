import { useState, useContext, useEffect } from "react";
import { useLocation } from "wouter";
import { AppContext } from "@/context/AppContext";
import ModuleProgress from "@/components/ModuleProgress";
import InteractiveChallenge from "@/components/InteractiveChallenge";
import { finalChallengeModule } from "@/data/finalChallenge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Award, ArrowRight, Home } from "lucide-react";
import { getCompletedModulesCount } from "@/lib/storage";
import { ProgressCircle } from "@/components/ui/progress-circle";

const FinalChallenge = () => {
  const { progress } = useContext(AppContext);
  const [, setLocation] = useLocation();
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasBadge, setHasBadge] = useState(false);
  const completedModules = getCompletedModulesCount();
  
  useEffect(() => {
    // Check if user has the Cyber Champion badge
    const hasCyberChampionBadge = progress.badges.includes("cyber-champion");
    setHasBadge(hasCyberChampionBadge);
    setIsCompleted(hasCyberChampionBadge);
    
    // Redirect if no modules completed
    if (completedModules < 1) {
      setLocation("/");
    }
  }, [progress, setLocation, completedModules]);
  
  const handleChallengeComplete = () => {
    setIsCompleted(true);
  };
  
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Progress */}
      <ModuleProgress />
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
              <Trophy className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="font-inter text-2xl font-bold text-neutral-800">Final Security Challenge</h1>
              <p className="text-neutral-500">Test your knowledge across all cybersecurity topics</p>
            </div>
          </div>
          
          <span className="hidden sm:flex bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium">
            <Award className="inline mr-1 h-4 w-4" /> 100 points
          </span>
        </div>
        
        {!isCompleted ? (
          <>
            <div className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <i className="ri-question-line text-primary"></i>
                    </div>
                    <h2 className="font-bold text-lg">Challenge Instructions</h2>
                  </div>
                  
                  <p className="mb-4">
                    This challenge tests your ability to identify security threats across different contexts.
                    You'll need to recognize phishing attempts, unsafe social media practices, and AI chatbot risks.
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                      <span>Identify all potential security risks in the scenarios</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                      <span>Correctly identify at least 70% of the risks to earn the Cyber Champion badge</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-line text-primary mr-2 mt-1"></i>
                      <span>Be careful not to select items that aren't actually security risks</span>
                    </li>
                  </ul>
                  
                  <div className="text-sm text-neutral-500">
                    <strong>Tip:</strong> Apply everything you've learned from previous modules
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {finalChallengeModule.challenges.length > 0 && (
              <InteractiveChallenge 
                challenge={finalChallengeModule.challenges[0]} 
                moduleId={finalChallengeModule.id}
                badgeId="cyber-champion"
                onComplete={handleChallengeComplete}
              />
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-12 w-12 text-accent" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Challenge Completed!</h2>
            <p className="text-neutral-600 max-w-md mx-auto mb-8">
              Congratulations! You've successfully completed the comprehensive security challenge 
              and earned the Cyber Champion badge.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium mb-2">Modules Completed</h3>
                  <ProgressCircle 
                    value={(completedModules / 5) * 100} 
                    size={80} 
                    className="mx-auto mb-2"
                  >
                    <span className="text-lg font-bold">{completedModules}/5</span>
                  </ProgressCircle>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium mb-2">Points Earned</h3>
                  <div className="h-20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{progress.points}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium mb-2">Badges Earned</h3>
                  <div className="h-20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-accent">{progress.badges.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="flex items-center"
                onClick={() => setLocation("/")}
              >
                <Home className="mr-2 h-4 w-4" /> Return Home
              </Button>
              
              {completedModules < 5 && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center"
                  onClick={() => {
                    // Find first uncompleted module
                    const uncompleted = finalChallengeModule.order - 1;
                    const nextModuleId = uncompleted >= 0 ? Object.keys(progress.modules)[uncompleted] : "phishing";
                    setLocation(`/module/${nextModuleId}`);
                  }}
                >
                  Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default FinalChallenge;
