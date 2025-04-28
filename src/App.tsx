import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeminiComponent from "./components/GeminiComponent";
import Index from "./pages/Index";
import Playground from "./pages/Playground";
import NotFound from "./pages/NotFound";
import WebsiteBuilderComponent from "./components/WebsiteBuilder";
import GeminiImageAnalyzer from "./components/Image";
import AnalyticsDashboard from "./components/DashBoard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/gemini" element={<GeminiComponent />} />
          <Route path="/builder" element={<WebsiteBuilderComponent />} />
          <Route path="/image" element={<GeminiImageAnalyzer />} />
          <Route path="dashboard" element={<AnalyticsDashboard />} />
          <Route path="*" element={<NotFound />} />
        
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
