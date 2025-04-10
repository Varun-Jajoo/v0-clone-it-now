
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, SparkleIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Spotlight effect */}
      <div className="pointer-events-none absolute inset-0 h-full bg-gradient-to-b from-transparent to-transparent via-purple-500/5" />
      <div 
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 animate-spotlight opacity-0"
        style={{ 
          background: "radial-gradient(600px circle at center, rgba(139, 92, 246, 0.15), transparent 40%)"
        }} 
      />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gradient glow">
              Generate UI from text in seconds
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mx-auto">
              Create beautiful UI components, websites, and applications with AI in seconds. Just describe what you want.
            </p>
          </div>
          
          <div className="w-full max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <SparkleIcon className="absolute left-3 h-5 w-5 text-muted-foreground" />
              <Input
                className="pl-10 pr-24 py-6 bg-secondary border-white/10 text-white rounded-full"
                placeholder="Describe your design..."
              />
              <Button className="absolute right-1 rounded-full" size="sm">
                Generate <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded-full">Landing page</span>
            <span className="px-2 py-1 bg-muted rounded-full">Dashboard</span>
            <span className="px-2 py-1 bg-muted rounded-full">Contact form</span>
            <span className="px-2 py-1 bg-muted rounded-full">Product card</span>
            <span className="px-2 py-1 bg-muted rounded-full">Hero section</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
