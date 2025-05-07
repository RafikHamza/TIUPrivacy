import { useContext } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { Badge, ModuleId } from "@/lib/types";
import { allBadges } from "@/data/badges";
import { ChevronRight } from "lucide-react";
import { allModules } from "@/data/modules";

interface ModuleCompletionProps {
  moduleId: ModuleId;
  score: number;
}

const ModuleCompletion = ({ moduleId, score }: ModuleCompletionProps) => {
  const { progress } = useContext(AppContext);
  const [, setLocation] = useLocation();
  
  // Get next module
  const modules = [...allModules].sort((a, b) => a.order - b.order);
  const currentModuleIndex = modules.findIndex(m => m.id === moduleId);
  const nextModule = modules[currentModuleIndex + 1];
  
  // Get all badges
  const badges = allBadges;
  
  // Determine which badges are unlocked
  const badgeStatus = badges.map(badge => {
    const isUnlocked = progress.badges.includes(badge.id);
    const isCurrent = badge.moduleId === moduleId;
    const isInProgress = isCurrent && !isUnlocked;
    
    return {
      ...badge,
      isUnlocked,
      isInProgress,
      percentage: isCurrent ? (score / 100) * 100 : isUnlocked ? 100 : 0
    };
  });

  const handleContinue = () => {
    if (nextModule) {
      setLocation(`/module/${nextModule.id}`);
    } else {
      setLocation('/challenge');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <h2 className="font-inter text-xl font-bold text-neutral-800 mb-2">You're Making Great Progress!</h2>
      <p className="text-neutral-600 max-w-lg mx-auto mb-8">
        Continue learning to earn badges and complete all modules.
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
        {badgeStatus.map((badge) => (
          <div
            key={badge.id}
            className={`badge ${
              badge.isUnlocked
                ? "bg-gradient-to-b from-primary/5 to-primary/10 border border-primary/20"
                : "bg-gradient-to-b from-neutral-50 to-neutral-100 border border-neutral-200"
            } rounded-xl p-4 flex flex-col items-center justify-center aspect-square relative`}
          >
            {!badge.isUnlocked && (
              <div className="absolute top-2 right-2">
                <i className="ri-lock-line text-neutral-400"></i>
              </div>
            )}
            <div className={`w-16 h-16 ${
              badge.isUnlocked
                ? "bg-primary/20"
                : "bg-neutral-200"
            } rounded-full flex items-center justify-center mb-3`}>
              <i className={`ri-${badge.icon} ${
                badge.isUnlocked ? "text-primary" : "text-neutral-400"
              } text-2xl`}></i>
            </div>
            <span className={`font-medium ${
              badge.isUnlocked ? "text-primary" : "text-neutral-400"
            }`}>
              {badge.title}
            </span>
            <span className="text-xs text-neutral-500 mt-1">
              {badge.isUnlocked
                ? "Completed"
                : badge.isInProgress
                  ? "In progress"
                  : "Complete module"}
            </span>
            
            {badge.isInProgress && badge.percentage > 0 && (
              <div className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {Math.round(badge.percentage)}%
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button onClick={handleContinue} className="px-6 py-3 shadow-sm">
          Continue to Next Section <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ModuleCompletion;
