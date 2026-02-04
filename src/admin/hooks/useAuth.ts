import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminUser, LoginCredentials } from "../types";
import { authService } from "../services/authService";

export interface AuthActionResult {
  success: boolean;
  error?: string;
  message?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    // Supabase persists the session in localStorage, so we check if the user is already logged in
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || "Admin",
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || "Admin",
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthActionResult> => {
    try {
      const user = await authService.login(credentials);
      // State update will happen via onAuthStateChange
      navigate("/admin/dashboard");
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Login gagal" 
      };
    }
  };

  const register = async (credentials: LoginCredentials): Promise<AuthActionResult> => {
    try {
      const user = await authService.register(credentials);
      if (user) {
        setUser(user);
        navigate("/admin/dashboard");
        return { success: true };
      }
      return { success: true, message: "Silakan cek email untuk verifikasi." };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Registrasi gagal" 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/admin/login");
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
