UPDATE product_images
SET image_url = '/products/echo-earbuds-primary-v3.png'
WHERE product_id = (SELECT id FROM products WHERE slug = 'echo-anc-earbuds')
  AND position = 0;
