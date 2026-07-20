UPDATE product_images
SET image_url = '/products/vertex-smart-glasses-primary-zoomed.png'
WHERE product_id = (SELECT id FROM products WHERE slug = 'vertex-smart-glasses')
  AND image_url = '/products/vertex-smart-glasses-primary.png';
