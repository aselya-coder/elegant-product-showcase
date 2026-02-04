-- Add tags columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS is_best_seller BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_exclusive BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
