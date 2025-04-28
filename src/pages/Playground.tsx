"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ImageIcon,
  PenTool,
  Sparkle,
  Wrench,
  Send,
  Github,
  FileCode,
  Globe,
  Loader2,
  Palette,
  Layout,
  Type,
  MapPin,
  Plane,
  Hotel,
  Compass,
  BookOpen,
  Tag,
  Users,
  User,
  BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Message = {
  role: "user" | "assistant";
  content: string;
  type: "text" | "plan" | "html" | "generating" | "complete";
};

type ThemeColor = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
};

const themeColors: ThemeColor[] = [
  {
    name: "blue",
    primary: "bg-blue-500",
    secondary: "bg-blue-100",
    accent: "bg-blue-700",
    text: "text-blue-500",
  },
  {
    name: "teal",
    primary: "bg-teal-500",
    secondary: "bg-teal-100",
    accent: "bg-teal-700",
    text: "text-teal-500",
  },
  {
    name: "purple",
    primary: "bg-purple-500",
    secondary: "bg-purple-100",
    accent: "bg-purple-700",
    text: "text-purple-500",
  },
  {
    name: "rose",
    primary: "bg-rose-500",
    secondary: "bg-rose-100",
    accent: "bg-rose-700",
    text: "text-rose-500",
  },
  {
    name: "amber",
    primary: "bg-amber-500",
    secondary: "bg-amber-100",
    accent: "bg-amber-700",
    text: "text-amber-500",
  },
  {
    name: "emerald",
    primary: "bg-emerald-500",
    secondary: "bg-emerald-100",
    accent: "bg-emerald-700",
    text: "text-emerald-500",
  },
];

const fontOptions = ["font-sans", "font-serif", "font-mono"];

// Icons for travel website sections
const sectionIcons: Record<string, React.ReactNode> = {
  Homepage: <Globe className="h-5 w-5" />,
  Destinations: <MapPin className="h-5 w-5" />,
  Flights: <Plane className="h-5 w-5" />,
  Hotels: <Hotel className="h-5 w-5" />,
  "Tours & Activities": <Compass className="h-5 w-5" />,
  "Travel Guides & Blog": <BookOpen className="h-5 w-5" />,
  "Deals & Packages": <Tag className="h-5 w-5" />,
  "Community & Forums": <Users className="h-5 w-5" />,
  "My Account/Profile": <User className="h-5 w-5" />,
};

const Playground = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [editableSection, setEditableSection] = useState("");
  const [isPlanApproved, setIsPlanApproved] = useState(false);
  const [websitePlan, setWebsitePlan] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [componentContent, setComponentContent] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<ThemeColor>(
    themeColors[0]
  );
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [layoutType, setLayoutType] = useState("responsive");
  const [parsedSections, setParsedSections] = useState<
    { title: string; description: string; items: string[] }[]
  >([]);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [siteStats, setSiteStats] = useState<any>(null);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isGenerating && isPlanApproved) {
      const interval = setInterval(() => {
        setGenerationProgress((prev) => {
          const newProgress = prev + (100 - prev) * 0.1;
          return newProgress >= 99 ? 99 : newProgress;
        });
      }, 300);

      return () => clearInterval(interval);
    } else if (!isGenerating && isPlanApproved && generationProgress > 0) {
      setGenerationProgress(100);
    }
  }, [isGenerating, isPlanApproved, generationProgress]);

  useEffect(() => {
    if (websitePlan) {
      const sections: {
        title: string;
        description: string;
        items: string[];
      }[] = [];

      // Split by section headers (numbered sections)
      const sectionRegex = /\*\*(\d+)\.\s([^*]+)\*\*/g;
      const sectionMatches = [...websitePlan.matchAll(sectionRegex)];

      sectionMatches.forEach((match, index) => {
        const sectionTitle = match[2].trim();
        const startPos = match.index! + match[0].length;
        const endPos =
          index < sectionMatches.length - 1
            ? sectionMatches[index + 1].index!
            : websitePlan.length;

        const sectionContent = websitePlan.substring(startPos, endPos);

        // Extract description
        const descriptionMatch = sectionContent.match(
          /\*\s+\*\*Description:\*\*\s+([^*]+)/
        );
        const description = descriptionMatch ? descriptionMatch[1].trim() : "";

        // Extract bullet points, filtering out empty ones and the description line
        const bulletPoints: string[] = [];
        const bulletRegex = /\*\s+([^*]+)\*\*?/g;
        const bulletMatches = [...sectionContent.matchAll(bulletRegex)];

        for (const bullet of bulletMatches) {
          const bulletText = bullet[1].trim();
          // Skip if it's the description line
          if (bulletText.startsWith("**Description:**")) {
            continue;
          }

          // Clean up markdown and nested bullets
          const cleanBullet = bulletText
            .replace(/\*\*/g, "")
            .replace(/^\s*[-•]\s*/, "")
            .replace(/^[a-z]\)\s+/, "")
            .split("\n")[0] // Take only the first line of multi-line bullets
            .trim();

          // Only add non-empty, unique bullets
          if (cleanBullet && !bulletPoints.includes(cleanBullet)) {
            bulletPoints.push(cleanBullet);
          }
        }

        // Only add sections that have actual content
        if (sectionTitle && (description || bulletPoints.length > 0)) {
          sections.push({
            title: sectionTitle,
            description,
            items: bulletPoints,
          });
        }
      });

      setParsedSections(sections);
    }
  }, [websitePlan]);

  const handleComponentSelect = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== "BODY") {
      event.preventDefault();
      event.stopPropagation();
      const outerHTML = target.outerHTML;
      setSelectedComponent(outerHTML);
      setComponentContent(target.innerHTML);
      toast({
        title: "Component Selected",
        description: "You can now edit the selected component in the editor.",
      });
    }
  };

  const handleComponentEdit = () => {
    if (!selectedComponent || !generatedHTML) return;

    const newHTML = generatedHTML.replace(
      selectedComponent,
      selectedComponent.replace(/>|>[^<]*</, (match) =>
        match.startsWith("/>") ? "/>" : `>${componentContent}<`
      )
    );

    setGeneratedHTML(newHTML);
    setSelectedComponent(null);
    setComponentContent("");
    toast({
      title: "Component Updated",
      description: "Your changes have been applied to the preview.",
    });
  };

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

    // If we already have a website generated, modify it instead of creating a new one
    if (generatedHTML) {
      await handleModifyWebsite(input);
    } else {
      await handleGeneratePlan(input);
    }
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
          theme: selectedTheme.name,
          font: selectedFont,
          layout: layoutType,
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
        setWebsitePlan(data.plan);
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

  const handleApprovePlan = async () => {
    setIsPlanApproved(true);
    setGenerationProgress(0);

    // Add a generating message instead of the plan
    const generatingMessage: Message = {
      role: "assistant",
      content: "Generating your travel website...",
      type: "generating",
    };

    setMessages((prev) => {
      // Replace the plan message with the generating message
      const newMessages = [...prev];
      const planIndex = newMessages.findIndex((m) => m.type === "plan");
      if (planIndex !== -1) {
        newMessages[planIndex] = generatingMessage;
      }
      return newMessages;
    });

    await handleGenerateWebsite(websitePlan);
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
          theme: selectedTheme.name,
          font: selectedFont,
          layout: layoutType,
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
              <style>
                body { font-family: ${selectedFont.replace("font-", "")}; }
              </style>
            </head>
            <body class="bg-white">${htmlWithClasses}</body>
          </html>
        `;

        // Replace the generating message with a completion message
        const completeMessage: Message = {
          role: "assistant",
          content: "Website generation completed successfully!",
          type: "complete",
        };

        setMessages((prev) => {
          const newMessages = [...prev];
          const generatingIndex = newMessages.findIndex(
            (m) => m.type === "generating"
          );
          if (generatingIndex !== -1) {
            newMessages[generatingIndex] = completeMessage;
          } else {
            newMessages.push(completeMessage);
          }
          return newMessages;
        });

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

  const handleModifyWebsite = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/modify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: generatedHTML,
          prompt,
          requirements: {
            theme: selectedTheme.name,
            font: selectedFont,
            layout: layoutType,
          },
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
              <style>
                body { font-family: ${selectedFont.replace("font-", "")}; }
              </style>
            </head>
            <body class="bg-white">${htmlWithClasses}</body>
          </html>
        `;

        // Add a completion message
        const completeMessage: Message = {
          role: "assistant",
          content: "Website modifications completed successfully!",
          type: "complete",
        };

        setMessages((prev) => [...prev, completeMessage]);
        setGeneratedHTML(fullHTML);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to modify website",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishWebsite = async () => {
    if (!generatedHTML) {
      toast({
        title: "Error",
        description: "Please generate a website first before publishing",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: generatedHTML,
        }),
      });

      const data = await response.json();
      if (data.url) {
        setPublishedUrl(data.url);
        const siteId = data.url.split("/")[4]; // Extract site ID from URL
        toast({
          title: "Website Published!",
          description: (
            <div className="flex flex-col gap-2">
              <p>Your website is now live at:</p>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {data.url}
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchSiteStats(siteId)}
                className="mt-2"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Stats
              </Button>
            </div>
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish website",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const fetchSiteStats = async (siteId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/hosted/${siteId}/stats`
      );
      const data = await response.json();
      setSiteStats(data);
      setIsStatsModalOpen(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch website statistics",
        variant: "destructive",
      });
    }
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "generating":
        return (
          <div className="flex flex-col items-center justify-center space-y-3 p-4">
            <div className="flex items-center space-x-3">
              <Loader2
                className={`h-5 w-5 animate-spin ${selectedTheme.text}`}
              />
              <span className={`${selectedTheme.text} font-medium`}>
                {message.content}
              </span>
            </div>
            <Progress value={generationProgress} className="w-full h-2" />
          </div>
        );
      case "plan":
        if (isPlanApproved) {
          return (
            <div className="flex flex-col items-center justify-center space-y-3 p-4">
              <div className="flex items-center space-x-3">
                <Loader2
                  className={`h-5 w-5 animate-spin ${selectedTheme.text}`}
                />
                <span className={`${selectedTheme.text} font-medium`}>
                  Generating your website...
                </span>
              </div>
              <Progress value={generationProgress} className="w-full h-2" />
            </div>
          );
        }
        return (
          <div className="space-y-4 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-2 border-b pb-3">
              <Sparkle className={`h-5 w-5 ${selectedTheme.text}`} />{" "}
              <h3 className="text-lg font-semibold text-gray-800">
                Website Plan
              </h3>
            </div>

            <div className="space-y-6">
              {parsedSections.map((section, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-1.5 rounded-md ${selectedTheme.secondary}`}
                    >
                      <Sparkle className={`h-5 w-5 ${selectedTheme.text}`} />
                    </div>
                    <h4 className="font-medium text-gray-800">
                      {index + 1}. {section.title}
                    </h4>
                  </div>

                  {section.description && (
                    <p className="text-sm text-gray-600 mb-2 pl-9">
                      {section.description}
                    </p>
                  )}

                  {section.items.length > 0 && (
                    <ul className="space-y-1 pl-9">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span
                            className={`inline-block h-1.5 w-1.5 rounded-full ${selectedTheme.primary} mt-1.5 mr-2`}
                          ></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <Button
              className={`mt-6 w-full ${selectedTheme.primary} hover:${selectedTheme.accent} text-white transition-colors`}
              size="sm"
              onClick={handleApprovePlan}
            >
              <Sparkle className="mr-2 h-4 w-4" />
              Approve Plan & Generate Website
            </Button>
          </div>
        );
      case "complete":
        return (
          <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
            <Sparkle className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">
              {message.content}
            </span>
          </div>
        );
      default:
        return <p className="text-sm text-gray-700">{message.content}</p>;
    }
  };

  const StatsModal = () => (
    <Dialog open={isStatsModalOpen} onOpenChange={setIsStatsModalOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Website Statistics</DialogTitle>
        </DialogHeader>
        {siteStats ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{siteStats.views}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Unique Visitors
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {siteStats.unique_visitors?.length || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Bounce Rate
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {siteStats.bounce_rate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{siteStats.avg_time}s</div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-gray-900 text-white flex flex-col justify-center items-center py-4 space-y-12">
        <a
          href="/playground"
          className={`hover:${selectedTheme.text} flex flex-col items-center`}
        >
          <Sparkle className="h-8 w-8" />
          <span className="text-xs mt-1">Playground</span>
        </a>
        <a
          href="/gemini"
          className={`hover:${selectedTheme.text} flex flex-col items-center`}
        >
          <PenTool className="h-8 w-8" />
          <span className="text-xs mt-1">AI Canvas</span>
        </a>
        <a
          href="/image"
          className={`hover:${selectedTheme.text} flex flex-col items-center`}
        >
          <ImageIcon className="h-8 w-8" />
          <span className="text-xs mt-1">Image</span>
        </a>
        <a
          href="/builder"
          className={`hover:${selectedTheme.text} flex flex-col items-center`}
        >
          <Wrench className="h-8 w-8" />
          <span className="text-xs mt-1">Builder</span>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-black">
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
                        ? `${selectedTheme.primary} text-white`
                        : "bg-muted"
                    }`}
                  >
                    {renderMessageContent(message)}
                  </Card>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t p-4 bg-background"
            >
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the website you want to create..."
                  className="flex-1 resize-none"
                  disabled={isGenerating}
                />
                <Button
                  type="submit"
                  disabled={isGenerating}
                  className={selectedTheme.primary}
                >
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
          <div className="w-2/3 flex flex-col bg-white">
            <Tabs defaultValue="preview" className="w-full">
              <div className="border-b px-4">
                <TabsList className="mt-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="preview" className="flex-1 relative">
                {isPlanApproved && isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <Loader2
                      className={`h-12 w-12 animate-spin ${selectedTheme.text} mb-4`}
                    />
                    <h3 className="text-lg font-medium mb-2">
                      Generating your website
                    </h3>
                    <p className="text-gray-500 mb-6">
                      This may take a few moments...
                    </p>
                    <Progress
                      value={generationProgress}
                      className="w-2/3 h-2"
                    />
                  </div>
                ) : generatedHTML ? (
                  <>
                    <iframe
                      srcDoc={generatedHTML}
                      className="w-full h-screen border-none"
                      title="website-preview"
                      onLoad={(e) => {
                        const iframe = e.target as HTMLIFrameElement;
                        if (iframe.contentDocument) {
                          iframe.contentDocument.body.addEventListener(
                            "click",
                            handleComponentSelect
                          );
                        }
                      }}
                    />
                    {selectedComponent && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 p-4 text-white">
                        <div className="flex flex-col gap-2">
                          <Textarea
                            value={componentContent}
                            onChange={(e) =>
                              setComponentContent(e.target.value)
                            }
                            placeholder="Edit component content..."
                            className="min-h-[100px] bg-gray-800 text-white"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={handleComponentEdit}
                              variant="secondary"
                            >
                              Save Changes
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedComponent(null);
                                setComponentContent("");
                              }}
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="min-h-[90vh] flex flex-col items-center justify-center text-gray-500">
                    <Globe className="h-16 w-16 text-gray-300 mb-4" />
                    <p className="text-lg">
                      Your website preview will appear here
                    </p>
                    <p className="text-sm mt-2">
                      Describe your website in the chat to get started
                    </p>
                  </div>
                )}
              </TabsContent>{" "}
              <TabsContent value="code" className="p-4 h-[90vh] overflow-auto">
                {generatedHTML ? (
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto h-full">
                    <code className="text-black">{generatedHTML}</code>
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <FileCode className="h-16 w-16 text-gray-300 mb-4" />
                    <p>Generated code will appear here</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Action Bar */}
        <div className="border-t p-4 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePublishWebsite}>
              <Globe className="mr-2 h-4 w-4" />
              Publish
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <Github className="mr-2 h-4 w-4" />
              Create Repo
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <FileCode className="mr-2 h-4 w-4" />
              Export Code
            </Button>
          </div>

          <Button
            className={selectedTheme.primary}
            onClick={() => {
              toast({
                title: "Website Saved",
                description: "Your travel website has been saved successfully!",
              });
            }}
          >
            Save Project
          </Button>
        </div>
      </div>

      <StatsModal />
    </div>
  );
};

export default Playground;
