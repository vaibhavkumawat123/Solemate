import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange";
import AppContent from "./components/AppContent";
import { Theme } from "@radix-ui/themes";
import ToastContainer from "./components/ui/ToastContainer";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Theme>
    <MantineProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Scroll-to-top button */}
          <ScrollToTop />
          {/* Scroll to top on route change */}
          <ScrollToTopOnRouteChange />
          {/* All pages with smooth transitions */}
          <AppContent />
          <ToastContainer /> 
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </MantineProvider>
    </Theme>
  );
};

export default App;
