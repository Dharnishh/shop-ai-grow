
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import About from "./pages/About";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import AITools from "./pages/AITools";
import CompetitorAnalysis from "./pages/CompetitorAnalysis";
import NotFound from "./pages/NotFound";

// Import new dashboard module pages
import Schedule from "./pages/Dashboard/Schedule";
import PhotoEditing from "./pages/Dashboard/PhotoEditing";
import VideoEditing from "./pages/Dashboard/VideoEditing";
import DashboardAITools from "./pages/Dashboard/AITools";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/schedule" element={<Schedule />} />
          <Route path="/dashboard/ai-tools" element={<DashboardAITools />} />
          <Route path="/dashboard/photo-editing" element={<PhotoEditing />} />
          <Route path="/dashboard/video-editing" element={<VideoEditing />} />
          <Route path="/dashboard/competitor-analysis" element={<CompetitorAnalysis />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/competitor-analysis" element={<CompetitorAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
