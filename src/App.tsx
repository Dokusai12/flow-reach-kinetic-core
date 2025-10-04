import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CleanSplitLanding from "./components/CleanSplitLanding";
import ChatExperience from "./components/ChatExperience";
import MainSite from "./components/MainSite";
import MainSiteFallback from "./components/MainSiteFallback";
import ThreeTest from "./components/ThreeTest";
import SimpleThreeTest from "./components/SimpleThreeTest";
import SimpleTest from "./components/SimpleTest";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import ProcessPage from "./pages/ProcessPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/chat" element={<ChatExperience />} />
          <Route path="/test" element={<ThreeTest />} />
          <Route path="/simple" element={<SimpleThreeTest />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
