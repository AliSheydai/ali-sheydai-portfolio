import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtworkDetail from "./pages/ArtworkDetail";
import About from "./pages/About";
import { Preloader } from "@/components/ui/preloader";

const queryClient = new QueryClient();

const App = () => {
  const [siteReady, setSiteReady] = useState(false);

  return (
    <>
      {/* Preloader: renders on top (z-9999) until priority images are loaded */}
      <Preloader onComplete={() => setSiteReady(true)} />

      {/* Site content: rendered immediately so React can start work,
          but visually hidden until preloader exits to avoid flash */}
      <div
        style={{
          opacity: siteReady ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: siteReady ? "auto" : "none",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/artwork/:slug" element={<ArtworkDetail />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
