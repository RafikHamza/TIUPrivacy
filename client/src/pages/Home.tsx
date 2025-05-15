import { useContext, useEffect, useState } from "react";
import { Link } from "wouter";
import { AppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModuleProgress from "@/components/ModuleProgress";
import { allModules } from "@/data/modules";
import { loadProgressSync } from "@/lib/storage";
import { CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

const Home = () => {
  const { progress } = useContext(AppContext);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);
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
    <div className="container py-8">
      <div className="grid gap-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to CyberSafe Learning
          </h1>
          <p className="mt-4 max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Learn essential cybersecurity skills through interactive modules and challenges.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedModules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  {progress.modules[module.id]?.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {module.description}
                </p>
                <div className="mt-4">
                  <ModuleProgress moduleId={module.id} />
                </div>
                <Button asChild className="mt-4 w-full">
                  <Link href={`/module/${module.id}`}>
                    {progress.modules[module.id]?.completed ? "Review Module" : "Start Module"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/final-challenge">
              Take Final Challenge
              <ShieldCheck className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
