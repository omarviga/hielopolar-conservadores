
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Assets from "./pages/Assets";
import Clients from "./pages/Clients";
import Repairs from "./pages/Repairs";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/maintenance" element={<Maintenance />} />
            {/* Placeholder routes for future implementation */}
            <Route path="/calendar" element={<NotFound />} />
            <Route path="/reports" element={<NotFound />} />
            <Route path="/settings" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
