import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "wouter";
import { AppContext } from "@/context/AppContext";
import { Module, ModuleId } from "@/lib/types";
import ModuleProgress from "@/components/ModuleProgress";
import ModuleTabs from "@/components/ModuleTabs";
import LessonSlider from "@/components/LessonSlider";
import QuizSection from "@/components/QuizSection";
import InteractiveChallenge from "@/components/InteractiveChallenge";
import ModuleCompletion from "@/components/ModuleCompletion";
import { allModules } from "@/data/modules";
import { updateModuleProgress, initialProgress } from "@/lib/storage";
import { getBadgeById } from "@/data/badges";
import { Clock, Award } from "lucide-react";

const ModulePage = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { progress, setProgress } = useContext(AppContext);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [stage, setStage] = useState<"slides" | "quiz" | "challenge" | "completion">("slides");
  const [score, setScore] = useState(0);
  
  // Redirect if invalid module ID
  useEffect(() => {
    const module = allModules.find(m => m.id === id) || null;
    
    if (!module && id) {
      setLocation("/");
      return;
    }
    
    setCurrentModule(module);
    
    // Determine which stage to show based on progress
    if (module) {
      try {
        // Safely access progress with fallback to initial state
        const modulesData = progress?.modules || initialProgress.modules;
        const moduleProgress = modulesData[module.id as ModuleId];
        
        // If module is already completed, start from slides
        if (moduleProgress?.completed) {
          setStage("slides");
          return;
        }
        
        // Check how far the user has gotten
        const hasCompletedSlides = Object.keys(moduleProgress?.slides || {}).length === module.slides.length;
        const hasCompletedQuizzes = Object.keys(moduleProgress?.quizzes || {}).length === module.quizzes.length;
        
        if (!hasCompletedSlides) {
          setStage("slides");
        } else if (!hasCompletedQuizzes) {
          setStage("quiz");
        } else {
          setStage("challenge");
        }
      } catch (error) {
        console.error("Error determining module stage:", error);
        // Default to slides as the first stage
        setStage("slides");
      }
    }
  }, [id, progress, setLocation]);
  
  const handleSlidesComplete = () => {
    if (!currentModule) return;
    
    // Update progress to mark all slides as viewed
    const slides = currentModule.slides.reduce((acc, slide) => {
      acc[slide.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    // Fire and forget
    updateModuleProgress(currentModule.id as ModuleId, (moduleProgress) => {
      return {
        ...moduleProgress,
        slides,
        lastVisited: new Date().toISOString()
      };
    }).then(updatedProgress => {
      setProgress(updatedProgress);
    }).catch(error => {
      console.error("Error saving slides progress:", error);
    });
    
    // Move to next stage regardless of save outcome
    setStage("quiz");
  };
  
  const handleQuizComplete = () => {
    if (!currentModule) return;
    
    try {
      // Calculate quiz score contribution to total score
      const modulesData = progress?.modules || initialProgress.modules;
      const quizPoints = Object.values(modulesData[currentModule.id as ModuleId]?.quizzes || {})
        .reduce((sum, points) => sum + points, 0);
      setScore(quizPoints);
      
      setStage("challenge");
    } catch (error) {
      console.error("Error processing quiz completion:", error);
      setScore(0);
      setStage("challenge");
    }
  };
  
  const handleChallengeComplete = () => {
    if (!currentModule) return;
    
    // Mark module as completed - fire and forget
    updateModuleProgress(currentModule.id as ModuleId, (moduleProgress) => {
      return {
        ...moduleProgress,
        completed: true,
        lastVisited: new Date().toISOString()
      };
    }).then(updatedProgress => {
      setProgress(updatedProgress);
    }).catch(error => {
      console.error("Error saving challenge completion:", error);
    });
    
    // Move to completion stage regardless of save outcome
    setStage("completion");
  };
  
  if (!currentModule) {
    return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">Loading...</div>;
  }
  
  const badgeId = getBadgeById(currentModule.id)?.id;
  
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Course Progress */}
      <ModuleProgress />
      
      {/* Module Navigation Tabs */}
      <ModuleTabs activeModuleId={currentModule.id as ModuleId} />
      
      {/* Module Content Container */}
      <div className="bg-white p-6 rounded-b-xl shadow-sm mb-8">
        {/* Module Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-inter text-2xl font-bold text-neutral-800">{currentModule.title}</h1>
            <p className="text-neutral-500 mt-1">{currentModule.subtitle}</p>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
            <span className="bg-neutral-100 text-neutral-700 rounded-full px-3 py-1 text-sm font-medium">
              <Clock className="inline mr-1 h-4 w-4" /> {currentModule.duration}
            </span>
            <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm font-medium">
              <Award className="inline mr-1 h-4 w-4" /> {currentModule.pointsAvailable} points
            </span>
          </div>
        </div>

        {/* Content based on current stage */}
        {stage === "slides" && (
          <LessonSlider 
            slides={currentModule.slides} 
            moduleId={currentModule.id as ModuleId}
            onComplete={handleSlidesComplete}
          />
        )}
        
        {stage === "quiz" && currentModule.quizzes.length > 0 && (
          <QuizSection 
            quizzes={currentModule.quizzes} 
            moduleId={currentModule.id as ModuleId}
            onComplete={handleQuizComplete}
          />
        )}
        
        {stage === "challenge" && currentModule.challenges.length > 0 && (
          <InteractiveChallenge 
            challenge={currentModule.challenges[0]} 
            moduleId={currentModule.id as ModuleId}
            badgeId={badgeId}
            onComplete={handleChallengeComplete}
          />
        )}
        
        {stage === "completion" && (
          <ModuleCompletion 
            moduleId={currentModule.id as ModuleId}
            score={score}
          />
        )}
      </div>
    </main>
  );
};

export default ModulePage;
