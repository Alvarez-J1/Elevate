UPDATE product_images
SET image_url = '/products/vanta-studio-primary-zoomed.png'
WHERE product_id = (SELECT id FROM products WHERE slug = 'vanta-studio-headphones')
  AND image_url = '/products/vanta-studio-primary.png';
