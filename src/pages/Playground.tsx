
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Send } from "lucide-react";
import { sendPromptToBackend } from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const Playground = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const result = await sendPromptToBackend(prompt);
      setResponse(result.response);
      toast({
        title: "Response received",
        description: "Successfully generated UI from your description",
      });
    } catch (error) {
      console.error('Failed to get response:', error);
      toast({
        title: "Error",
        description: "Failed to communicate with the backend server",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left side - Prompt and Response */}
        <div className="w-full md:w-1/2 h-full flex flex-col border-r border-white/10">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold mb-4">Generate UI from text</h2>
            <div className="relative">
              <Textarea 
                placeholder="Describe the UI you want to create..."
                className="min-h-[120px] bg-secondary resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button 
                className="absolute right-2 bottom-2"
                size="sm"
                disabled={isGenerating || !prompt.trim()}
                onClick={handleGenerate}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" /> Generate
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {response ? (
              <Card className="p-4 bg-muted">
                <p className="text-sm">{response}</p>
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Generate UI to see the response here</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Editor Preview */}
        <div className="w-full md:w-1/2 h-full bg-black/30">
          {response ? (
            <div className="h-full flex flex-col">
              <div className="border-b border-white/10 p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Preview</span>
                  <span className="bg-secondary text-xs px-2 py-1 rounded">Code</span>
                </div>
                <div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <div className="bg-muted rounded-lg h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">UI Preview</p>
                    <p className="text-muted-foreground text-sm">Your generated UI would appear here</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-6">
              <div>
                <p className="text-xl font-semibold mb-3">Ready to create?</p>
                <p className="text-muted-foreground mb-6 max-w-md">Enter a detailed description of what you want to build, and watch as AI generates your UI in seconds.</p>
                <Button variant="outline" className="animate-shimmer" onClick={() => document.querySelector('textarea')?.focus()}>
                  Start creating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;
