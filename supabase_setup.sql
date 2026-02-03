-- COPY ALL TEXT BELOW THIS LINE --

-- 1. Create site_settings table (Required for Cities and Home Content)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Security
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 3. Create Access Policies
-- Allow everyone to read settings
DROP POLICY IF EXISTS "Allow public read access to site_settings" ON public.site_settings;
CREATE POLICY "Allow public read access to site_settings" 
  ON public.site_settings FOR SELECT USING (true);

-- Allow authenticated users (admins) to manage settings
DROP POLICY IF EXISTS "Authenticated users can manage site_settings" ON public.site_settings;
CREATE POLICY "Authenticated users can manage site_settings" 
  ON public.site_settings FOR ALL 
  USING (auth.role() = 'authenticated') 
  WITH CHECK (auth.role() = 'authenticated');

-- 4. Setup auto-update timestamp
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

-- 5. Fix Testimonials Permissions (Ensure Sync Works)
DROP POLICY IF EXISTS "Authenticated users can select testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON public.testimonials;

CREATE POLICY "Authenticated users can select testimonials" ON public.testimonials FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update testimonials" ON public.testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete testimonials" ON public.testimonials FOR DELETE USING (auth.role() = 'authenticated');
