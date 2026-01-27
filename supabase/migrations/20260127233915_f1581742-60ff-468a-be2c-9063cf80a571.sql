-- Fix security warnings: Replace overly permissive policies

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can update stats" ON public.site_stats;

-- Create more restrictive policies for testimonials
-- Anonymous users can only insert testimonials (not update/delete)
CREATE POLICY "Public can submit testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (
    is_approved = false -- New testimonials must be unapproved
    AND rating >= 1 AND rating <= 5
  );

-- Create more restrictive policies for inquiries
-- Anonymous users can only insert inquiries (not update/delete)
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (
    status = 'pending' -- New inquiries must be pending
    AND name IS NOT NULL 
    AND phone IS NOT NULL
    AND message IS NOT NULL
  );

-- Site stats: Only admins can manage, use edge function for increment
DROP POLICY IF EXISTS "Admins can view site stats" ON public.site_stats;

CREATE POLICY "Admins can manage site stats"
  ON public.site_stats FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create a function to safely increment page views (for public use via RPC)
CREATE OR REPLACE FUNCTION public.increment_page_views()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.site_stats (date, page_views, unique_visitors)
  VALUES (CURRENT_DATE, 1, 1)
  ON CONFLICT (date)
  DO UPDATE SET page_views = site_stats.page_views + 1;
END;
$$;