-- Fix permissions for site_settings and testimonials to allow authenticated users (like the admin) to manage them

-- 1. Fix site_settings permissions
-- The previous policy might be too restrictive or not working as expected with the current auth role
DROP POLICY IF EXISTS "Allow authenticated users to modify site_settings" ON public.site_settings;

CREATE POLICY "Authenticated users can manage site_settings"
  ON public.site_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 2. Fix testimonials permissions
-- Drop existing policies that might conflict or be too restrictive
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON public.testimonials;

-- Create permissive policies for authenticated users (admin)
CREATE POLICY "Authenticated users can select testimonials"
  ON public.testimonials FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials"
  ON public.testimonials FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials"
  ON public.testimonials FOR DELETE
  USING (auth.role() = 'authenticated');

-- 3. Reload config to ensure changes take effect
NOTIFY pgrst, 'reload config';
