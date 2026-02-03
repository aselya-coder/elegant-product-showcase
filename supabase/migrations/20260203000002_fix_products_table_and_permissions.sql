-- 1. Reload the schema cache to ensure Supabase sees all columns
NOTIFY pgrst, 'reload config';

-- 2. Ensure 'is_featured' column exists (Add it if missing)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_featured') THEN
        ALTER TABLE public.products ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 3. Ensure 'is_active' column exists (Add it if missing)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'is_active') THEN
        ALTER TABLE public.products ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- 4. Fix Permissions: Allow ANY authenticated user to manage products
-- (This is easier than creating the admin role manually for now)

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Admins can manage all products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can view products" ON public.products;

-- Create permissive policies for authenticated users
CREATE POLICY "Authenticated users can select products"
ON public.products FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert products"
ON public.products FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update products"
ON public.products FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete products"
ON public.products FOR DELETE
USING (auth.role() = 'authenticated');
