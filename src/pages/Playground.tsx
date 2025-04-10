import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { marked } from "marked";
import { Send, Github, FileCode, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
  type: "text" | "plan" | "html";
};

const Playground = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [editableSection, setEditableSection] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buildContext = () => {
    return messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;

    const newMessage: Message = {
      role: "user",
      content: input,
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    await handleGeneratePlan(input);
  };

  const handleGeneratePlan = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          context: buildContext(),
        }),
      });

      const data = await response.json();
      if (data.plan) {
        const planMessage: Message = {
          role: "assistant",
          content: data.plan,
          type: "plan",
        };
        setMessages((prev) => [...prev, planMessage]);
      } else {
        throw new Error(data.error || "Failed to generate plan");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate plan",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprovePlan = async (planContent: string) => {
    const approvalMessage: Message = {
      role: "user",
      content: `APPROVED PLAN: ${planContent}`,
      type: "text",
    };

    setMessages((prev) => [...prev, approvalMessage]);
    await handleGenerateWebsite(planContent);
  };

  const handleGenerateWebsite = async (plan: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          context: buildContext(),
        }),
      });

      const data = await response.json();
      if (data.html) {
        const htmlWithClasses = data.html.replace(/className=/g, "class=");
        const fullHTML = `
          <!DOCTYPE html>
          <html>
            <head>
              <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="bg-white">${htmlWithClasses}</body>
          </html>
        `;

        const htmlMessage: Message = {
          role: "assistant",
          content: fullHTML,
          type: "html",
        };

        setMessages((prev) => [...prev, htmlMessage]);
        setGeneratedHTML(fullHTML);
        setEditableSection(extractEditableSection(fullHTML));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate website",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const extractEditableSection = (html: string) => {
    const match = html.match(
      /<!-- Editable Section Start -->([\s\S]*?)<!-- Editable Section End -->/
    );
    return match ? match[1] : "";
  };

  const handleEditSave = () => {
    const updatedHtml = generatedHTML.replace(
      /<!-- Editable Section Start -->([\s\S]*?)<!-- Editable Section End -->/,
      `<!-- Editable Section Start -->${editableSection}<!-- Editable Section End -->`
    );
    setGeneratedHTML(updatedHtml);
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "plan":
        return (
          <div className="prose prose-invert">
            <div
              dangerouslySetInnerHTML={{ __html: marked(message.content) }}
            />
            <Button
              size="sm"
              className="mt-4"
              onClick={() => handleApprovePlan(message.content)}
            >
              Approve Plan
            </Button>
          </div>
        );
      case "html":
        return (
          <div className="space-y-4">
            <div className="text-sm text-green-400">
              Website generated successfully!
            </div>
            <div className="border-t pt-4">
              <Textarea
                value={editableSection}
                onChange={(e) => setEditableSection(e.target.value)}
                className="min-h-[200px] bg-muted"
              />
              <Button onClick={handleEditSave} className="mt-2">
                Save Edits
              </Button>
            </div>
          </div>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 flex">
        {/* Chat Section */}
        <div className="w-1/3 border-r flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`p-4 max-w-full ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {renderMessageContent(message)}
                </Card>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your website..."
                className="flex-1 resize-none"
                disabled={isGenerating}
              />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Website Preview */}
        <div className="w-2/3 bg-white">
          {generatedHTML ? (
            <iframe
              srcDoc={generatedHTML}
              className="w-full h-full border-none"
              title="website-preview"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Website preview will appear here
            </div>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-t p-4 flex gap-2">
        <Button variant="outline" onClick={() => {}}>
          <Globe className="mr-2 h-4 w-4" />
          Publish
        </Button>
        <Button variant="outline" onClick={() => {}}>
          <Github className="mr-2 h-4 w-4" />
          Create Repo
        </Button>
        <Button variant="outline" onClick={() => {}}>
          <FileCode className="mr-2 h-4 w-4" />
          View Files
        </Button>
      </div>
    </div>
  );
};

export default Playground;
