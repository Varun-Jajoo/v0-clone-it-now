
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic access to UI generation",
      features: [
        "10 generations per day",
        "Access to basic components",
        "Standard response time",
        "Community support"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Perfect for individual developers",
      features: [
        "100 generations per day",
        "Access to all components and templates",
        "Priority response time",
        "Export to multiple formats",
        "Email support"
      ],
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Team",
      price: "$49",
      period: "/month",
      description: "For teams working on multiple projects",
      features: [
        "Unlimited generations",
        "Access to all components and templates",
        "Fastest response time",
        "Team collaboration features",
        "Priority support",
        "API access"
      ],
      cta: "Contact Us",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for you, from individual creators to large teams
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg border ${plan.highlighted ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/10'} p-6 flex flex-col h-full relative overflow-hidden`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-semibold transform translate-x-8 -translate-y-2 rotate-45 bg-primary px-8 py-1 text-primary-foreground">
                    Popular
                  </div>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 my-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary/90' : 'bg-secondary hover:bg-secondary/90'}`}
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
