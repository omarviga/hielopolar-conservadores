
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Assets from "./pages/Assets";
import AssetsMap from "./pages/AssetsMap";
import Clients from "./pages/Clients";
import ClientsMap from "./pages/ClientsMap";
import Maintenance from "./pages/Maintenance";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import Repairs from "./pages/Repairs";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Suppliers from "./pages/Suppliers";
import Purchases from "./pages/Purchases";
import ServiceOrders from "./pages/ServiceOrders";
import QRCodeGeneratorPage from "./pages/QRCodeGenerator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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
            <Route path="/assets/map" element={<AssetsMap />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/map" element={<ClientsMap />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/map" element={<Map />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/purchases" element={<Purchases />} />
            {/* Nuevas rutas */}
            <Route path="/service-orders" element={<ServiceOrders />} />
            <Route path="/qr-generator" element={<QRCodeGeneratorPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
