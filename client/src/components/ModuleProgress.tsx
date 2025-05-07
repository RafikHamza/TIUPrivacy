import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Link } from "wouter";
import { CheckIcon } from "lucide-react";
import { Module, ModuleId } from "@/lib/types";
import { allModules } from "@/data/modules";

const ModuleProgress = () => {
  const { progress } = useContext(AppContext);
  const modules = allModules.sort((a, b) => a.order - b.order);
  
  const completedModulesCount = Object.values(progress.modules).filter(m => m.completed).length;
  const totalModulesCount = modules.length;

  const getModuleStatus = (moduleId: ModuleId) => {
    const moduleProgress = progress.modules[moduleId];
    if (!moduleProgress) return "locked";
    if (moduleProgress.completed) return "completed";
    
    // Check if previous module is completed or if this is the first module
    const moduleIndex = modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === 0) return "available";
    
    const prevModuleId = modules[moduleIndex - 1].id;
    return progress.modules[prevModuleId]?.completed ? "available" : "locked";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-inter font-bold text-neutral-800 text-lg">Your Learning Journey</h2>
        <span className="text-sm text-neutral-500 font-medium">
          <span>{completedModulesCount}</span>/<span>{totalModulesCount}</span> modules completed
        </span>
      </div>
      
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {modules.map((module, index) => {
          const status = getModuleStatus(module.id);
          const isLast = index === modules.length - 1;
          
          return (
            <div key={module.id} className="flex flex-col items-center">
              <div className="flex items-center">
                <Link href={status !== "locked" ? `/module/${module.id}` : "#"}>
                  <a className={`rounded-full w-12 h-12 flex items-center justify-center ${
                    status === "completed" ? "bg-primary text-white" : 
                    status === "available" ? "bg-primary/50 text-white" : 
                    "bg-white border-2 border-neutral-200 text-neutral-400"
                  } relative`}>
                    <i className={`ri-${module.icon} text-xl`}></i>
                    {status === "completed" && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <CheckIcon className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </a>
                </Link>
                {!isLast && (
                  <div className={`h-1 w-12 ${
                    status === "completed" ? "bg-primary" : "bg-neutral-200"
                  }`}></div>
                )}
              </div>
              <span className="text-xs font-medium mt-1 text-center whitespace-nowrap">
                {module.title.split(' ').map((word, i) => (
                  <span key={i}>
                    {word}<br />
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleProgress;
