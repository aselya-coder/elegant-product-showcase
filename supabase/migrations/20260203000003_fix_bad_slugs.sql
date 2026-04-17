-- Fix slugs that are full URLs (specifically florist.com)
-- This extracts the part after the last slash
UPDATE public.products
SET slug = regexp_replace(slug, '^.*/([^/]+)$', '\1')
WHERE slug LIKE 'http%' OR slug LIKE 'https%';

-- Fix product_url that are full URLs (make them relative)
UPDATE public.products
SET product_url = regexp_replace(product_url, 'https://florist.com', '')
WHERE product_url LIKE 'https://florist.com%';