-- Add product_url column to products table
ALTER TABLE public.products 
ADD COLUMN product_url text;

-- Optional: Update RLS policies if necessary, but usually public read/authenticated write is fine
-- (Assuming policies allow updating new columns)
