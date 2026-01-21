import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Katalog from "./pages/Katalog";
import ProductDetail from "./pages/ProductDetail";
import Testimoni from "./pages/Testimoni";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/produk/:slug" element={<ProductDetail />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/kontak" element={<Kontak />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
