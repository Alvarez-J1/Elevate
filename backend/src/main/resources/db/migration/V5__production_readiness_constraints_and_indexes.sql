-- Production-readiness constraints and indexes for PostgreSQL deployments.

-- PostgreSQL treats NULL values as distinct in UNIQUE constraints. Store
-- "no color selected" as an empty string so one cart cannot contain duplicate
-- default-variant rows for the same product.
UPDATE cart_items
SET color = ''
WHERE color IS NULL;

ALTER TABLE cart_items
    ALTER COLUMN color SET DEFAULT '';

ALTER TABLE cart_items
    ALTER COLUMN color SET NOT NULL;

ALTER TABLE products
    ADD CONSTRAINT chk_products_price_positive
        CHECK (price > 0);

ALTER TABLE products
    ADD CONSTRAINT chk_products_original_price_positive
        CHECK (original_price IS NULL OR original_price > 0);

ALTER TABLE products
    ADD CONSTRAINT chk_products_rating_range
        CHECK (rating >= 0 AND rating <= 5);

ALTER TABLE products
    ADD CONSTRAINT chk_products_review_count_non_negative
        CHECK (review_count >= 0);

ALTER TABLE products
    ADD CONSTRAINT chk_products_stock_non_negative
        CHECK (stock >= 0);

ALTER TABLE cart_items
    ADD CONSTRAINT chk_cart_items_quantity_range
        CHECK (quantity BETWEEN 1 AND 99);

ALTER TABLE order_items
    ADD CONSTRAINT chk_order_items_quantity_range
        CHECK (quantity BETWEEN 1 AND 99);

ALTER TABLE orders
    ADD CONSTRAINT chk_orders_money_non_negative
        CHECK (subtotal >= 0 AND shipping_cost >= 0 AND tax >= 0 AND total >= 0);

ALTER TABLE reviews
    ADD CONSTRAINT chk_reviews_rating_range
        CHECK (rating BETWEEN 1 AND 5);

ALTER TABLE reviews
    ADD CONSTRAINT chk_reviews_comment_length
        CHECK (comment IS NULL OR char_length(comment) <= 2000);

CREATE INDEX idx_orders_user_created_at
    ON orders (user_id, created_at DESC);

CREATE INDEX idx_reviews_product_created_at
    ON reviews (product_id, created_at DESC);

CREATE INDEX idx_contact_messages_created_at
    ON contact_messages (created_at DESC);
