import CTASection from "@/components/home/CTASection";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/Herosection";
import HowItWorksSection from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    //className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    <div>
      <HeroSection />
      <DemoSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
