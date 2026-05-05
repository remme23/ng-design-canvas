import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
import Index from "./pages/Index";

// Code-splitting: carica le sezioni secondarie solo quando servono
const Studio = lazy(() => import("./pages/Studio"));
const Partnership = lazy(() => import("./pages/Partnership"));
const Opera = lazy(() => import("./pages/Opera"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const LifeQualitySystem = lazy(() => import("./pages/LifeQualitySystem"));
const Contatti = lazy(() => import("./pages/Contatti"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-border border-t-gold animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/opera" element={<Opera />} />
              <Route path="/opera/:slug" element={<ProjectDetail />} />
              <Route path="/life-quality-system" element={<LifeQualitySystem />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
