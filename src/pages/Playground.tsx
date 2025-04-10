
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowRight, Send, Image, X, Upload, Github, FileCode, Globe, Link } from "lucide-react";
import { 
  sendPromptToBackend, 
  sendImageToBackend, 
  publishProject,
  createGitHubRepository,
  getProjectFiles
} from '@/services/apiService';
import { useToast } from '@/hooks/use-toast';

const Playground = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [responseImage, setResponseImage] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [isCreatingRepo, setIsCreatingRepo] = useState(false);
  const [repoUrl, setRepoUrl] = useState<string | null>(null);
  const [isViewingFiles, setIsViewingFiles] = useState(false);
  const [projectFiles, setProjectFiles] = useState<{name: string, path: string, content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedImage(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !selectedImage) return;
    
    setIsGenerating(true);
    
    try {
      let result;

      if (selectedImage) {
        result = await sendImageToBackend(prompt, selectedImage);
      } else {
        result = await sendPromptToBackend(prompt);
      }

      setResponse(result.response);
      setResponseImage(result.image || null);
      
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

  const handlePublish = async () => {
    // Demo project ID and subdomain
    const projectId = "demo-project-123";
    const subdomain = "my-awesome-project";
    
    setIsPublishing(true);
    
    try {
      const result = await publishProject(projectId, subdomain);
      
      if (result.status === 'success') {
        setPublishedUrl(result.url);
        toast({
          title: "Published successfully",
          description: `Your project is live at ${result.url}`,
        });
      } else {
        toast({
          title: "Publishing failed",
          description: result.message || "Failed to publish your project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to publish:', error);
      toast({
        title: "Error",
        description: "Failed to publish your project",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCreateRepo = async () => {
    // Demo project ID and repo name
    const projectId = "demo-project-123";
    const repoName = "my-awesome-ui-project";
    
    setIsCreatingRepo(true);
    
    try {
      const result = await createGitHubRepository(projectId, repoName, true);
      
      if (result.status === 'success') {
        setRepoUrl(result.repoUrl);
        toast({
          title: "Repository created",
          description: `Your GitHub repository is ready at ${result.repoUrl}`,
        });
      } else {
        toast({
          title: "Repository creation failed",
          description: result.message || "Failed to create GitHub repository",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to create repository:', error);
      toast({
        title: "Error",
        description: "Failed to create GitHub repository",
        variant: "destructive",
      });
    } finally {
      setIsCreatingRepo(false);
    }
  };

  const handleViewFiles = async () => {
    // Demo project ID
    const projectId = "demo-project-123";
    
    setIsViewingFiles(true);
    
    try {
      const result = await getProjectFiles(projectId);
      setProjectFiles(result.files);
    } catch (error) {
      console.error('Failed to fetch files:', error);
      toast({
        title: "Error",
        description: "Failed to fetch project files",
        variant: "destructive",
      });
    } finally {
      setIsViewingFiles(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left side - Prompt and Response */}
        <div className="w-full md:w-1/2 h-full flex flex-col border-r border-white/10">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold mb-4">Generate UI from text</h2>
            <div className="relative mb-4">
              <Textarea 
                placeholder="Describe the UI you want to create..."
                className="min-h-[120px] bg-secondary resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              {/* Image upload button */}
              <div className="absolute left-2 bottom-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1"
                >
                  <Image className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                className="absolute right-2 bottom-2"
                size="sm"
                disabled={isGenerating || (!prompt.trim() && !selectedImage)}
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

            {/* Image Preview */}
            {imagePreview && (
              <div className="relative mb-4 w-full">
                <div className="relative rounded-md overflow-hidden w-full h-40 bg-secondary/50">
                  <img 
                    src={imagePreview} 
                    alt="Selected" 
                    className="w-full h-full object-contain" 
                  />
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute top-2 right-2 p-1 h-7 w-7"
                    onClick={clearSelectedImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            {response ? (
              <Card className="p-4 bg-muted">
                <p className="text-sm">{response}</p>
                {responseImage && (
                  <div className="mt-4">
                    <img 
                      src={responseImage} 
                      alt="Generated" 
                      className="rounded-md w-full object-contain max-h-80" 
                    />
                  </div>
                )}
              </Card>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>Generate UI to see the response here</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Editor Preview with new features */}
        <div className="w-full md:w-1/2 h-full bg-black/30">
          {response ? (
            <div className="h-full flex flex-col">
              <div className="border-b border-white/10 p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Preview</span>
                  <span className="bg-secondary text-xs px-2 py-1 rounded cursor-pointer" onClick={handleViewFiles}>Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2" 
                    onClick={handlePublish}
                    disabled={isPublishing}
                  >
                    {isPublishing ? (
                      <span className="h-3 w-3 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    ) : (
                      <Upload className="h-3 w-3" />
                    )}
                    Publish
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleCreateRepo}
                    disabled={isCreatingRepo}
                  >
                    {isCreatingRepo ? (
                      <span className="h-3 w-3 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    ) : (
                      <Github className="h-3 w-3" />
                    )}
                    GitHub
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-auto">
                {isViewingFiles ? (
                  <div className="bg-muted rounded-lg h-full p-4 overflow-auto">
                    <div className="mb-4 flex items-center">
                      <FileCode className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Project Files</h3>
                    </div>
                    
                    {projectFiles.length > 0 ? (
                      <div className="space-y-2">
                        {projectFiles.map((file, index) => (
                          <div key={index} className="p-2 bg-secondary/30 rounded hover:bg-secondary/50 cursor-pointer">
                            <p className="text-sm font-mono">{file.path}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No files to display</p>
                    )}
                  </div>
                ) : publishedUrl ? (
                  <div className="bg-muted rounded-lg h-full p-4 flex flex-col">
                    <div className="mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      <h3 className="font-medium">Deployed Project</h3>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded flex items-center justify-between">
                      <span className="text-sm font-mono truncate">{publishedUrl}</span>
                      <Button size="sm" variant="ghost" className="ml-2 p-1 h-7 w-7">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm mb-2">Your project is now live!</p>
                        <Button size="sm" variant="outline" onClick={() => window.open(publishedUrl, '_blank')}>
                          Visit Site
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted rounded-lg h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-2">UI Preview</p>
                      <p className="text-muted-foreground text-sm">Your generated UI would appear here</p>
                    </div>
                  </div>
                )}
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
