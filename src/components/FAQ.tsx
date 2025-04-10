
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is v0?",
      answer: "v0 is an AI-powered tool that generates UI components, screens, and entire web applications from simple text descriptions. It produces clean, responsive code that you can use immediately in your projects."
    },
    {
      question: "How accurate are the generated components?",
      answer: "v0 produces high-quality components that closely match your text descriptions. While no AI is perfect, our models are trained on best practices in UI design and development, ensuring that outputs are useful and production-ready."
    },
    {
      question: "What technologies does v0 use for generation?",
      answer: "v0 currently generates components using React and Tailwind CSS, producing modern, responsive interfaces. We're constantly expanding our supported frameworks and libraries based on community feedback."
    },
    {
      question: "Can I customize the generated code?",
      answer: "Absolutely! All generated code is fully customizable. You can edit the code directly, combine components, or use it as a starting point for your own implementations. The code follows best practices and is designed to be maintainable."
    },
    {
      question: "Is there a limit to how many components I can generate?",
      answer: "The number of generations depends on your subscription plan. Free plans have limited generations per day, while paid plans offer higher or unlimited generations to suit different needs."
    },
    {
      question: "How is v0 different from other AI code generators?",
      answer: "v0 specializes in UI generation with a focus on visual quality and code cleanliness. Our models are specifically trained on UI patterns and best practices, producing more accurate and usable results than general-purpose code generators."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container px-4 md:px-6 max-w-4xl">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about v0
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-left text-lg hover:no-underline hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
