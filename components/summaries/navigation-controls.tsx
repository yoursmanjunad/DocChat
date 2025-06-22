import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function NavigationControls({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs border-t border-indigo-500/10">
      <div className="flex justify-between items-center">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br from-indigo-500 to-indigo-600 backdrop-blur-xs border border-rose-indigo/10",
            currentSection === 0 ? "opacity-50" : "hover:bg-indigo-500/20"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Section Indicators */}
        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentSection
                  ? "bg-indigo-500 scale-110"
                  : "bg-indigo-300 hover:bg-indigo-400"
              )}
            />
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br from-indigo-500 to-indigo-600 backdrop-blur-xs border border-indigo-500/10",
            currentSection === totalSections - 1
              ? "opacity-50"
              : "hover:bg--500/20"
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
