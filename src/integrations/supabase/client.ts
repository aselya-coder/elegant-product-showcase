import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validate Supabase credentials
const isValidUrl = (url: string) => {
  try {
    return url && url.startsWith('http') && new URL(url).hostname.includes('supabase');
  } catch {
    return false;
  }
};

const isValidKey = (key: string) => {
  // Real Supabase anon keys are long JWT tokens, not short placeholder values
  return key && key.length > 100 && key.startsWith('eyJ');
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey);

// Create Supabase client with proper error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        'apikey': supabaseAnonKey || 'placeholder-key',
      },
    },
  }
);

// Log configuration status (only in development)
if (import.meta.env.DEV) {
  if (!isSupabaseConfigured) {
    console.info(
      '%c[Supabase] Using local data fallback - Supabase credentials not configured',
      'color: #f59e0b; font-weight: bold;'
    );
  } else {
    console.info(
      '%c[Supabase] Connected to Supabase backend',
      'color: #10b981; font-weight: bold;'
    );
  }
}
