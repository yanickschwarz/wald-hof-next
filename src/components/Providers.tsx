"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BestellModalProvider } from "@/components/BestellModal";
import { useLenis } from "@/hooks/useLenis";
import ScrollToTop from "@/components/ScrollToTop";
import SkipLink from "@/components/editorial/SkipLink";
import EasterEgg from "@/components/EasterEgg";
import { useState } from "react";

/**
 * Bündelt alle Client-Provider, die App.tsx im Vite-Setup verwendet hat.
 * Wird im Root-Layout (src/app/layout.tsx) genau einmal eingehängt.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // QueryClient nur einmal pro Session erzeugen (Next-15-Empfehlung)
  const [queryClient] = useState(() => new QueryClient());

  // Lenis Smooth-Scroll (respektiert prefers-reduced-motion)
  useLenis();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BestellModalProvider>
          <ScrollToTop />
          <SkipLink />
          <EasterEgg />
          {children}
        </BestellModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
