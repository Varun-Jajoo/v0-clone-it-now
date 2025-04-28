"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Eye,
  Grid,
  ImageIcon,
  Layers,
  Layout,
  LayoutGrid,
  Maximize2,
  Menu,
  Monitor,
  Moon,
  MoreHorizontal,
  PanelLeft,
  PanelRight,
  PenTool,
  Plus,
  Save,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  Trash2,
  Type,
  Undo,
  Wrench,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Component types
const components = [
  {
    id: "header",
    name: "Header",
    content: "Header Component",
    icon: <Layout className="h-4 w-4" />,
    category: "layout",
  },
  {
    id: "paragraph",
    name: "Paragraph",
    content: "This is a paragraph component.",
    icon: <Type className="h-4 w-4" />,
    category: "content",
  },
  {
    id: "image",
    name: "Image",
    content: "Image Placeholder",
    icon: <ImageIcon className="h-4 w-4" />,
    category: "media",
  },
  {
    id: "button",
    name: "Button",
    content: "Click me",
    icon: <Layers className="h-4 w-4" />,
    category: "interactive",
  },
  {
    id: "navigation",
    name: "Navigation",
    content: "Home | About | Contact",
    icon: <Menu className="h-4 w-4" />,
    category: "layout",
  },
  {
    id: "footer",
    name: "Footer",
    content: "© 2023 Your Company. All rights reserved.",
    icon: <Layout className="h-4 w-4" />,
    category: "layout",
  },
  {
    id: "card",
    name: "Card",
    content: "Card with title and description",
    icon: <LayoutGrid className="h-4 w-4" />,
    category: "layout",
    cardTitle: "Card Title",
  },
  {
    id: "hero",
    name: "Hero Section",
    content: "Main hero section with headline and CTA",
    icon: <Maximize2 className="h-4 w-4" />,
    category: "layout",
    heroTitle: "Hero Headline",
    heroSubtitle: "A compelling subtitle that drives action",
    heroButtonText: "Call to Action",
  },
  {
    id: "gallery",
    name: "Gallery",
    content: "Image gallery grid",
    icon: <Grid className="h-4 w-4" />,
    category: "media",
    galleryImages: [
      { id: 1, url: "", link: "" },
      { id: 2, url: "", link: "" },
      { id: 3, url: "", link: "" },
      { id: 4, url: "", link: "" },
      { id: 5, url: "", link: "" },
      { id: 6, url: "", link: "" },
    ],
  },
  {
    id: "carousel",
    name: "Carousel",
    content: "Image carousel",
    icon: <ArrowRight className="h-4 w-4" />,
    category: "media",
    carouselImages: [
      { id: 1, url: "", caption: "Slide 1" },
      { id: 2, url: "", caption: "Slide 2" },
      { id: 3, url: "", caption: "Slide 3" },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    content: "Pricing section",
    icon: <Layers className="h-4 w-4" />,
    category: "content",
    plans: [
      {
        id: 1,
        name: "Basic",
        price: "$9.99",
        features: ["Feature 1", "Feature 2", "Feature 3"],
      },
      {
        id: 2,
        name: "Pro",
        price: "$19.99",
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      },
      {
        id: 3,
        name: "Enterprise",
        price: "$29.99",
        features: [
          "Feature 1",
          "Feature 2",
          "Feature 3",
          "Feature 4",
          "Feature 5",
        ],
      },
    ],
  },
  {
    id: "search",
    name: "Search",
    content: "Search component",
    icon: <Search className="h-4 w-4" />,
    category: "interactive",
    placeholder: "Search...",
    buttonText: "Search",
  },
  {
    id: "custom",
    name: "Custom Layout",
    content: "Custom layout with free positioning",
    icon: <Layout className="h-4 w-4" />,
    category: "layout",
    elements: [
      {
        id: "text1",
        type: "text",
        content: "Heading",
        x: 10,
        y: 10,
        width: 80,
        height: 40,
        fontSize: 24,
        color: "#000000",
      },
      {
        id: "text2",
        type: "text",
        content: "Subheading",
        x: 10,
        y: 60,
        width: 80,
        height: 30,
        fontSize: 18,
        color: "#666666",
      },
      {
        id: "button1",
        type: "button",
        content: "Click Me",
        x: 10,
        y: 100,
        width: 120,
        height: 40,
      },
    ],
  },
];

const fontOptions = [
  "Inter",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

const colorPresets = [
  "#000000", // Black
  "#FFFFFF", // White
  "#F3F4F6", // Light Gray
  "#6B7280", // Gray
  "#1F2937", // Dark Gray
  "#3B82F6", // Blue
  "#10B981", // Green
  "#EF4444", // Red
  "#F59E0B", // Yellow
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
];

// Simulated Gemini AI function (replace with actual implementation)
const generateWithGemini = async (prompt, selectedComponents) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response based on selected components
  const generatedComponents = selectedComponents.map((compId) => {
    const baseComponent = components.find((c) => c.id === compId);
    return {
      ...baseComponent,
      content: `AI-generated content for ${baseComponent.name}`,
      fontSize: 16,
      fontFamily: "Inter",
      color: "#333333",
      backgroundColor: "#ffffff",
    };
  });

  return generatedComponents;
};

export default function WebsiteBuilderComponent() {
  const [pages, setPages] = useState([{ name: "Home", components: [] }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState("edit");
  const [editingComponent, setEditingComponent] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isAIMode, setIsAIMode] = useState(false);
  const [aiPrompt, setAIPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [viewMode, setViewMode] = useState("desktop");
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [componentFilter, setComponentFilter] = useState("all");
  const [newPageName, setNewPageName] = useState("");
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(["style"]);
  const gridRef = useRef(null);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState(false);
  const [carouselSlideIndices, setCarouselSlideIndices] = useState({});

  // Save state to history when components change
  useEffect(() => {
    if (pages[currentPage]?.components && !isGenerating) {
      // Create a stringified version of the current state to compare
      const currentStateString = JSON.stringify(pages);

      // Only add to history if it's different from the last entry
      if (
        history.length === 0 ||
        (historyIndex === history.length - 1 &&
          currentStateString !== JSON.stringify(history[historyIndex]))
      ) {
        // Create a deep copy to avoid reference issues
        const newHistoryEntry = JSON.parse(currentStateString);
        setHistory((prev) => [
          ...prev.slice(0, historyIndex + 1),
          newHistoryEntry,
        ]);
        setHistoryIndex((prev) => prev + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages, currentPage, isGenerating]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      // Use a functional update to ensure we're working with the latest state
      setPages(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      // Use a functional update to ensure we're working with the latest state
      setPages(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  // Fix the handleDragStart function to properly handle component dragging
  const handleDragStart = (e, id, index) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData(
      "component-index",
      index !== null ? index.toString() : ""
    );
    setDraggedIndex(index);
  };

  // Fix the handleDrop function to properly handle component rearrangement
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggedComponentIndex = e.dataTransfer.getData("component-index");
    const rect = gridRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;

    let newIndex = Math.floor(y / 50); // Assuming each row is 50px high
    if (newIndex < 0) newIndex = 0;
    if (newIndex > pages[currentPage].components.length) {
      newIndex = pages[currentPage].components.length;
    }

    // If we're dragging an existing component (rearranging)
    if (draggedComponentIndex !== "") {
      const index = Number.parseInt(draggedComponentIndex, 10);
      if (
        !isNaN(index) &&
        index >= 0 &&
        index < pages[currentPage].components.length
      ) {
        const newComponents = [...pages[currentPage].components];
        const [movedComponent] = newComponents.splice(index, 1);
        newComponents.splice(
          newIndex > index ? newIndex - 1 : newIndex,
          0,
          movedComponent
        );

        const updatedPages = [...pages];
        updatedPages[currentPage].components = newComponents;
        setPages(updatedPages);
        setDraggedIndex(null);
        setHoverIndex(null);
        return;
      }
    }

    // If we're adding a new component
    const newComponent = components.find((c) => c.id === id);
    if (newComponent) {
      const componentToAdd = {
        ...newComponent,
        key: Date.now(),
        width: 12, // Full width by default
        height: 1,
        fontSize: 16,
        fontFamily: "Inter",
        color: "#000000",
        backgroundColor: "#ffffff",
        padding: 16,
        margin: 0,
        borderRadius: 4,
        borderWidth: 0,
        borderColor: "#e5e7eb",
        textAlign: "left",
        link: "none",
        imageUrl: "",
        action: "navigate",
        externalUrl: "",
        // Copy additional properties for specific components
        cardTitle: newComponent.cardTitle || "Card Title",
        heroTitle: newComponent.heroTitle || "Hero Headline",
        heroSubtitle:
          newComponent.heroSubtitle ||
          "A compelling subtitle that drives action",
        heroButtonText: newComponent.heroButtonText || "Call to Action",
        galleryImages: newComponent.galleryImages
          ? [...newComponent.galleryImages]
          : [],
        carouselImages: newComponent.carouselImages
          ? [...newComponent.carouselImages]
          : [],
        plans: newComponent.plans
          ? JSON.parse(JSON.stringify(newComponent.plans))
          : [],
        placeholder: newComponent.placeholder || "Search...",
        buttonText: newComponent.buttonText || "Search",
      };

      const newComponents = [
        ...pages[currentPage].components.slice(0, newIndex),
        componentToAdd,
        ...pages[currentPage].components.slice(newIndex),
      ];

      const updatedPages = [...pages];
      updatedPages[currentPage].components = newComponents;
      setPages(updatedPages);
    }

    setDraggedIndex(null);
    setHoverIndex(null);
  };

  const handleDelete = (index) => {
    const newPages = [...pages];
    newPages[currentPage].components.splice(index, 1);
    setPages(newPages);
    setEditingComponent(null);
  };

  // Fix the handleEdit function to ensure it properly selects the component
  const handleEdit = (index) => {
    setIsPropertiesLoading(true);
    setEditingComponent(index);
    setShowRightPanel(true);
    setActiveAccordion(["content", "style", "colors", "dimensions"]);
    // Simulate a small delay to ensure the UI updates
    setTimeout(() => {
      setIsPropertiesLoading(false);
    }, 100);
  };

  const handleContentChange = (e, index) => {
    const newPages = [...pages];
    newPages[currentPage].components[index].content = e.target.value;
    setPages(newPages);
  };

  // Fix the handleStyleChange function to ensure it properly updates component properties
  const handleStyleChange = useCallback(
    (index, property, value) => {
      if (
        index === null ||
        index === undefined ||
        !pages[currentPage]?.components[index]
      ) {
        return;
      }

      setPages((prevPages) => {
        const newPages = JSON.parse(JSON.stringify(prevPages));
        newPages[currentPage].components[index][property] = value;
        return newPages;
      });
    },
    [currentPage, pages]
  );

  const handleSaveEdit = () => {
    setEditingComponent(null);
  };

  const handleDuplicate = (index) => {
    const newPages = [...pages];
    const componentToDuplicate = {
      ...newPages[currentPage].components[index],
      key: Date.now(),
    };
    newPages[currentPage].components.splice(index + 1, 0, componentToDuplicate);
    setPages(newPages);
  };

  const handleAddPage = () => {
    if (isAddingPage && newPageName.trim()) {
      setPages([...pages, { name: newPageName, components: [] }]);
      setNewPageName("");
      setIsAddingPage(false);
    } else {
      setIsAddingPage(true);
    }
  };

  const handleDeletePage = (pageIndex) => {
    if (pages.length > 1) {
      const newPages = [...pages];
      newPages.splice(pageIndex, 1);
      setPages(newPages);
      if (currentPage >= pageIndex && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedComponents = await generateWithGemini(
        aiPrompt,
        selectedComponents
      );
      const newPages = [...pages];
      newPages[currentPage].components = generatedComponents.map((comp) => ({
        ...comp,
        key: Date.now() + Math.random(),
        width: 12,
        height: 1,
        padding: 16,
        margin: 0,
        borderRadius: 4,
        borderWidth: 0,
        borderColor: "#e5e7eb",
        textAlign: "left",
        link: "",
      }));
      setPages(newPages);
    } catch (error) {
      console.error("Error generating with AI:", error);
    }
    setIsGenerating(false);
  };

  const toggleComponentSelection = (componentId) => {
    setSelectedComponents((prev) =>
      prev.includes(componentId)
        ? prev.filter((id) => id !== componentId)
        : [...prev, componentId]
    );
  };

  const getFilteredComponents = () => {
    if (componentFilter === "all") return components;
    return components.filter((comp) => comp.category === componentFilter);
  };

  // Add a visual indicator when a component is being edited
  // Update the renderComponent function to highlight the currently edited component:

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleStyleChange(index, "imageUrl", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Carousel navigation functions
  const handleCarouselPrev = (componentKey) => {
    setCarouselSlideIndices((prev) => {
      const currentIndex = prev[componentKey] || 0;
      return {
        ...prev,
        [componentKey]: currentIndex > 0 ? currentIndex - 1 : 0,
      };
    });
  };

  const handleCarouselNext = (componentKey, totalSlides) => {
    setCarouselSlideIndices((prev) => {
      const currentIndex = prev[componentKey] || 0;
      return {
        ...prev,
        [componentKey]:
          currentIndex < totalSlides - 1 ? currentIndex + 1 : currentIndex,
      };
    });
  };

  // Fix the renderComponent function to properly style buttons
  const renderComponent = (component, index) => {
    const handleDragOver = (e, index) => {
      e.preventDefault();
      setHoverIndex(index);
    };

    const style = {
      gridColumn: `span ${component.width}`,
      gridRow: `span ${component.height}`,
      fontSize: `${component.fontSize}px`,
      fontFamily: component.fontFamily,
      color: component.color,
      backgroundColor: component.backgroundColor,
      padding: `${component.padding}px`,
      margin: `${component.margin}px`,
      borderRadius: `${component.borderRadius}px`,
      borderWidth: `${component.borderWidth}px`,
      borderStyle: component.borderWidth > 0 ? "solid" : "none",
      borderColor: component.borderColor,
      textAlign: component.textAlign || "left",
      minHeight: component.fixedHeight
        ? `${component.heightValue || 100}px`
        : "auto",
      height: component.fixedHeight
        ? `${component.heightValue || 100}px`
        : "auto",
    };

    const getJustifyContent = (textAlign) => {
      switch (textAlign) {
        case "center":
          return "center";
        case "right":
          return "flex-end";
        default:
          return "flex-start";
      }
    };

    // Get current carousel slide index
    const currentSlideIndex = carouselSlideIndices[component.key] || 0;

    return (
      <div
        key={component.key}
        className={cn(
          "relative border rounded transition-all duration-200 group",
          index === hoverIndex ? "ring-2 ring-primary" : "",
          index === editingComponent ? "ring-2 ring-primary ring-offset-2" : "",
          draggedIndex === index ? "opacity-50" : "opacity-100",
          "hover:ring-1 hover:ring-primary/50 cursor-pointer",
          isDarkMode ? "text-white" : ""
        )}
        style={style}
        draggable
        onDragStart={(e) => handleDragStart(e, component.id, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(index);
        }}
      >
        <div className="absolute top-0 right-0 z-10 flex opacity-0 group-hover:opacity-100 hover:opacity-100 bg-background/80 rounded-bl">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(index);
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDuplicate(index)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Duplicate</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="relative">
          {component.id === "header" && (
            <h2 className={isDarkMode ? "text-white" : ""}>
              {component.content}
            </h2>
          )}
          {component.id === "paragraph" && (
            <p className={isDarkMode ? "text-white" : ""}>
              {component.content}
            </p>
          )}
          {component.id === "image" && (
            <div className="bg-muted h-40 flex items-center justify-center">
              {component.imageUrl ? (
                <img
                  src={component.imageUrl || "/placeholder.svg"}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon
                    className={cn(
                      "h-8 w-8",
                      isDarkMode ? "text-gray-300" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "ml-2",
                      isDarkMode ? "text-gray-300" : "text-muted-foreground"
                    )}
                  >
                    {component.content}
                  </span>
                </>
              )}
            </div>
          )}
          {component.id === "button" && (
            <Button
              variant="default"
              className={cn(
                "pointer-events-none",
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {component.content}
            </Button>
          )}
          {component.id === "navigation" && (
            <nav
              className="flex space-x-4"
              style={{ justifyContent: getJustifyContent(component.textAlign) }}
            >
              {component.content.split("|").map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className={cn(
                    "hover:underline",
                    isDarkMode ? "text-white" : ""
                  )}
                >
                  {item.trim()}
                </a>
              ))}
            </nav>
          )}
          {component.id === "footer" && (
            <footer
              className={cn(
                "text-sm",
                isDarkMode ? "text-gray-300" : "text-muted-foreground"
              )}
            >
              {component.content}
            </footer>
          )}
          {component.id === "card" && (
            <div className="p-4 border rounded-lg">
              <h3
                className={cn(
                  "text-lg font-semibold mb-2",
                  isDarkMode ? "text-white" : ""
                )}
              >
                {component.cardTitle || "Card Title"}
              </h3>
              <p className={isDarkMode ? "text-gray-300" : ""}>
                {component.content}
              </p>
            </div>
          )}
          {component.id === "hero" && (
            <div className="py-12 text-center">
              <h1
                className={cn(
                  "text-3xl font-bold mb-4",
                  isDarkMode ? "text-white" : ""
                )}
              >
                {component.heroTitle || "Hero Headline"}
              </h1>
              <p className={cn("mb-6", isDarkMode ? "text-gray-300" : "")}>
                {component.heroSubtitle || component.content}
              </p>
              <Button
                variant="default"
                className={cn(
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {component.heroButtonText || "Call to Action"}
              </Button>
            </div>
          )}
          {component.id === "gallery" && (
            <div className="grid grid-cols-3 gap-2">
              {(component.galleryImages || Array(6).fill({})).map((img, i) => (
                <div
                  key={i}
                  className="bg-muted aspect-square flex items-center justify-center"
                >
                  {img.url ? (
                    <img
                      src={img.url || "/placeholder.svg"}
                      alt={`Gallery ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon
                      className={cn(
                        "h-6 w-6",
                        isDarkMode ? "text-gray-300" : "text-muted-foreground"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          {component.id === "carousel" && (
            <div className="border rounded-lg p-4 relative">
              <div className="bg-muted aspect-video flex items-center justify-center">
                {component.carouselImages &&
                component.carouselImages.length > 0 ? (
                  <>
                    {component.carouselImages.map((slide, i) => (
                      <div
                        key={i}
                        className={cn(
                          "absolute inset-0 transition-opacity duration-300",
                          i === currentSlideIndex
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        )}
                      >
                        {slide.url ? (
                          <img
                            src={slide.url || "/placeholder.svg"}
                            alt={`Slide ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ImageIcon
                              className={cn(
                                "h-8 w-8 mx-auto mb-2",
                                isDarkMode
                                  ? "text-gray-300"
                                  : "text-muted-foreground"
                              )}
                            />
                            <p
                              className={cn(
                                isDarkMode
                                  ? "text-gray-300"
                                  : "text-muted-foreground"
                              )}
                            >
                              {slide.caption || `Slide ${i + 1}`}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCarouselPrev(component.key);
                      }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCarouselNext(
                          component.key,
                          component.carouselImages.length
                        );
                      }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <ImageIcon
                      className={cn(
                        "h-8 w-8 mx-auto mb-2",
                        isDarkMode ? "text-gray-300" : "text-muted-foreground"
                      )}
                    />
                    <p
                      className={cn(
                        isDarkMode ? "text-gray-300" : "text-muted-foreground"
                      )}
                    >
                      Carousel Slides
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center mt-2 gap-1">
                {(component.carouselImages || Array(3).fill({})).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full cursor-pointer",
                      i === currentSlideIndex ? "bg-primary" : "bg-primary/50"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselSlideIndices((prev) => ({
                        ...prev,
                        [component.key]: i,
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {component.id === "pricing" && (
            <div className="grid md:grid-cols-3 gap-4">
              {(component.plans || Array(3).fill({})).map((plan, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 text-center"
                  style={{
                    backgroundColor:
                      component.cardBackgroundColor ||
                      component.backgroundColor,
                    borderRadius: `${
                      component.cardBorderRadius || component.borderRadius
                    }px`,
                    borderWidth: `${
                      component.cardBorderWidth || component.borderWidth
                    }px`,
                    borderColor:
                      component.cardBorderColor || component.borderColor,
                    borderStyle:
                      (component.cardBorderWidth || component.borderWidth) > 0
                        ? "solid"
                        : "none",
                  }}
                >
                  <h3
                    className="text-lg font-bold"
                    style={{ color: component.textColor || component.color }}
                  >
                    {plan.name || `Plan ${i + 1}`}
                  </h3>
                  <div
                    className="text-2xl font-bold my-2"
                    style={{ color: component.priceColor || component.color }}
                  >
                    {plan.price || "$9.99"}
                  </div>
                  <ul className="text-sm space-y-2 my-4">
                    {(plan.features || Array(3).fill("Feature")).map(
                      (feature, j) => (
                        <li
                          key={j}
                          style={{
                            color: component.featureColor || component.color,
                          }}
                        >
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full"
                    style={{
                      backgroundColor:
                        component.buttonBackgroundColor || "#ffffff",
                      color: component.buttonTextColor || component.color,
                      borderColor:
                        component.buttonBorderColor || component.borderColor,
                    }}
                  >
                    Select Plan
                  </Button>
                </div>
              ))}
            </div>
          )}
          {component.id === "search" && (
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder={component.placeholder || "Search..."}
                className={cn(
                  "flex-1",
                  isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
                )}
              />
              <Button
                type="submit"
                className={cn(
                  isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : ""
                )}
              >
                {component.buttonText || "Search"}
              </Button>
            </div>
          )}
          {component.id === "custom" && (
            <div className="relative" style={{ minHeight: "200px", ...style }}>
              {(component.elements || []).map((element, idx) => (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: element.width ? `${element.width}px` : "auto",
                    height: element.height ? `${element.height}px` : "auto",
                  }}
                >
                  {element.type === "text" && (
                    <div
                      style={{
                        fontSize: `${element.fontSize || component.fontSize}px`,
                        color: element.color || component.color,
                        fontFamily: element.fontFamily || component.fontFamily,
                      }}
                      className={
                        isDarkMode && !element.color ? "text-white" : ""
                      }
                    >
                      {element.content}
                    </div>
                  )}
                  {element.type === "button" && (
                    <Button
                      variant="default"
                      className={cn(
                        isDarkMode && !element.backgroundColor
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                      style={{
                        backgroundColor:
                          element.backgroundColor ||
                          (isDarkMode ? "#3b82f6" : "#3B82F6"),
                        color: element.color || "#FFFFFF",
                      }}
                    >
                      {element.content}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Fix the renderPreviewComponent function to properly style buttons
  const renderPreviewComponent = (component) => {
    const style = {
      gridColumn: `span ${component.width}`,
      gridRow: `span ${component.height}`,
      fontSize: `${component.fontSize}px`,
      fontFamily: component.fontFamily,
      color: component.color,
      backgroundColor: component.backgroundColor,
      padding: `${component.padding}px`,
      margin: `${component.margin}px`,
      borderRadius: `${component.borderRadius}px`,
      borderWidth: `${component.borderWidth}px`,
      borderStyle: component.borderWidth > 0 ? "solid" : "none",
      borderColor: component.borderColor,
      textAlign: component.textAlign || "left",
      minHeight: component.fixedHeight
        ? `${component.heightValue || 100}px`
        : "auto",
      height: component.fixedHeight
        ? `${component.heightValue || 100}px`
        : "auto",
    };

    const handleClick = () => {
      if (component.action === "external" && component.externalUrl) {
        window.open(component.externalUrl, "_blank");
      } else if (component.link && component.link !== "none") {
        const linkedPageIndex = pages.findIndex(
          (page) => page.name === component.link
        );
        if (linkedPageIndex !== -1) {
          setCurrentPage(linkedPageIndex);
          setActiveTab("edit");
        }
      }
    };

    // Get current carousel slide index
    const currentSlideIndex = carouselSlideIndices[component.key] || 0;

    return (
      <div key={component.key} className="relative" style={style}>
        {component.id === "header" && (
          <h2 className={isDarkMode ? "text-white" : ""}>
            {component.content}
          </h2>
        )}
        {component.id === "paragraph" && (
          <p className={isDarkMode ? "text-white" : ""}>{component.content}</p>
        )}
        {component.id === "image" && (
          <div className="bg-muted h-40 flex items-center justify-center">
            {component.imageUrl ? (
              <img
                src={component.imageUrl || "/placeholder.svg"}
                alt="Uploaded"
                className="h-full w-full object-cover"
                onClick={handleClick}
                style={
                  component.link && component.link !== "none"
                    ? { cursor: "pointer" }
                    : {}
                }
              />
            ) : (
              <>
                <ImageIcon
                  className={cn(
                    "h-8 w-8",
                    isDarkMode ? "text-gray-300" : "text-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "ml-2",
                    isDarkMode ? "text-gray-300" : "text-muted-foreground"
                  )}
                >
                  {component.content}
                </span>
              </>
            )}
          </div>
        )}
        {component.id === "button" && (
          <Button
            variant="default"
            className={cn(
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            onClick={() => {
              if (component.action === "external" && component.externalUrl) {
                window.open(component.externalUrl, "_blank");
              } else if (component.link && component.link !== "none") {
                const linkedPageIndex = pages.findIndex(
                  (page) => page.name === component.link
                );
                if (linkedPageIndex !== -1) {
                  setCurrentPage(linkedPageIndex);
                  setActiveTab("edit");
                }
              }
            }}
          >
            {component.content}
          </Button>
        )}
        {component.id === "navigation" && (
          <nav className="flex space-x-4">
            {component.content.split("|").map((item, i) => {
              const navLinks = component.navLinks || [];
              const link = navLinks[i] || "none";

              return (
                <a
                  key={i}
                  href="#"
                  className={cn(
                    "hover:underline",
                    isDarkMode ? "text-white" : ""
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link && link !== "none") {
                      const linkedPageIndex = pages.findIndex(
                        (page) => page.name === link
                      );
                      if (linkedPageIndex !== -1) {
                        setCurrentPage(linkedPageIndex);
                        setActiveTab("edit");
                      }
                    }
                  }}
                >
                  {item.trim()}
                </a>
              );
            })}
          </nav>
        )}
        {component.id === "footer" && (
          <footer
            className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-muted-foreground"
            )}
          >
            {component.content}
          </footer>
        )}
        {component.id === "card" && (
          <div className="p-4 border rounded-lg">
            <h3
              className={cn(
                "text-lg font-semibold mb-2",
                isDarkMode ? "text-white" : ""
              )}
            >
              {component.cardTitle || "Card Title"}
            </h3>
            <p className={isDarkMode ? "text-gray-300" : ""}>
              {component.content}
            </p>
          </div>
        )}
        {component.id === "hero" && (
          <div className="py-12 text-center">
            <h1
              className={cn(
                "text-3xl font-bold mb-4",
                isDarkMode ? "text-white" : ""
              )}
            >
              {component.heroTitle || "Hero Headline"}
            </h1>
            <p className={cn("mb-6", isDarkMode ? "text-gray-300" : "")}>
              {component.heroSubtitle || component.content}
            </p>
            <Button
              variant="default"
              className={cn(
                isDarkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={handleClick}
            >
              {component.heroButtonText || "Call to Action"}
            </Button>
          </div>
        )}
        {component.id === "gallery" && (
          <div className="grid grid-cols-3 gap-2">
            {(component.galleryImages || Array(6).fill({})).map((img, i) => (
              <div
                key={i}
                className="bg-muted aspect-square flex items-center justify-center"
                onClick={() => {
                  if (img.link && img.link !== "none") {
                    const linkedPageIndex = pages.findIndex(
                      (page) => page.name === img.link
                    );
                    if (linkedPageIndex !== -1) {
                      setCurrentPage(linkedPageIndex);
                      setActiveTab("edit");
                    } else if (img.link === "external" && img.externalUrl) {
                      window.open(img.externalUrl, "_blank");
                    }
                  }
                }}
                style={
                  img.link && img.link !== "none" ? { cursor: "pointer" } : {}
                }
              >
                {img.url ? (
                  <img
                    src={img.url || "/placeholder.svg"}
                    alt={`Gallery ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    className={cn(
                      "h-6 w-6",
                      isDarkMode ? "text-gray-300" : "text-muted-foreground"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {component.id === "carousel" && (
          <div className="border rounded-lg p-4 relative">
            <div className="bg-muted aspect-video flex items-center justify-center">
              {component.carouselImages &&
              component.carouselImages.length > 0 ? (
                <>
                  {component.carouselImages.map((slide, i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-300",
                        i === currentSlideIndex
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {slide.url ? (
                        <img
                          src={slide.url || "/placeholder.svg"}
                          alt={`Slide ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ImageIcon
                            className={cn(
                              "h-8 w-8 mx-auto mb-2",
                              isDarkMode
                                ? "text-gray-300"
                                : "text-muted-foreground"
                            )}
                          />
                          <p
                            className={cn(
                              isDarkMode
                                ? "text-gray-300"
                                : "text-muted-foreground"
                            )}
                          >
                            {slide.caption || `Slide ${i + 1}`}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 z-10"
                    onClick={() => handleCarouselPrev(component.key)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-background/80 z-10"
                    onClick={() =>
                      handleCarouselNext(
                        component.key,
                        component.carouselImages.length
                      )
                    }
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  <ImageIcon
                    className={cn(
                      "h-8 w-8 mx-auto mb-2",
                      isDarkMode ? "text-gray-300" : "text-muted-foreground"
                    )}
                  />
                  <p
                    className={cn(
                      isDarkMode ? "text-gray-300" : "text-muted-foreground"
                    )}
                  >
                    Carousel Slides
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-2 gap-1">
              {(component.carouselImages || Array(3).fill({})).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full cursor-pointer",
                    i === currentSlideIndex ? "bg-primary" : "bg-primary/50"
                  )}
                  onClick={() => {
                    setCarouselSlideIndices((prev) => ({
                      ...prev,
                      [component.key]: i,
                    }));
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {component.id === "pricing" && (
          <div className="grid md:grid-cols-3 gap-4">
            {(component.plans || Array(3).fill({})).map((plan, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 text-center"
                style={{
                  backgroundColor:
                    component.cardBackgroundColor || component.backgroundColor,
                  borderRadius: `${
                    component.cardBorderRadius || component.borderRadius
                  }px`,
                  borderWidth: `${
                    component.cardBorderWidth || component.borderWidth
                  }px`,
                  borderColor:
                    component.cardBorderColor || component.borderColor,
                  borderStyle:
                    (component.cardBorderWidth || component.borderWidth) > 0
                      ? "solid"
                      : "none",
                }}
              >
                <h3
                  className="text-lg font-bold"
                  style={{ color: component.textColor || component.color }}
                >
                  {plan.name || `Plan ${i + 1}`}
                </h3>
                <div
                  className="text-2xl font-bold my-2"
                  style={{ color: component.priceColor || component.color }}
                >
                  {plan.price || "$9.99"}
                </div>
                <ul className="text-sm space-y-2 my-4">
                  {(plan.features || Array(3).fill("Feature")).map(
                    (feature, j) => (
                      <li
                        key={j}
                        style={{
                          color: component.featureColor || component.color,
                        }}
                      >
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  style={{
                    backgroundColor:
                      component.buttonBackgroundColor || "#ffffff",
                    color: component.buttonTextColor || component.color,
                    borderColor:
                      component.buttonBorderColor || component.borderColor,
                  }}
                  onClick={handleClick}
                >
                  Select Plan
                </Button>
              </div>
            ))}
          </div>
        )}
        {component.id === "search" && (
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder={component.placeholder || "Search..."}
              className={cn(
                "flex-1",
                isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
              )}
            />
            <Button
              type="submit"
              className={cn(
                isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : ""
              )}
            >
              {component.buttonText || "Search"}
            </Button>
          </div>
        )}
        {component.id === "custom" && (
          <div className="relative" style={{ minHeight: "200px", ...style }}>
            {(component.elements || []).map((element, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: element.width ? `${element.width}px` : "auto",
                  height: element.height ? `${element.height}px` : "auto",
                }}
              >
                {element.type === "text" && (
                  <div
                    style={{
                      fontSize: `${element.fontSize || component.fontSize}px`,
                      color: element.color || component.color,
                      fontFamily: element.fontFamily || component.fontFamily,
                    }}
                    className={isDarkMode && !element.color ? "text-white" : ""}
                  >
                    {element.content}
                  </div>
                )}
                {element.type === "button" && (
                  <Button
                    variant="default"
                    className={cn(
                      isDarkMode && !element.backgroundColor
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    style={{
                      backgroundColor:
                        element.backgroundColor ||
                        (isDarkMode ? "#3b82f6" : "#3B82F6"),
                      color: element.color || "#FFFFFF",
                    }}
                    onClick={handleClick}
                  >
                    {element.content}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case "tablet":
        return "max-w-[768px] mx-auto";
      case "mobile":
        return "max-w-[375px] mx-auto";
      default:
        return "max-w-full";
    }
  };

  // Fix the sidebar issue by preventing the dropdown from closing the sidebar
  const handleClickOutside = useCallback(
    (e) => {
      // Only close the editor if clicking outside both the grid and the right panel
      const rightPanel = document.querySelector('[data-sidebar="properties"]');
      const isDropdownClick =
        e.target.closest('[role="combobox"]') ||
        e.target.closest('[role="listbox"]') ||
        e.target.closest(".select-content");

      if (
        gridRef.current &&
        !gridRef.current.contains(e.target) &&
        rightPanel &&
        !rightPanel.contains(e.target) &&
        editingComponent !== null &&
        !e.target.closest(".dropdown-menu") && // Don't close when clicking dropdowns
        !isDropdownClick // Don't close when clicking select dropdowns
      ) {
        setEditingComponent(null);
      }
    },
    [editingComponent]
  );

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Add a function to ensure the right panel is visible when editing a component
  useEffect(() => {
    if (editingComponent !== null && !showRightPanel) {
      setShowRightPanel(true);
    }
  }, [editingComponent, showRightPanel]);

  // Add a function to reset editing state when changing pages
  useEffect(() => {
    setEditingComponent(null);
  }, [currentPage]);

  return (
    <div
      className={cn(
        "flex h-screen overflow-hidden",
        isDarkMode ? "dark bg-gray-900" : "",
        isFullscreen ? "fixed inset-0 z-50 bg-background" : ""
      )}
    >
      {/* Left Sidebar */}
      <div className="w-16 bg-gray-900 text-white flex flex-col justify-between items-center py-4">
        <div className="flex flex-col items-center gap-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800"
                >
                  <Sparkles className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">AI Canvas</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800"
                >
                  <PenTool className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Design</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Media</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-gray-800 hover:bg-gray-700"
                >
                  <Wrench className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Builder</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Toggle Theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Toggle Fullscreen</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Components Panel */}
      {showLeftPanel && (
        <div
          className={cn(
            "w-64 border-r overflow-y-auto",
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-background"
          )}
        >
          <div
            className={cn("p-4 border-b", isDarkMode ? "border-gray-700" : "")}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={cn("font-semibold", isDarkMode ? "text-white" : "")}
              >
                Components
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLeftPanel(false)}
              >
                <PanelLeft
                  className={cn("h-4 w-4", isDarkMode ? "text-white" : "")}
                />
              </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Label
                htmlFor="ai-mode"
                className={isDarkMode ? "text-white" : ""}
              >
                AI Mode
              </Label>
              <Switch
                id="ai-mode"
                checked={isAIMode}
                onCheckedChange={setIsAIMode}
              />
            </div>

            {!isAIMode && (
              <div className="flex flex-wrap gap-1 mb-4">
                <Badge
                  variant={componentFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setComponentFilter("all")}
                >
                  All
                </Badge>
                <Badge
                  variant={componentFilter === "layout" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setComponentFilter("layout")}
                >
                  Layout
                </Badge>
                <Badge
                  variant={
                    componentFilter === "content" ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setComponentFilter("content")}
                >
                  Content
                </Badge>
                <Badge
                  variant={componentFilter === "media" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setComponentFilter("media")}
                >
                  Media
                </Badge>
                <Badge
                  variant={
                    componentFilter === "interactive" ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => setComponentFilter("interactive")}
                >
                  Interactive
                </Badge>
              </div>
            )}
          </div>

          {isAIMode ? (
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {components.map((component) => (
                  <Badge
                    key={component.id}
                    variant={
                      selectedComponents.includes(component.id)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleComponentSelection(component.id)}
                  >
                    {component.name}
                  </Badge>
                ))}
              </div>
              <Textarea
                placeholder="Describe your website..."
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                className={cn(
                  "min-h-[120px]",
                  isDarkMode ? "bg-gray-700 text-white border-gray-600" : ""
                )}
              />
              <Button
                onClick={handleAIGenerate}
                disabled={isGenerating || selectedComponents.length === 0}
                className="w-full"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2">⟳</span> Generating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" /> Generate with AI
                  </div>
                )}
              </Button>
            </div>
          ) : (
            <div className="p-4 grid gap-2">
              {getFilteredComponents().map((component) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component.id, null)}
                  className={cn(
                    "flex items-center space-x-2 p-2 border rounded transition-colors cursor-move",
                    isDarkMode
                      ? "border-gray-700 hover:bg-gray-700 text-white"
                      : "hover:bg-accent"
                  )}
                >
                  <div
                    className={cn(
                      "flex-shrink-0",
                      isDarkMode ? "text-gray-300" : "text-muted-foreground"
                    )}
                  >
                    {component.icon}
                  </div>
                  <span>{component.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden",
          isDarkMode ? "bg-gray-900" : "bg-background"
        )}
      >
        <header
          className={cn(
            "flex items-center justify-between p-4 border-b",
            isDarkMode ? "border-gray-700" : ""
          )}
        >
          <div className="flex items-center">
            {!showLeftPanel && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLeftPanel(true)}
                className="mr-2"
              >
                <PanelLeft
                  className={cn("h-4 w-4", isDarkMode ? "text-white" : "")}
                />
              </Button>
            )}
            <h1
              className={cn(
                "text-xl font-bold",
                isDarkMode ? "text-white" : ""
              )}
            >
              AI-Enhanced Website Builder
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "flex items-center border rounded-md",
                isDarkMode ? "border-gray-700" : ""
              )}
            >
              <Button
                variant={viewMode === "desktop" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("desktop")}
                className={cn(
                  "rounded-r-none",
                  isDarkMode ? "text-white hover:bg-gray-700" : ""
                )}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tablet")}
                className={cn(
                  "rounded-none",
                  isDarkMode ? "text-white hover:bg-gray-700" : ""
                )}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("mobile")}
                className={cn(
                  "rounded-l-none",
                  isDarkMode ? "text-white hover:bg-gray-700" : ""
                )}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className={isDarkMode ? "text-white hover:bg-gray-700" : ""}
            >
              <Undo className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className={isDarkMode ? "text-white hover:bg-gray-700" : ""}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className={cn(
                "gap-2",
                isDarkMode ? "text-white border-gray-700 hover:bg-gray-700" : ""
              )}
            >
              <Eye className="h-4 w-4" /> Preview
            </Button>

            <Button
              className={cn(
                "gap-2",
                isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
              )}
            >
              <Save className="h-4 w-4" /> Publish
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4 flex items-center space-x-2">
              <Select
                value={currentPage.toString()}
                onValueChange={(value) =>
                  setCurrentPage(Number.parseInt(value))
                }
              >
                <SelectTrigger
                  className={cn(
                    "w-[180px]",
                    isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
                  )}
                >
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent
                  className={
                    isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
                  }
                >
                  {pages.map((page, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {page.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isAddingPage ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newPageName}
                    onChange={(e) => setNewPageName(e.target.value)}
                    placeholder="Page name"
                    className={cn(
                      "w-40",
                      isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
                    )}
                  />
                  <Button
                    onClick={handleAddPage}
                    size="sm"
                    className={
                      isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                    }
                  >
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddingPage(false)}
                    className={isDarkMode ? "text-white hover:bg-gray-700" : ""}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAddPage}
                  size="sm"
                  className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Page
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={isDarkMode ? "text-white hover:bg-gray-700" : ""}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className={
                    isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
                  }
                >
                  <DropdownMenuItem
                    onClick={() => handleDeletePage(currentPage)}
                  >
                    Delete Page
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate Page</DropdownMenuItem>
                  <DropdownMenuItem>Export Page</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList
                className={cn(
                  "grid w-full grid-cols-2",
                  isDarkMode ? "bg-gray-800" : ""
                )}
              >
                <TabsTrigger
                  value="edit"
                  className={
                    isDarkMode
                      ? "data-[state=active]:bg-gray-700 text-white"
                      : ""
                  }
                >
                  Edit
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className={
                    isDarkMode
                      ? "data-[state=active]:bg-gray-700 text-white"
                      : ""
                  }
                >
                  Preview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <div
                  ref={gridRef}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-4 min-h-[500px] transition-all ",
                    getViewportClass(),
                    isDarkMode ? "border-gray-700" : ""
                  )}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <div
                    className="grid grid-cols-12 gap-4"
                    style={{ gridAutoRows: "min-content" }}
                  >
                    {pages[currentPage].components.map((component, index) =>
                      renderComponent(component, index)
                    )}
                    {pages[currentPage].components.length === 0 && (
                      <div
                        className={cn(
                          "col-span-12 flex flex-col items-center justify-center py-12 text-center",
                          isDarkMode ? "text-gray-400" : "text-muted-foreground"
                        )}
                      >
                        <LayoutGrid className="h-12 w-12 mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          Drag components here
                        </h3>
                        <p>
                          Drag and drop components from the sidebar to start
                          building your page
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <div
                  className={cn(
                    "border rounded-lg p-4 min-h-[500px] transition-all bg-white",
                    getViewportClass(),
                    isDarkMode ? "border-gray-700" : ""
                  )}
                >
                  <h2
                    className={cn(
                      "text-xl font-semibold mb-4 text-black",
                      isDarkMode ? "text-black" : ""
                    )}
                  >
                    {pages[currentPage].name}
                  </h2>
                  <div className="grid grid-cols-12 gap-4">
                    {pages[currentPage].components.map(renderPreviewComponent)}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>

          {/* Properties Panel */}
          {showRightPanel && (
            <div
              className={cn(
                "w-72 border-l overflow-y-auto",
                isDarkMode ? "bg-gray-800 border-gray-700" : "bg-background"
              )}
              data-sidebar="properties"
            >
              <div
                className={cn(
                  "p-4 border-b flex items-center justify-between",
                  isDarkMode ? "border-gray-700" : ""
                )}
              >
                <h2
                  className={cn(
                    "font-semibold",
                    isDarkMode ? "text-white" : ""
                  )}
                >
                  Properties
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveEdit}
                    className={
                      isDarkMode
                        ? "border-gray-700 text-white hover:bg-gray-700"
                        : ""
                    }
                  >
                    Done
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowRightPanel(false)}
                    className={isDarkMode ? "text-white hover:bg-gray-700" : ""}
                  >
                    <PanelRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {editingComponent !== null &&
              pages[currentPage]?.components[editingComponent] ? (
                (() => {
                  try {
                    const component =
                      pages[currentPage].components[editingComponent];

                    return (
                      <div className="p-4">
                        <Accordion
                          type="multiple"
                          defaultValue={["content", "style"]}
                          value={activeAccordion}
                          onValueChange={setActiveAccordion}
                          className="w-full"
                        >
                          <AccordionItem
                            value="content"
                            className={isDarkMode ? "border-gray-700" : ""}
                          >
                            <AccordionTrigger
                              className={
                                isDarkMode
                                  ? "text-white hover:no-underline"
                                  : ""
                              }
                            >
                              Content
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                {/* Common content field for most components */}
                                {component.id !== "carousel" &&
                                  component.id !== "pricing" &&
                                  component.id !== "gallery" && (
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Text Content
                                      </Label>
                                      <Textarea
                                        value={component.content || ""}
                                        onChange={(e) =>
                                          handleContentChange(
                                            e,
                                            editingComponent
                                          )
                                        }
                                        className={cn(
                                          "min-h-[100px]",
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        )}
                                      />
                                    </div>
                                  )}

                                {/* Card specific fields */}
                                {component.id === "card" && (
                                  <div className="space-y-2">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Card Title
                                    </Label>
                                    <Input
                                      value={
                                        component.cardTitle || "Card Title"
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "cardTitle",
                                          e.target.value
                                        )
                                      }
                                      className={
                                        isDarkMode
                                          ? "bg-gray-700 text-white border-gray-600"
                                          : ""
                                      }
                                    />
                                  </div>
                                )}

                                {/* Hero specific fields */}
                                {component.id === "hero" && (
                                  <>
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Hero Title
                                      </Label>
                                      <Input
                                        value={
                                          component.heroTitle || "Hero Headline"
                                        }
                                        onChange={(e) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "heroTitle",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Subtitle
                                      </Label>
                                      <Textarea
                                        value={
                                          component.heroSubtitle ||
                                          "A compelling subtitle that drives action"
                                        }
                                        onChange={(e) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "heroSubtitle",
                                            e.target.value
                                          )
                                        }
                                        className={cn(
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        )}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Button Text
                                      </Label>
                                      <Input
                                        value={
                                          component.heroButtonText ||
                                          "Call to Action"
                                        }
                                        onChange={(e) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "heroButtonText",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        }
                                      />
                                    </div>
                                  </>
                                )}

                                {/* Search component fields */}
                                {component.id === "search" && (
                                  <>
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Placeholder Text
                                      </Label>
                                      <Input
                                        value={
                                          component.placeholder || "Search..."
                                        }
                                        onChange={(e) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "placeholder",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        }
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Button Text
                                      </Label>
                                      <Input
                                        value={component.buttonText || "Search"}
                                        onChange={(e) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "buttonText",
                                            e.target.value
                                          )
                                        }
                                        className={
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        }
                                      />
                                    </div>
                                  </>
                                )}

                                {/* Image upload for image component */}
                                {component.id === "image" && (
                                  <div className="space-y-2">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Upload Image
                                    </Label>
                                    <div className="flex flex-col gap-2">
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                          handleImageUpload(editingComponent, e)
                                        }
                                        className={
                                          isDarkMode
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : ""
                                        }
                                      />
                                      {component.imageUrl && (
                                        <div className="relative h-40 mt-2 border rounded">
                                          <img
                                            src={
                                              component.imageUrl ||
                                              "/placeholder.svg"
                                            }
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                          />
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={() =>
                                              handleStyleChange(
                                                editingComponent,
                                                "imageUrl",
                                                ""
                                              )
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Gallery specific fields */}
                                {component.id === "gallery" && (
                                  <div className="space-y-4">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Gallery Images
                                    </Label>
                                    {(
                                      component.galleryImages ||
                                      Array(6).fill({})
                                    ).map((img, i) => (
                                      <div
                                        key={i}
                                        className={cn(
                                          "border rounded p-3 space-y-3",
                                          isDarkMode ? "border-gray-700" : ""
                                        )}
                                      >
                                        <div className="flex justify-between items-center">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Image {i + 1}
                                          </Label>
                                        </div>
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onload = (event) => {
                                                const newGalleryImages = [
                                                  ...(component.galleryImages ||
                                                    Array(6).fill({})),
                                                ];
                                                newGalleryImages[i] = {
                                                  ...newGalleryImages[i],
                                                  url: event.target.result,
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "galleryImages",
                                                  newGalleryImages
                                                );
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        />
                                        {img.url && (
                                          <div className="relative h-20 mt-2 border rounded">
                                            <img
                                              src={
                                                img.url || "/placeholder.svg"
                                              }
                                              alt={`Gallery ${i + 1}`}
                                              className="h-full w-full object-cover"
                                            />
                                            <Button
                                              variant="destructive"
                                              size="sm"
                                              className="absolute top-2 right-2"
                                              onClick={() => {
                                                const newGalleryImages = [
                                                  ...(component.galleryImages ||
                                                    Array(6).fill({})),
                                                ];
                                                newGalleryImages[i] = {
                                                  ...newGalleryImages[i],
                                                  url: "",
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "galleryImages",
                                                  newGalleryImages
                                                );
                                              }}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        )}
                                        <div className="space-y-2">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Link to Page
                                          </Label>
                                          <Select
                                            value={img.link || "none"}
                                            onValueChange={(value) => {
                                              const newGalleryImages = [
                                                ...(component.galleryImages ||
                                                  Array(6).fill({})),
                                              ];
                                              newGalleryImages[i] = {
                                                ...newGalleryImages[i],
                                                link: value,
                                              };
                                              handleStyleChange(
                                                editingComponent,
                                                "galleryImages",
                                                newGalleryImages
                                              );
                                            }}
                                          >
                                            <SelectTrigger
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              }
                                            >
                                              <SelectValue placeholder="Select a page" />
                                            </SelectTrigger>
                                            <SelectContent
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-800 text-white border-gray-700"
                                                  : ""
                                              }
                                            >
                                              <SelectItem value="none">
                                                No link
                                              </SelectItem>
                                              <SelectItem value="external">
                                                External URL
                                              </SelectItem>
                                              {pages.map((page, pageIndex) => (
                                                <SelectItem
                                                  key={pageIndex}
                                                  value={page.name}
                                                >
                                                  {page.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        {img.link === "external" && (
                                          <div className="space-y-2">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              External URL
                                            </Label>
                                            <Input
                                              type="url"
                                              placeholder="https://example.com"
                                              value={img.externalUrl || ""}
                                              onChange={(e) => {
                                                const newGalleryImages = [
                                                  ...(component.galleryImages ||
                                                    Array(6).fill({})),
                                                ];
                                                newGalleryImages[i] = {
                                                  ...newGalleryImages[i],
                                                  externalUrl: e.target.value,
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "galleryImages",
                                                  newGalleryImages
                                                );
                                              }}
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              }
                                            />
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Carousel specific fields */}
                                {component.id === "carousel" && (
                                  <div className="space-y-4">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Carousel Slides
                                    </Label>
                                    {(
                                      component.carouselImages ||
                                      Array(3).fill({})
                                    ).map((slide, i) => (
                                      <div
                                        key={i}
                                        className={cn(
                                          "border rounded p-3 space-y-3",
                                          isDarkMode ? "border-gray-700" : ""
                                        )}
                                      >
                                        <div className="flex justify-between items-center">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Slide {i + 1}
                                          </Label>
                                        </div>
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                              const reader = new FileReader();
                                              reader.onload = (event) => {
                                                const newCarouselImages = [
                                                  ...(component.carouselImages ||
                                                    Array(3).fill({})),
                                                ];
                                                newCarouselImages[i] = {
                                                  ...newCarouselImages[i],
                                                  url: event.target.result,
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "carouselImages",
                                                  newCarouselImages
                                                );
                                              };
                                              reader.readAsDataURL(file);
                                            }
                                          }}
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        />
                                        {slide.url && (
                                          <div className="relative h-20 mt-2 border rounded">
                                            <img
                                              src={
                                                slide.url || "/placeholder.svg"
                                              }
                                              alt={`Slide ${i + 1}`}
                                              className="h-full w-full object-cover"
                                            />
                                            <Button
                                              variant="destructive"
                                              size="sm"
                                              className="absolute top-2 right-2"
                                              onClick={() => {
                                                const newCarouselImages = [
                                                  ...(component.carouselImages ||
                                                    Array(3).fill({})),
                                                ];
                                                newCarouselImages[i] = {
                                                  ...newCarouselImages[i],
                                                  url: "",
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "carouselImages",
                                                  newCarouselImages
                                                );
                                              }}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        )}
                                        <div className="space-y-2">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Caption
                                          </Label>
                                          <Input
                                            value={
                                              slide.caption || `Slide ${i + 1}`
                                            }
                                            onChange={(e) => {
                                              const newCarouselImages = [
                                                ...(component.carouselImages ||
                                                  Array(3).fill({})),
                                              ];
                                              newCarouselImages[i] = {
                                                ...newCarouselImages[i],
                                                caption: e.target.value,
                                              };
                                              handleStyleChange(
                                                editingComponent,
                                                "carouselImages",
                                                newCarouselImages
                                              );
                                            }}
                                            className={
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            }
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Pricing specific fields */}
                                {component.id === "pricing" && (
                                  <div className="space-y-4">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Pricing Plans
                                    </Label>
                                    {(component.plans || Array(3).fill({})).map(
                                      (plan, i) => (
                                        <div
                                          key={i}
                                          className={cn(
                                            "border rounded p-3 space-y-3",
                                            isDarkMode ? "border-gray-700" : ""
                                          )}
                                        >
                                          <div className="flex justify-between items-center">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              Plan {i + 1}
                                            </Label>
                                          </div>
                                          <div className="space-y-2">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              Plan Name
                                            </Label>
                                            <Input
                                              value={
                                                plan.name || `Plan ${i + 1}`
                                              }
                                              onChange={(e) => {
                                                const newPlans = [
                                                  ...(component.plans ||
                                                    Array(3).fill({})),
                                                ];
                                                newPlans[i] = {
                                                  ...newPlans[i],
                                                  name: e.target.value,
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "plans",
                                                  newPlans
                                                );
                                              }}
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              }
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              Price
                                            </Label>
                                            <Input
                                              value={plan.price || "$9.99"}
                                              onChange={(e) => {
                                                const newPlans = [
                                                  ...(component.plans ||
                                                    Array(3).fill({})),
                                                ];
                                                newPlans[i] = {
                                                  ...newPlans[i],
                                                  price: e.target.value,
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "plans",
                                                  newPlans
                                                );
                                              }}
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              }
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              Features (one per line)
                                            </Label>
                                            <Textarea
                                              value={(
                                                plan.features || [
                                                  "Feature 1",
                                                  "Feature 2",
                                                  "Feature 3",
                                                ]
                                              ).join("\n")}
                                              onChange={(e) => {
                                                const newPlans = [
                                                  ...(component.plans ||
                                                    Array(3).fill({})),
                                                ];
                                                newPlans[i] = {
                                                  ...newPlans[i],
                                                  features: e.target.value
                                                    .split("\n")
                                                    .filter(
                                                      (f) => f.trim() !== ""
                                                    ),
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "plans",
                                                  newPlans
                                                );
                                              }}
                                              className={cn(
                                                "min-h-[100px]",
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              )}
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}

                                {/* Navigation specific fields */}
                                {component.id === "navigation" && (
                                  <div className="space-y-4">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Navigation Links
                                    </Label>
                                    {component.content
                                      .split("|")
                                      .map((item, i) => (
                                        <div key={i} className="space-y-2">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Link for "{item.trim()}"
                                          </Label>
                                          <Select
                                            value={
                                              (component.navLinks &&
                                                component.navLinks[i]) ||
                                              "none"
                                            }
                                            onValueChange={(value) => {
                                              const navLinks = [
                                                ...(component.navLinks ||
                                                  Array(
                                                    component.content.split("|")
                                                      .length
                                                  ).fill("none")),
                                              ];
                                              navLinks[i] = value;
                                              handleStyleChange(
                                                editingComponent,
                                                "navLinks",
                                                navLinks
                                              );
                                            }}
                                          >
                                            <SelectTrigger
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              }
                                            >
                                              <SelectValue placeholder="Select a page" />
                                            </SelectTrigger>
                                            <SelectContent
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-800 text-white border-gray-700"
                                                  : ""
                                              }
                                            >
                                              <SelectItem value="none">
                                                No link
                                              </SelectItem>
                                              {pages.map((page, pageIndex) => (
                                                <SelectItem
                                                  key={pageIndex}
                                                  value={page.name}
                                                >
                                                  {page.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      ))}
                                  </div>
                                )}

                                {/* Button link options */}
                                {(component.id === "button" ||
                                  component.id === "hero") && (
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Link to Page
                                      </Label>
                                      <Select
                                        value={component.link || "none"}
                                        onValueChange={(value) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "link",
                                            value
                                          )
                                        }
                                      >
                                        <SelectTrigger
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        >
                                          <SelectValue placeholder="Select a page" />
                                        </SelectTrigger>
                                        <SelectContent
                                          className={
                                            isDarkMode
                                              ? "bg-gray-800 text-white border-gray-700"
                                              : ""
                                          }
                                        >
                                          <SelectItem value="none">
                                            No link
                                          </SelectItem>
                                          {pages.map((page, pageIndex) => (
                                            <SelectItem
                                              key={pageIndex}
                                              value={page.name}
                                            >
                                              {page.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Button Action
                                      </Label>
                                      <Select
                                        value={component.action || "navigate"}
                                        onValueChange={(value) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "action",
                                            value
                                          )
                                        }
                                      >
                                        <SelectTrigger
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        >
                                          <SelectValue placeholder="Select action" />
                                        </SelectTrigger>
                                        <SelectContent
                                          className={
                                            isDarkMode
                                              ? "bg-gray-800 text-white border-gray-700"
                                              : ""
                                          }
                                        >
                                          <SelectItem value="navigate">
                                            Navigate to Page
                                          </SelectItem>
                                          <SelectItem value="submit">
                                            Submit Form
                                          </SelectItem>
                                          <SelectItem value="modal">
                                            Open Modal
                                          </SelectItem>
                                          <SelectItem value="external">
                                            External URL
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {component.action === "external" && (
                                      <div className="space-y-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          External URL
                                        </Label>
                                        <Input
                                          type="url"
                                          placeholder="https://example.com"
                                          value={component.externalUrl || ""}
                                          onChange={(e) =>
                                            handleStyleChange(
                                              editingComponent,
                                              "externalUrl",
                                              e.target.value
                                            )
                                          }
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Image link options */}
                                {component.id === "image" && (
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Link to Page
                                      </Label>
                                      <Select
                                        value={component.link || "none"}
                                        onValueChange={(value) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "link",
                                            value
                                          )
                                        }
                                      >
                                        <SelectTrigger
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        >
                                          <SelectValue placeholder="Select a page" />
                                        </SelectTrigger>
                                        <SelectContent
                                          className={
                                            isDarkMode
                                              ? "bg-gray-800 text-white border-gray-700"
                                              : ""
                                          }
                                        >
                                          <SelectItem value="none">
                                            No link
                                          </SelectItem>
                                          <SelectItem value="external">
                                            External URL
                                          </SelectItem>
                                          {pages.map((page, pageIndex) => (
                                            <SelectItem
                                              key={pageIndex}
                                              value={page.name}
                                            >
                                              {page.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    {component.link === "external" && (
                                      <div className="space-y-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          External URL
                                        </Label>
                                        <Input
                                          type="url"
                                          placeholder="https://example.com"
                                          value={component.externalUrl || ""}
                                          onChange={(e) =>
                                            handleStyleChange(
                                              editingComponent,
                                              "externalUrl",
                                              e.target.value
                                            )
                                          }
                                          className={
                                            isDarkMode
                                              ? "bg-gray-700 text-white border-gray-600"
                                              : ""
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}
                                {component.id === "custom" && (
                                  <div className="space-y-4">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Custom Elements
                                    </Label>
                                    {(component.elements || []).map(
                                      (element, idx) => (
                                        <div
                                          key={idx}
                                          className={cn(
                                            "border rounded p-3 space-y-3",
                                            isDarkMode ? "border-gray-700" : ""
                                          )}
                                        >
                                          <div className="flex justify-between items-center">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              {element.type === "text"
                                                ? "Text Element"
                                                : "Button Element"}{" "}
                                              {idx + 1}
                                            </Label>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => {
                                                const newElements = [
                                                  ...(component.elements || []),
                                                ];
                                                newElements.splice(idx, 1);
                                                handleStyleChange(
                                                  editingComponent,
                                                  "elements",
                                                  newElements
                                                );
                                              }}
                                              className={
                                                isDarkMode
                                                  ? "text-white hover:bg-gray-700"
                                                  : ""
                                              }
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>

                                          <div className="space-y-2">
                                            <Label
                                              className={
                                                isDarkMode ? "text-white" : ""
                                              }
                                            >
                                              Content
                                            </Label>
                                            <Input
                                              value={element.content || ""}
                                              onChange={(e) => {
                                                const newElements = [
                                                  ...(component.elements || []),
                                                ];
                                                newElements[idx] = {
                                                  ...newElements[idx],
                                                  content: e.target.value,
                                                };
                                                handleStyleChange(
                                                  editingComponent,
                                                  "elements",
                                                  newElements
                                                );
                                              }}
                                              className={
                                                isDarkMode
                                                  ? "bg-gray-700 text-white border-gray-600"
                                                  : ""
                                              }
                                            />
                                          </div>

                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-2">
                                              <Label
                                                className={
                                                  isDarkMode ? "text-white" : ""
                                                }
                                              >
                                                X Position (px)
                                              </Label>
                                              <Input
                                                type="number"
                                                value={element.x || 0}
                                                onChange={(e) => {
                                                  const newElements = [
                                                    ...(component.elements ||
                                                      []),
                                                  ];
                                                  newElements[idx] = {
                                                    ...newElements[idx],
                                                    x:
                                                      Number.parseInt(
                                                        e.target.value
                                                      ) || 0,
                                                  };
                                                  handleStyleChange(
                                                    editingComponent,
                                                    "elements",
                                                    newElements
                                                  );
                                                }}
                                                className={
                                                  isDarkMode
                                                    ? "bg-gray-700 text-white border-gray-600"
                                                    : ""
                                                }
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label
                                                className={
                                                  isDarkMode ? "text-white" : ""
                                                }
                                              >
                                                Y Position (px)
                                              </Label>
                                              <Input
                                                type="number"
                                                value={element.y || 0}
                                                onChange={(e) => {
                                                  const newElements = [
                                                    ...(component.elements ||
                                                      []),
                                                  ];
                                                  newElements[idx] = {
                                                    ...newElements[idx],
                                                    y:
                                                      Number.parseInt(
                                                        e.target.value
                                                      ) || 0,
                                                  };
                                                  handleStyleChange(
                                                    editingComponent,
                                                    "elements",
                                                    newElements
                                                  );
                                                }}
                                                className={
                                                  isDarkMode
                                                    ? "bg-gray-700 text-white border-gray-600"
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>

                                          <div className="grid grid-cols-2 gap-2">
                                            <div className="space-y-2">
                                              <Label
                                                className={
                                                  isDarkMode ? "text-white" : ""
                                                }
                                              >
                                                Width (px)
                                              </Label>
                                              <Input
                                                type="number"
                                                value={element.width || 100}
                                                onChange={(e) => {
                                                  const newElements = [
                                                    ...(component.elements ||
                                                      []),
                                                  ];
                                                  newElements[idx] = {
                                                    ...newElements[idx],
                                                    width:
                                                      Number.parseInt(
                                                        e.target.value
                                                      ) || 100,
                                                  };
                                                  handleStyleChange(
                                                    editingComponent,
                                                    "elements",
                                                    newElements
                                                  );
                                                }}
                                                className={
                                                  isDarkMode
                                                    ? "bg-gray-700 text-white border-gray-600"
                                                    : ""
                                                }
                                              />
                                            </div>
                                            <div className="space-y-2">
                                              <Label
                                                className={
                                                  isDarkMode ? "text-white" : ""
                                                }
                                              >
                                                Height (px)
                                              </Label>
                                              <Input
                                                type="number"
                                                value={element.height || 40}
                                                onChange={(e) => {
                                                  const newElements = [
                                                    ...(component.elements ||
                                                      []),
                                                  ];
                                                  newElements[idx] = {
                                                    ...newElements[idx],
                                                    height:
                                                      Number.parseInt(
                                                        e.target.value
                                                      ) || 40,
                                                  };
                                                  handleStyleChange(
                                                    editingComponent,
                                                    "elements",
                                                    newElements
                                                  );
                                                }}
                                                className={
                                                  isDarkMode
                                                    ? "bg-gray-700 text-white border-gray-600"
                                                    : ""
                                                }
                                              />
                                            </div>
                                          </div>

                                          {element.type === "text" && (
                                            <>
                                              <div className="space-y-2">
                                                <Label
                                                  className={
                                                    isDarkMode
                                                      ? "text-white"
                                                      : ""
                                                  }
                                                >
                                                  Font Size (px)
                                                </Label>
                                                <Input
                                                  type="number"
                                                  value={
                                                    element.fontSize ||
                                                    component.fontSize
                                                  }
                                                  onChange={(e) => {
                                                    const newElements = [
                                                      ...(component.elements ||
                                                        []),
                                                    ];
                                                    newElements[idx] = {
                                                      ...newElements[idx],
                                                      fontSize:
                                                        Number.parseInt(
                                                          e.target.value
                                                        ) || 16,
                                                    };
                                                    handleStyleChange(
                                                      editingComponent,
                                                      "elements",
                                                      newElements
                                                    );
                                                  }}
                                                  className={
                                                    isDarkMode
                                                      ? "bg-gray-700 text-white border-gray-600"
                                                      : ""
                                                  }
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <Label
                                                  className={
                                                    isDarkMode
                                                      ? "text-white"
                                                      : ""
                                                  }
                                                >
                                                  Text Color
                                                </Label>
                                                <div className="flex gap-2">
                                                  <Input
                                                    type="color"
                                                    value={
                                                      element.color ||
                                                      component.color
                                                    }
                                                    onChange={(e) => {
                                                      const newElements = [
                                                        ...(component.elements ||
                                                          []),
                                                      ];
                                                      newElements[idx] = {
                                                        ...newElements[idx],
                                                        color: e.target.value,
                                                      };
                                                      handleStyleChange(
                                                        editingComponent,
                                                        "elements",
                                                        newElements
                                                      );
                                                    }}
                                                    className="w-12 h-8 p-1"
                                                  />
                                                  <Input
                                                    type="text"
                                                    value={
                                                      element.color ||
                                                      component.color
                                                    }
                                                    onChange={(e) => {
                                                      const newElements = [
                                                        ...(component.elements ||
                                                          []),
                                                      ];
                                                      newElements[idx] = {
                                                        ...newElements[idx],
                                                        color: e.target.value,
                                                      };
                                                      handleStyleChange(
                                                        editingComponent,
                                                        "elements",
                                                        newElements
                                                      );
                                                    }}
                                                    className={cn(
                                                      "flex-1",
                                                      isDarkMode
                                                        ? "bg-gray-700 text-white border-gray-600"
                                                        : ""
                                                    )}
                                                  />
                                                </div>
                                              </div>
                                            </>
                                          )}

                                          {element.type === "button" && (
                                            <>
                                              <div className="space-y-2">
                                                <Label
                                                  className={
                                                    isDarkMode
                                                      ? "text-white"
                                                      : ""
                                                  }
                                                >
                                                  Button Color
                                                </Label>
                                                <div className="flex gap-2">
                                                  <Input
                                                    type="color"
                                                    value={
                                                      element.backgroundColor ||
                                                      "#3B82F6"
                                                    }
                                                    onChange={(e) => {
                                                      const newElements = [
                                                        ...(component.elements ||
                                                          []),
                                                      ];
                                                      newElements[idx] = {
                                                        ...newElements[idx],
                                                        backgroundColor:
                                                          e.target.value,
                                                      };
                                                      handleStyleChange(
                                                        editingComponent,
                                                        "elements",
                                                        newElements
                                                      );
                                                    }}
                                                    className="w-12 h-8 p-1"
                                                  />
                                                  <Input
                                                    type="text"
                                                    value={
                                                      element.backgroundColor ||
                                                      "#3B82F6"
                                                    }
                                                    onChange={(e) => {
                                                      const newElements = [
                                                        ...(component.elements ||
                                                          []),
                                                      ];
                                                      newElements[idx] = {
                                                        ...newElements[idx],
                                                        backgroundColor:
                                                          e.target.value,
                                                      };
                                                      handleStyleChange(
                                                        editingComponent,
                                                        "elements",
                                                        newElements
                                                      );
                                                    }}
                                                    className={cn(
                                                      "flex-1",
                                                      isDarkMode
                                                        ? "bg-gray-700 text-white border-gray-600"
                                                        : ""
                                                    )}
                                                  />
                                                </div>
                                              </div>
                                              <div className="space-y-2">
                                                <Label
                                                  className={
                                                    isDarkMode
                                                      ? "text-white"
                                                      : ""
                                                  }
                                                >
                                                  Text Color
                                                </Label>
                                                <div className="flex gap-2">
                                                  <Input
                                                    type="color"
                                                    value={
                                                      element.color || "#FFFFFF"
                                                    }
                                                    onChange={(e) => {
                                                      const newElements = [
                                                        ...(component.elements ||
                                                          []),
                                                      ];
                                                      newElements[idx] = {
                                                        ...newElements[idx],
                                                        color: e.target.value,
                                                      };
                                                      handleStyleChange(
                                                        editingComponent,
                                                        "elements",
                                                        newElements
                                                      );
                                                    }}
                                                    className="w-12 h-8 p-1"
                                                  />
                                                  <Input
                                                    type="text"
                                                    value={
                                                      element.color || "#FFFFFF"
                                                    }
                                                    onChange={(e) => {
                                                      const newElements = [
                                                        ...(component.elements ||
                                                          []),
                                                      ];
                                                      newElements[idx] = {
                                                        ...newElements[idx],
                                                        color: e.target.value,
                                                      };
                                                      handleStyleChange(
                                                        editingComponent,
                                                        "elements",
                                                        newElements
                                                      );
                                                    }}
                                                    className={cn(
                                                      "flex-1",
                                                      isDarkMode
                                                        ? "bg-gray-700 text-white border-gray-600"
                                                        : ""
                                                    )}
                                                  />
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      )
                                    )}

                                    <div className="flex gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newElements = [
                                            ...(component.elements || []),
                                          ];
                                          newElements.push({
                                            id: `text${Date.now()}`,
                                            type: "text",
                                            content: "New Text",
                                            x: 10,
                                            y: 10 + newElements.length * 50,
                                            width: 100,
                                            height: 40,
                                            fontSize: 16,
                                            color: "#000000",
                                          });
                                          handleStyleChange(
                                            editingComponent,
                                            "elements",
                                            newElements
                                          );
                                        }}
                                        className={
                                          isDarkMode
                                            ? "border-gray-700 text-white hover:bg-gray-700"
                                            : ""
                                        }
                                      >
                                        Add Text
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const newElements = [
                                            ...(component.elements || []),
                                          ];
                                          newElements.push({
                                            id: `button${Date.now()}`,
                                            type: "button",
                                            content: "New Button",
                                            x: 10,
                                            y: 10 + newElements.length * 50,
                                            width: 120,
                                            height: 40,
                                            backgroundColor: "#3B82F6",
                                            color: "#FFFFFF",
                                          });
                                          handleStyleChange(
                                            editingComponent,
                                            "elements",
                                            newElements
                                          );
                                        }}
                                        className={
                                          isDarkMode
                                            ? "border-gray-700 text-white hover:bg-gray-700"
                                            : ""
                                        }
                                      >
                                        Add Button
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem
                            value="style"
                            className={isDarkMode ? "border-gray-700" : ""}
                          >
                            <AccordionTrigger
                              className={
                                isDarkMode
                                  ? "text-white hover:no-underline"
                                  : ""
                              }
                            >
                              Typography
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label
                                    className={isDarkMode ? "text-white" : ""}
                                  >
                                    Font Size
                                  </Label>
                                  <div className="flex items-center gap-2">
                                    <Slider
                                      min={8}
                                      max={72}
                                      step={1}
                                      value={[
                                        pages[currentPage].components[
                                          editingComponent
                                        ].fontSize,
                                      ]}
                                      onValueChange={(value) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "fontSize",
                                          value[0]
                                        )
                                      }
                                      className="flex-1"
                                    />
                                    <span
                                      className={cn(
                                        "w-8 text-center",
                                        isDarkMode ? "text-white" : ""
                                      )}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].fontSize
                                      }
                                      px
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    className={isDarkMode ? "text-white" : ""}
                                  >
                                    Font Family
                                  </Label>
                                  <Select
                                    value={
                                      pages[currentPage].components[
                                        editingComponent
                                      ].fontFamily
                                    }
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "fontFamily",
                                        value
                                      )
                                    }
                                  >
                                    <SelectTrigger
                                      className={
                                        isDarkMode
                                          ? "bg-gray-700 text-white border-gray-600"
                                          : ""
                                      }
                                    >
                                      <SelectValue>
                                        {
                                          pages[currentPage].components[
                                            editingComponent
                                          ].fontFamily
                                        }
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent
                                      className={
                                        isDarkMode
                                          ? "bg-gray-800 text-white border-gray-700"
                                          : ""
                                      }
                                    >
                                      {fontOptions.map((font) => (
                                        <SelectItem key={font} value={font}>
                                          {font}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    className={isDarkMode ? "text-white" : ""}
                                  >
                                    Text Alignment
                                  </Label>
                                  <div
                                    className={cn(
                                      "flex border rounded-md",
                                      isDarkMode ? "border-gray-700" : ""
                                    )}
                                  >
                                    <Button
                                      type="button"
                                      variant={
                                        pages[currentPage]?.components[
                                          editingComponent
                                        ]?.textAlign === "left" ||
                                        !pages[currentPage]?.components[
                                          editingComponent
                                        ]?.textAlign
                                          ? "secondary"
                                          : "ghost"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleStyleChange(
                                          editingComponent,
                                          "textAlign",
                                          "left"
                                        )
                                      }
                                      className={cn(
                                        "flex-1 rounded-r-none",
                                        isDarkMode
                                          ? "text-white hover:bg-gray-700"
                                          : ""
                                      )}
                                    >
                                      Left
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={
                                        pages[currentPage]?.components[
                                          editingComponent
                                        ]?.textAlign === "center"
                                          ? "secondary"
                                          : "ghost"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleStyleChange(
                                          editingComponent,
                                          "textAlign",
                                          "center"
                                        )
                                      }
                                      className={cn(
                                        "flex-1 rounded-none",
                                        isDarkMode
                                          ? "text-white hover:bg-gray-700"
                                          : ""
                                      )}
                                    >
                                      Center
                                    </Button>
                                    <Button
                                      type="button"
                                      variant={
                                        pages[currentPage]?.components[
                                          editingComponent
                                        ]?.textAlign === "right"
                                          ? "secondary"
                                          : "ghost"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleStyleChange(
                                          editingComponent,
                                          "textAlign",
                                          "right"
                                        )
                                      }
                                      className={cn(
                                        "flex-1 rounded-l-none",
                                        isDarkMode
                                          ? "text-white hover:bg-gray-700"
                                          : ""
                                      )}
                                    >
                                      Right
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem
                            value="colors"
                            className={isDarkMode ? "border-gray-700" : ""}
                          >
                            <AccordionTrigger
                              className={
                                isDarkMode
                                  ? "text-white hover:no-underline"
                                  : ""
                              }
                            >
                              Colors
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label
                                    className={isDarkMode ? "text-white" : ""}
                                  >
                                    Text Color
                                  </Label>
                                  <div className="grid grid-cols-6 gap-2 mb-2">
                                    {colorPresets.map((color) => (
                                      <div
                                        key={color}
                                        className={cn(
                                          "w-full aspect-square rounded-md cursor-pointer border",
                                          pages[currentPage].components[
                                            editingComponent
                                          ].color === color
                                            ? "ring-2 ring-primary"
                                            : "",
                                          isDarkMode ? "border-gray-700" : ""
                                        )}
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                          handleStyleChange(
                                            editingComponent,
                                            "color",
                                            color
                                          )
                                        }
                                      />
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <Input
                                      type="color"
                                      value={
                                        pages[currentPage].components[
                                          editingComponent
                                        ].color
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "color",
                                          e.target.value
                                        )
                                      }
                                      className="w-12 h-8 p-1"
                                    />
                                    <Input
                                      type="text"
                                      value={
                                        pages[currentPage].components[
                                          editingComponent
                                        ].color
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "color",
                                          e.target.value
                                        )
                                      }
                                      className={cn(
                                        "flex-1",
                                        isDarkMode
                                          ? "bg-gray-700 text-white border-gray-600"
                                          : ""
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    className={isDarkMode ? "text-white" : ""}
                                  >
                                    Background Color
                                  </Label>
                                  <div className="grid grid-cols-6 gap-2 mb-2">
                                    {colorPresets.map((color) => (
                                      <div
                                        key={color}
                                        className={cn(
                                          "w-full aspect-square rounded-md cursor-pointer border",
                                          pages[currentPage].components[
                                            editingComponent
                                          ].backgroundColor === color
                                            ? "ring-2 ring-primary"
                                            : "",
                                          isDarkMode ? "border-gray-700" : ""
                                        )}
                                        style={{ backgroundColor: color }}
                                        onClick={() =>
                                          handleStyleChange(
                                            editingComponent,
                                            "backgroundColor",
                                            color
                                          )
                                        }
                                      />
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <Input
                                      type="color"
                                      value={
                                        pages[currentPage].components[
                                          editingComponent
                                        ].backgroundColor
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "backgroundColor",
                                          e.target.value
                                        )
                                      }
                                      className="w-12 h-8 p-1"
                                    />
                                    <Input
                                      type="text"
                                      value={
                                        pages[currentPage].components[
                                          editingComponent
                                        ].backgroundColor
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "backgroundColor",
                                          e.target.value
                                        )
                                      }
                                      className={cn(
                                        "flex-1",
                                        isDarkMode
                                          ? "bg-gray-700 text-white border-gray-600"
                                          : ""
                                      )}
                                    />
                                  </div>
                                </div>
                                {component.id === "pricing" && (
                                  <>
                                    <div
                                      className={cn(
                                        "space-y-2 mt-4 pt-4 border-t",
                                        isDarkMode ? "border-gray-700" : ""
                                      )}
                                    >
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Card Specific Colors
                                      </Label>

                                      <div className="space-y-2 mt-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Card Background
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.cardBackgroundColor ||
                                              component.backgroundColor
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "cardBackgroundColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.cardBackgroundColor ||
                                              component.backgroundColor
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "cardBackgroundColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2 mt-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Title Color
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.textColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "textColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.textColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "textColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2 mt-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Price Color
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.priceColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "priceColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.priceColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "priceColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2 mt-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Feature Text Color
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.featureColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "featureColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.featureColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "featureColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2 mt-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Button Background
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.buttonBackgroundColor ||
                                              "#ffffff"
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "buttonBackgroundColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.buttonBackgroundColor ||
                                              "#ffffff"
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "buttonBackgroundColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>

                                      <div className="space-y-2 mt-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Button Text Color
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.buttonTextColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "buttonTextColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.buttonTextColor ||
                                              component.color
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "buttonTextColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem
                            value="dimensions"
                            className={isDarkMode ? "border-gray-700" : ""}
                          >
                            <AccordionTrigger
                              className={
                                isDarkMode
                                  ? "text-white hover:no-underline"
                                  : ""
                              }
                            >
                              Dimensions
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Width (columns)
                                    </Label>
                                    <span
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].width
                                      }{" "}
                                      / 12
                                    </span>
                                  </div>
                                  <Slider
                                    min={1}
                                    max={12}
                                    step={1}
                                    value={[
                                      pages[currentPage].components[
                                        editingComponent
                                      ].width,
                                    ]}
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "width",
                                        value[0]
                                      )
                                    }
                                  />
                                </div>
                                <div className="space-y-2 mt-4">
                                  <div className="flex items-center justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Fixed Height
                                    </Label>
                                    <Switch
                                      checked={component.fixedHeight || false}
                                      onCheckedChange={(checked) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "fixedHeight",
                                          checked
                                        )
                                      }
                                    />
                                  </div>

                                  {component.fixedHeight && (
                                    <div className="space-y-2 mt-2">
                                      <div className="flex justify-between">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Height (px)
                                        </Label>
                                        <span
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          {component.heightValue || 100}px
                                        </span>
                                      </div>
                                      <Slider
                                        min={50}
                                        max={800}
                                        step={10}
                                        value={[component.heightValue || 100]}
                                        onValueChange={(value) =>
                                          handleStyleChange(
                                            editingComponent,
                                            "heightValue",
                                            value[0]
                                          )
                                        }
                                      />
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Height (rows)
                                    </Label>
                                    <span
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].height
                                      }
                                    </span>
                                  </div>
                                  <Slider
                                    min={1}
                                    max={6}
                                    step={1}
                                    value={[
                                      pages[currentPage].components[
                                        editingComponent
                                      ].height,
                                    ]}
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "height",
                                        value[0]
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem
                            value="spacing"
                            className={isDarkMode ? "border-gray-700" : ""}
                          >
                            <AccordionTrigger
                              className={
                                isDarkMode
                                  ? "text-white hover:no-underline"
                                  : ""
                              }
                            >
                              Spacing
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Padding
                                    </Label>
                                    <span
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].padding
                                      }
                                      px
                                    </span>
                                  </div>
                                  <Slider
                                    min={0}
                                    max={64}
                                    step={4}
                                    value={[
                                      pages[currentPage].components[
                                        editingComponent
                                      ].padding,
                                    ]}
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "padding",
                                        value[0]
                                      )
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Margin
                                    </Label>
                                    <span
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].margin
                                      }
                                      px
                                    </span>
                                  </div>
                                  <Slider
                                    min={0}
                                    max={64}
                                    step={4}
                                    value={[
                                      pages[currentPage].components[
                                        editingComponent
                                      ].margin,
                                    ]}
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "margin",
                                        value[0]
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem
                            value="border"
                            className={isDarkMode ? "border-gray-700" : ""}
                          >
                            <AccordionTrigger
                              className={
                                isDarkMode
                                  ? "text-white hover:no-underline"
                                  : ""
                              }
                            >
                              Border
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Border Radius
                                    </Label>
                                    <span
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].borderRadius
                                      }
                                      px
                                    </span>
                                  </div>
                                  <Slider
                                    min={0}
                                    max={24}
                                    step={1}
                                    value={[
                                      pages[currentPage].components[
                                        editingComponent
                                      ].borderRadius,
                                    ]}
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "borderRadius",
                                        value[0]
                                      )
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <Label
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      Border Width
                                    </Label>
                                    <span
                                      className={isDarkMode ? "text-white" : ""}
                                    >
                                      {
                                        pages[currentPage].components[
                                          editingComponent
                                        ].borderWidth
                                      }
                                      px
                                    </span>
                                  </div>
                                  <Slider
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={[
                                      pages[currentPage].components[
                                        editingComponent
                                      ].borderWidth,
                                    ]}
                                    onValueChange={(value) =>
                                      handleStyleChange(
                                        editingComponent,
                                        "borderWidth",
                                        value[0]
                                      )
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label
                                    className={isDarkMode ? "text-white" : ""}
                                  >
                                    Border Color
                                  </Label>
                                  <div className="flex gap-2">
                                    <Input
                                      type="color"
                                      value={
                                        pages[currentPage].components[
                                          editingComponent
                                        ].borderColor
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "borderColor",
                                          e.target.value
                                        )
                                      }
                                      className="w-12 h-8 p-1"
                                    />
                                    <Input
                                      type="text"
                                      value={
                                        pages[currentPage].components[
                                          editingComponent
                                        ].borderColor
                                      }
                                      onChange={(e) =>
                                        handleStyleChange(
                                          editingComponent,
                                          "borderColor",
                                          e.target.value
                                        )
                                      }
                                      className={cn(
                                        "flex-1",
                                        isDarkMode
                                          ? "bg-gray-700 text-white border-gray-600"
                                          : ""
                                      )}
                                    />
                                  </div>
                                </div>
                                {component.id === "pricing" && (
                                  <>
                                    <div
                                      className={cn(
                                        "space-y-2 mt-4 pt-4 border-t",
                                        isDarkMode ? "border-gray-700" : ""
                                      )}
                                    >
                                      <Label
                                        className={
                                          isDarkMode ? "text-white" : ""
                                        }
                                      >
                                        Card Specific Borders
                                      </Label>

                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Card Border Radius
                                          </Label>
                                          <span
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            {component.cardBorderRadius ||
                                              component.borderRadius}
                                            px
                                          </span>
                                        </div>
                                        <Slider
                                          min={0}
                                          max={24}
                                          step={1}
                                          value={[
                                            component.cardBorderRadius ||
                                              component.borderRadius,
                                          ]}
                                          onValueChange={(value) =>
                                            handleStyleChange(
                                              editingComponent,
                                              "cardBorderRadius",
                                              value[0]
                                            )
                                          }
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <Label
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            Card Border Width
                                          </Label>
                                          <span
                                            className={
                                              isDarkMode ? "text-white" : ""
                                            }
                                          >
                                            {component.cardBorderWidth ||
                                              component.borderWidth}
                                            px
                                          </span>
                                        </div>
                                        <Slider
                                          min={0}
                                          max={10}
                                          step={1}
                                          value={[
                                            component.cardBorderWidth ||
                                              component.borderWidth,
                                          ]}
                                          onValueChange={(value) =>
                                            handleStyleChange(
                                              editingComponent,
                                              "cardBorderWidth",
                                              value[0]
                                            )
                                          }
                                        />
                                      </div>

                                      <div className="space-y-2">
                                        <Label
                                          className={
                                            isDarkMode ? "text-white" : ""
                                          }
                                        >
                                          Card Border Color
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            type="color"
                                            value={
                                              component.cardBorderColor ||
                                              component.borderColor
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "cardBorderColor",
                                                e.target.value
                                              )
                                            }
                                            className="w-12 h-8 p-1"
                                          />
                                          <Input
                                            type="text"
                                            value={
                                              component.cardBorderColor ||
                                              component.borderColor
                                            }
                                            onChange={(e) =>
                                              handleStyleChange(
                                                editingComponent,
                                                "cardBorderColor",
                                                e.target.value
                                              )
                                            }
                                            className={cn(
                                              "flex-1",
                                              isDarkMode
                                                ? "bg-gray-700 text-white border-gray-600"
                                                : ""
                                            )}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                        <div className="mt-4 flex justify-end">
                          <Button
                            onClick={handleSaveEdit}
                            className={
                              isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                            }
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    console.error("Error rendering properties panel:", error);
                    return (
                      <div className="p-4 text-red-500">
                        An error occurred while rendering the properties panel.
                        Please try again.
                      </div>
                    );
                  }
                })()
              ) : isPropertiesLoading ? (
                <div className="p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  <p className={cn("mt-4", isDarkMode ? "text-white" : "")}>
                    Loading properties...
                  </p>
                </div>
              ) : (
                <div
                  className={cn(
                    "p-8 flex flex-col items-center justify-center text-center h-full",
                    isDarkMode ? "text-gray-400" : "text-muted-foreground"
                  )}
                >
                  <Settings className="h-12 w-12 mb-4" />
                  <h3
                    className={cn(
                      "text-lg font-medium mb-2",
                      isDarkMode ? "text-white" : ""
                    )}
                  >
                    No component selected
                  </h3>
                  <p>Select a component to edit its properties</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
