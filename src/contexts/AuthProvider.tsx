import { ReactNode, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    return !!data;
  };

  useEffect(() => {
    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (_, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const admin = await checkAdminRole(session.user.id);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false);
        }

        setIsLoading(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        signIn: async (email, password) =>
          supabase.auth.signInWithPassword({ email, password }),
        signUp: async (email, password, fullName) =>
          supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
          }),
          signOut: async () => {
            await supabase.auth.signOut();
          },          
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
