import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import EquipmentMarketplace from "./pages/EquipmentMarketplace";
import LaborMarketplace from "./pages/LaborMarketplace";
import AddEquipment from "./pages/AddEquipment";
import AddLabor from "./pages/AddLabor";
import GroupLabor from "./pages/GroupLabor";
import Finance from "./pages/Finance";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<EquipmentMarketplace />} />
          <Route path="/labor" element={<LaborMarketplace />} />
          <Route path="/add-equipment" element={<AddEquipment />} />
          <Route path="/add-labor" element={<AddLabor />} />
          <Route path="/group-labor" element={<GroupLabor />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
