import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LazyMotion, motion } from "motion/react";
export default function HeroSection() {
  return (
    <section className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-950">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        {/* Badge */}
        <div className="flex justify-center">
          <Badge
            className="flex items-center gap-1.5 rounded-full shadow-sm
               bg-indigo-100 text-indigo-700
               px-3 py-1.5 text-xs sm:text-sm md:text-base
               sm:px-4 sm:py-1.5 gradient-x"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-indigo-500 animate-pulse" />
            <span className="font-medium">Powered by AI</span>
          </Badge>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-center leading-tight">
          Chat with your PDFs,
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">instantly</span>
            <svg
              viewBox="0 0 130 30"
              className="absolute -bottom-1 left-0 w-full h-[0.6em] z-0"
              preserveAspectRatio="none"
            >
              <path
                d="M5,20 Q30,10 60,20 Q90,30 125,15"
                stroke="#a5b4fc"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.5 }}
              />
            </svg>
          </span>
        </h1>
        <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
          Get a simple summary of your documents in seconds
        </h2>

        {/* CTA Button */}
        <div>
          <Button size="lg" className="px-6 py-3 text-base sm:text-lg">
            Try Now
            <ArrowRight className="animate-pulse" />
          </Button>
        </div>
      </div>
    </section>
  );
}
