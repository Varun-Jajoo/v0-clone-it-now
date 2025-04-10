
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative overflow-hidden pt-32 pb-24 px-4 md:px-6 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-sm font-medium bg-muted text-muted-foreground">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span> Now in public beta
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Generate <span className="text-gradient glow">UI</span> from text
          <br />in seconds
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Create beautiful UI components, websites, and applications with AI in seconds.
          <br className="hidden md:block" />
          Just describe what you want.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="gap-2 text-base h-12"
            onClick={() => navigate('/playground')}
          >
            Start generating
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="text-base h-12">
            View examples
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-[-15%] left-1/2 transform -translate-x-1/2 w-3/4 h-48 bg-primary/20 blur-3xl rounded-full"></div>
    </div>
  );
};

export default Hero;
