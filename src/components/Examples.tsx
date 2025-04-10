
import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Examples = () => {
  // Mock examples data
  const examples = [
    {
      id: 1,
      title: "Dashboard with Analytics",
      prompt: "A modern dashboard with analytics graphs and user stats",
      image: "https://placehold.co/600x400/292d3e/d6bcfa?text=Dashboard+Preview",
    },
    {
      id: 2,
      title: "E-commerce Product Page",
      prompt: "Product page with image gallery, reviews, and add to cart",
      image: "https://placehold.co/600x400/292d3e/d6bcfa?text=Product+Page",
    },
    {
      id: 3,
      title: "Landing Page",
      prompt: "A SaaS landing page with features and pricing",
      image: "https://placehold.co/600x400/292d3e/d6bcfa?text=Landing+Page",
    },
    {
      id: 4,
      title: "Mobile App UI",
      prompt: "A food delivery app interface with order tracking",
      image: "https://placehold.co/600x400/292d3e/d6bcfa?text=Mobile+UI",
    }
  ];

  return (
    <section id="examples" className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            From text to UI in seconds
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Describe what you want and v0 will generate high-quality, production-ready code in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {examples.map((example) => (
            <Card key={example.id} className="overflow-hidden bg-secondary border-white/10 hover:border-primary/50 transition-all duration-300">
              <div className="p-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                    prompt
                  </span>
                  <p className="mt-2">"{example.prompt}"</p>
                </div>
                <h3 className="text-lg font-semibold">{example.title}</h3>
              </div>
              <div className="relative aspect-video w-full overflow-hidden border-t border-white/10">
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary" className="gap-2">
                    View Example <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" className="gap-2">
            Browse all examples <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Examples;
