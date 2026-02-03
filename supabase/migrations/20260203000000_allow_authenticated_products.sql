-- Enable RLS on products (should be already enabled, but just in case)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow any authenticated user to select products (already exists usually, but good to ensure)
CREATE POLICY "Authenticated users can view products"
ON public.products FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow any authenticated user to insert products
CREATE POLICY "Authenticated users can insert products"
ON public.products FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow any authenticated user to update products
CREATE POLICY "Authenticated users can update products"
ON public.products FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow any authenticated user to delete products
CREATE POLICY "Authenticated users can delete products"
ON public.products FOR DELETE
USING (auth.role() = 'authenticated');
