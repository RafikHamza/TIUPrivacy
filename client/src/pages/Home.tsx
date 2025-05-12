import { useContext, useEffect, useState } from "react";
import { Link } from "wouter";
import { AppContext } from "@/context/AppContext";
import { useUtils } from "@/hooks/use-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModuleProgress from "@/components/ModuleProgress";
import { allModules } from "@/data/modules";
import { loadProgressSync } from "@/lib/storage";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

const Home = () => {
  const { progress } = useContext(AppContext);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);
  const { createPath } = useUtils();
  const sortedModules = [...allModules].sort((a, b) => a.order - b.order);
  
  // Get next available module or return the first one if none are completed
  const getNextModule = () => {
    // Use the progress from context which is already loaded
    for (const module of sortedModules) {
      if (!progress.modules[module.id]?.completed) {
        return module;
      }
    }
    return sortedModules[0]; // Default to first module if all completed
  };
  
  // Calculate completed modules count
  useEffect(() => {
    // Use synchronous version for immediate UI rendering
    const currentProgress = loadProgressSync();
    const completedCount = Object.values(currentProgress.modules)
      .filter(module => module.completed).length;
    setCompletedModulesCount(completedCount);
  }, [progress]); // Recalculate when progress changes
  
  const nextModule = getNextModule();
  
  // Get completion percentage
  const completionPercentage = (completedModulesCount / sortedModules.length) * 100;
  
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-8 sm:p-12">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-neutral-600 mb-2 block">Introduction to Digital Privacy and Data Security (SPRING)</span>
            <h1 className="text-4xl font-bold text-neutral-800 mb-4">
              Learn to Protect Yourself Online
            </h1>
            <p className="text-lg text-neutral-700 mb-4">
              An interactive course on recognizing phishing attacks, safely using social media, 
              and understanding the risks of AI-powered chatbots.
            </p>
            <div className="bg-white/80 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2 mb-3">
                <i className="ri-user-line mt-1 text-primary"></i>
                <div>
                  <span className="font-medium">Instructor:</span> Prof. HAMZA Rafik
                </div>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <i className="ri-book-open-line mt-1 text-primary"></i>
                <div>
                  <span className="font-medium">Course Description:</span> This course focuses on three key areas: (1) cybersecurity basics, (2) digital privacy, and (3) data security. It provides an overview of cybersecurity, highlights the fundamentals of protecting personal information, and explores the challenges of digital business applications.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <i className="ri-target-line mt-1 text-primary"></i>
                <div>
                  <span className="font-medium">Objectives:</span> To understand the concepts of data privacy, digital footprints, and online security. To apply basic methods for securing personal information online, including encryption, authentication, and safe browsing practices.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href={`/module/${nextModule.id}`}>
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {completedModulesCount > 0 && (
                <Button variant="outline" size="lg" asChild>
                  <Link href="/challenge">
                    Final Challenge <ShieldCheck className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Progress Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <ModuleProgress />
        
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-6">
          <div>
            <h3 className="font-bold text-lg mb-1">Overall Completion</h3>
            <p className="text-neutral-600">{completionPercentage}% complete</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-lg">{progress.points}</p>
              <p className="text-sm text-neutral-500">Points earned</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-lg">{progress.badges.length}</p>
              <p className="text-sm text-neutral-500">Badges earned</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Modules Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Learning Modules</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedModules.map((module) => {
            const isCompleted = progress.modules[module.id]?.completed || false;
            return (
              <Card key={module.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`${isCompleted ? 'bg-success/10' : 'bg-primary/5'} p-6`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-full ${isCompleted ? 'bg-success/20' : 'bg-primary/20'} flex items-center justify-center`}>
                        <i className={`ri-${module.icon} text-xl ${isCompleted ? 'text-success' : 'text-primary'}`}></i>
                      </div>
                      {isCompleted && (
                        <span className="flex items-center text-success text-sm font-medium">
                          <CheckCircle className="h-4 w-4 mr-1" /> Completed
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-1">{module.title}</h3>
                    <p className="text-neutral-600 mb-3">{module.subtitle}</p>
                    <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                      <span><i className="ri-time-line mr-1"></i> {module.duration}</span>
                      <span><i className="ri-award-line mr-1"></i> {module.pointsAvailable} points</span>
                    </div>
                    <Button className="w-full" variant={isCompleted ? "outline" : "default"} asChild>
                      <Link href={`/module/${module.id}`}>
                        {isCompleted ? 'Review Module' : 'Start Module'}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Final Challenge Card */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Final Challenge</h2>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
                  <i className="ri-trophy-line text-accent text-4xl"></i>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">Comprehensive Security Challenge</h3>
                <p className="text-neutral-600 mb-4">
                  Test your knowledge across all security topics and earn the Cyber Champion badge
                  by identifying threats in complex scenarios.
                </p>
                <Button 
                  className="w-full md:w-auto" 
                  variant="default"
                  disabled={completedModulesCount < 1}
                  asChild
                >
                  <Link href="/challenge">
                    Start Final Challenge
                  </Link>
                </Button>
                {completedModulesCount < 1 && (
                  <p className="text-sm text-neutral-500 mt-2">
                    Complete at least one module to unlock the final challenge
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tips Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Security Tips</h2>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <i className="ri-lock-password-line text-primary text-xl"></i>
            </div>
            <h3 className="font-bold mb-2">Use Strong Passwords</h3>
            <p className="text-sm text-neutral-600">Create unique passwords with a mix of characters, numbers, and symbols.</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <i className="ri-shield-check-line text-primary text-xl"></i>
            </div>
            <h3 className="font-bold mb-2">Enable 2FA</h3>
            <p className="text-sm text-neutral-600">Two-factor authentication adds an extra layer of security to your accounts.</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <i className="ri-links-line text-primary text-xl"></i>
            </div>
            <h3 className="font-bold mb-2">Check URLs</h3>
            <p className="text-sm text-neutral-600">Always verify website addresses before entering login credentials.</p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <i className="ri-update-line text-primary text-xl"></i>
            </div>
            <h3 className="font-bold mb-2">Keep Software Updated</h3>
            <p className="text-sm text-neutral-600">Regular updates help protect against known security vulnerabilities.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
