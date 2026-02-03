-- FIX PERMISSIONS FOR SYNC FUNCTIONALITY
-- Run this script to fix 401 (Unauthorized) and 404 (Not Found) errors

-- 1. Create site_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS but allow PUBLIC access for development
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow PUBLIC read access (everyone can see cities/settings)
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site_settings" 
  ON public.site_settings FOR SELECT USING (true);

-- Allow PUBLIC write access (for development sync without login)
-- WARNING: In production, you should restrict this to authenticated users!
DROP POLICY IF EXISTS "Allow public insert to site_settings" ON public.site_settings;
CREATE POLICY "Allow public insert to site_settings" 
  ON public.site_settings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update to site_settings" ON public.site_settings;
CREATE POLICY "Allow public update to site_settings" 
  ON public.site_settings FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage site_settings" ON public.site_settings;

-- 3. Fix Testimonials Permissions (Allow public write for sync)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read testimonials" ON public.testimonials;
CREATE POLICY "Allow public read testimonials" ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert testimonials" ON public.testimonials;
CREATE POLICY "Allow public insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update testimonials" ON public.testimonials;
CREATE POLICY "Allow public update testimonials" ON public.testimonials FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete testimonials" ON public.testimonials;
CREATE POLICY "Allow public delete testimonials" ON public.testimonials FOR DELETE USING (true);

-- 4. Setup auto-update timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER set_site_settings_updated_at 
  BEFORE UPDATE ON public.site_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_updated_at();
