import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";

import Index from "./pages/Index";
import TentangKami from "./pages/TentangKami";
import Katalog from "./pages/Katalog";
import ProductDetail from "./pages/ProductDetail";
import Testimoni from "./pages/Testimoni";
import Kontak from "./pages/Kontak";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLogin from "./admin/pages/Login";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/Products";
import AdminTestimonials from "./admin/pages/Testimonials";
import AdminHomePage from "./admin/pages/HomePage";
import AdminCities from "./admin/pages/Cities";
import AdminWhatsApp from "./admin/pages/WhatsApp";
import AdminSettings from "./admin/pages/Settings";
import ProtectedRoute from "./admin/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/tentang-kami" element={<TentangKami />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/produk/:slug" element={<ProductDetail />} />
          <Route path="/testimoni" element={<Testimoni />} />
          <Route path="/kontak" element={<Kontak />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="home" element={<AdminHomePage />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="cities" element={<AdminCities />} />
            <Route path="whatsapp" element={<AdminWhatsApp />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
