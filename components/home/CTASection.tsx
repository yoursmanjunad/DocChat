import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ready to simplify your reading?
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Turn complex PDFs into easy-to-understand summaries in seconds. It's time to focus on what really matters.
        </p>
        <Button className="gap-2">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
