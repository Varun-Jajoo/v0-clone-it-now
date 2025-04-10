
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-background/80">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <div className="relative size-8 overflow-hidden rounded-full bg-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">v</span>
              </div>
            </div>
            <span className="text-xl font-semibold tracking-tight">v0</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </a>
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="outline" className="hidden md:flex">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Link to="/playground">Generate</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
