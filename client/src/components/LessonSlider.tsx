import { useState, useContext, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slide, ModuleId } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { updateModuleProgress } from "@/lib/storage";

interface LessonSliderProps {
  slides: Slide[];
  moduleId: ModuleId;
  onComplete: () => void;
}

const LessonSlider = ({ slides, moduleId, onComplete }: LessonSliderProps) => {
  const { progress, setProgress } = useContext(AppContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Mark slide as viewed when it's displayed
  useEffect(() => {
    if (slides.length === 0) return;
    
    const currentSlide = slides[currentSlideIndex];
    const updatedProgress = updateModuleProgress(moduleId, (moduleProgress) => {
      return {
        ...moduleProgress,
        slides: {
          ...moduleProgress.slides,
          [currentSlide.id]: true
        },
        lastVisited: new Date().toISOString()
      };
    });
    
    setProgress(updatedProgress);
  }, [currentSlideIndex, moduleId, slides, setProgress]);

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      onComplete();
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  if (!slides.length) return null;

  return (
    <div className="mb-8 relative">
      <div className="overflow-hidden rounded-xl">
        <div 
          className="slide-container flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide w-full flex-shrink-0">
              <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-8 text-center">
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slide Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-1">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlideIndex ? "bg-primary" : "bg-neutral-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={goToPreviousSlide}
            disabled={currentSlideIndex === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          
          <Button onClick={goToNextSlide}>
            {currentSlideIndex < slides.length - 1 ? (
              <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
            ) : (
              "Complete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonSlider;
