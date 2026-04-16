import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import VoiceCommand from "@/components/VoiceCommand";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import EquipmentMarketplace from "./pages/EquipmentMarketplace";
import LaborMarketplace from "./pages/LaborMarketplace";
import AddEquipment from "./pages/AddEquipment";
import AddLabor from "./pages/AddLabor";
import GroupLabor from "./pages/GroupLabor";
import Finance from "./pages/Finance";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
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
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <Chatbot />
            <VoiceCommand />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
