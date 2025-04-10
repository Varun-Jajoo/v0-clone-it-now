
import React from 'react';
import { Code, Zap, Layout, PenTool, Clock, FileCode } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Generation",
      description: "Generate UI components and full pages in seconds from simple text descriptions",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Production-Ready Code",
      description: "Get clean, responsive code that's ready to use in your projects",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Responsive By Default",
      description: "All generated components work perfectly across all device sizes",
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Design Consistency",
      description: "Maintain consistent design language across all your generated components",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Rapid Iterations",
      description: "Quickly iterate on your designs with quick regeneration and adjustments",
    },
    {
      icon: <FileCode className="h-6 w-6" />,
      title: "Code Customization",
      description: "Easily customize the generated code to fit your exact requirements",
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful features to accelerate your workflow
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            v0 streamlines the UI creation process, allowing you to focus on what matters most
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-white/10 bg-secondary hover:bg-secondary/80 hover:border-primary/20 transition-all">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
