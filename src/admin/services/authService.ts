import { supabase } from "@/integrations/supabase/client";
import { AdminUser, LoginCredentials } from "../types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AdminUser> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Login failed");
    }

    const user: AdminUser = {
      email: data.user.email || "",
      name: data.user.user_metadata?.full_name || "Admin",
      id: data.user.id,
    };

    return user;
  },

  register: async (credentials: LoginCredentials): Promise<AdminUser | null> => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user && data.session) {
       const user: AdminUser = {
        email: data.user.email || "",
        name: data.user.user_metadata?.full_name || "Admin",
        id: data.user.id,
      };
      return user;
    }
    
    return null;
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
  },

  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem("admin_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!authService.getCurrentUser();
  },
};
