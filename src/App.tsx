import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import SavedGravesPage from "./pages/SavedGravesPage";
import SettingsPage from "./pages/SettingsPage";
import GraveDetailsPage from "./pages/GraveDetailsPage";
import AddGravePage from "./pages/AddGravePage";
import NavigatePage from "./pages/NavigatePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/saved" element={<SavedGravesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/grave/:id" element={<GraveDetailsPage />} />
          <Route path="/add" element={<AddGravePage />} />
          <Route path="/navigate/:id" element={<NavigatePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
