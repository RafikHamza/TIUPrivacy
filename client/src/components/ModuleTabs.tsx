import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Module, ModuleId } from "@/lib/types";
import { allModules } from "@/data/modules";
import { useUtils } from "@/hooks/use-utils";

interface ModuleTabsProps {
  activeModuleId: ModuleId;
}

const ModuleTabs = ({ activeModuleId }: ModuleTabsProps) => {
  const [, setLocation] = useLocation();
  const [availableModules, setAvailableModules] = useState<Module[]>([]);

  useEffect(() => {
    // Get all modules that should be shown in tabs
    // We'll only show 3 modules at a time based on the active module
    const allSortedModules = [...allModules].sort((a, b) => a.order - b.order);
    const activeIndex = allSortedModules.findIndex(m => m.id === activeModuleId);
    
    let startIndex = Math.max(0, activeIndex - 1);
    if (activeIndex === allSortedModules.length - 1 && allSortedModules.length > 3) {
      startIndex = allSortedModules.length - 3;
    }
    
    const modulesToShow = allSortedModules.slice(startIndex, startIndex + 3);
    setAvailableModules(modulesToShow);
  }, [activeModuleId]);

  const { createPath } = useUtils();
  
  const handleTabClick = (moduleId: ModuleId) => {
    setLocation(createPath(`/module/${moduleId}`));
  };

  return (
    <div className="bg-white rounded-t-xl shadow-sm">
      <div className="border-b border-neutral-200">
        <nav className="flex -mb-px overflow-x-auto" aria-label="Modules">
          {availableModules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleTabClick(module.id)}
              className={`${
                activeModuleId === module.id
                  ? "text-primary border-primary"
                  : "text-neutral-500 hover:text-neutral-700 border-transparent hover:border-neutral-300"
              } font-medium border-b-2 py-4 px-6 text-sm flex items-center whitespace-nowrap`}
            >
              <i className={`ri-${module.icon} mr-2`}></i>
              {module.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ModuleTabs;
