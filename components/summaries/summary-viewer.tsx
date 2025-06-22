"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import { NavigationControls } from "./navigation-controls";
import { CheckCircle2 } from "lucide-react";
import ProgressBar from "./progress-bar";

type Section = {
  title: string;
  points: string[];
};

const parseSection = (section: string): Section => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: string[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("Choose")
    ),
  };
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const sections: Section[] = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionSelect = (index: number) => {
    setCurrentSection(Math.max(0, Math.min(index, sections.length - 1)));
  };

  if (sections.length === 0) return <p>No summary available.</p>;

  const { title, points } = sections[currentSection];

  return (
    <Card className="relative px-6 py-10 sm:py-14 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-white border border-neutral-200 shadow-sm rounded-2xl">
      <ProgressBar sections={sections} currentSection={currentSection} />
      <div className="h-full overflow-y-auto scrollbar-hide">
        <h2 className="text-xl sm:text-2xl font-medium text-neutral-900 mb-6 text-center">
          {title}
        </h2>

        <ul className="space-y-4 px-2 sm:px-4">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="text-indigo-500 mt-0.5 w-4 h-4" />
              <span className="text-neutral-800 text-sm sm:text-base leading-relaxed">
                {point.replace(/^•\s*/, "")}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 sm:px-8">
        <NavigationControls
          currentSection={currentSection}
          totalSections={sections.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSectionSelect={handleSectionSelect}
        />
      </div>
    </Card>
  );
}
