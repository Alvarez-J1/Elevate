-- Core schema for the Elevate storefront backend.

CREATE TABLE users (
    id              BIGSERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    role            VARCHAR(20)  NOT NULL,
    enabled         BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE categories (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL UNIQUE,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT         NOT NULL,
    image_url       VARCHAR(500),
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE products (
    id              BIGSERIAL PRIMARY KEY,
    sku             VARCHAR(50)  NOT NULL UNIQUE,
    slug            VARCHAR(150) NOT NULL UNIQUE,
    name            VARCHAR(200) NOT NULL,
    tagline         VARCHAR(500) NOT NULL,
    category_id     BIGINT       NOT NULL REFERENCES categories (id),
    price           NUMERIC(10, 2) NOT NULL,
    original_price  NUMERIC(10, 2),
    rating          NUMERIC(3, 2) NOT NULL DEFAULT 0,
    review_count    INTEGER      NOT NULL DEFAULT 0,
    description     TEXT         NOT NULL,
    badge           VARCHAR(100),
    stock           INTEGER      NOT NULL DEFAULT 0,
    accent          VARCHAR(20)  NOT NULL,
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_category ON products (category_id);

CREATE TABLE product_features (
    product_id      BIGINT       NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    position        INTEGER      NOT NULL,
    feature         VARCHAR(300) NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE product_images (
    product_id      BIGINT       NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    position        INTEGER      NOT NULL,
    image_url       VARCHAR(500) NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE product_specs (
    product_id      BIGINT       NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    spec_key        VARCHAR(100) NOT NULL,
    spec_value      VARCHAR(300) NOT NULL,
    PRIMARY KEY (product_id, spec_key)
);

CREATE TABLE product_colors (
    product_id      BIGINT       NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    position        INTEGER      NOT NULL,
    color_name      VARCHAR(60)  NOT NULL,
    color_value     VARCHAR(20)  NOT NULL,
    PRIMARY KEY (product_id, position)
);

CREATE TABLE carts (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT       NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE cart_items (
    id              BIGSERIAL PRIMARY KEY,
    cart_id         BIGINT       NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
    product_id      BIGINT       NOT NULL REFERENCES products (id),
    quantity        INTEGER      NOT NULL,
    color           VARCHAR(60),
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now(),
    CONSTRAINT uq_cart_item_product_color UNIQUE (cart_id, product_id, color)
);

CREATE TABLE orders (
    id                      BIGSERIAL PRIMARY KEY,
    order_number            VARCHAR(40)  NOT NULL UNIQUE,
    user_id                 BIGINT       REFERENCES users (id),
    contact_email           VARCHAR(255) NOT NULL,
    status                  VARCHAR(20)  NOT NULL,
    shipping_first_name     VARCHAR(100) NOT NULL,
    shipping_last_name      VARCHAR(100) NOT NULL,
    shipping_address_line1  VARCHAR(200) NOT NULL,
    shipping_city           VARCHAR(100) NOT NULL,
    shipping_postal_code    VARCHAR(20)  NOT NULL,
    shipping_country        VARCHAR(100) NOT NULL,
    subtotal                NUMERIC(10, 2) NOT NULL,
    shipping_cost           NUMERIC(10, 2) NOT NULL,
    tax                     NUMERIC(10, 2) NOT NULL,
    total                   NUMERIC(10, 2) NOT NULL,
    created_at              TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at              TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user ON orders (user_id);

CREATE TABLE order_items (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT       NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id      BIGINT       REFERENCES products (id),
    product_name    VARCHAR(200) NOT NULL,
    product_image   VARCHAR(500),
    unit_price      NUMERIC(10, 2) NOT NULL,
    quantity        INTEGER      NOT NULL,
    color           VARCHAR(60),
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE reviews (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT       NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    user_id         BIGINT       NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    rating          INTEGER      NOT NULL,
    comment         TEXT,
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now(),
    CONSTRAINT uq_review_product_user UNIQUE (product_id, user_id)
);

CREATE TABLE contact_messages (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    subject         VARCHAR(200) NOT NULL,
    message         TEXT         NOT NULL,
    resolved        BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP    NOT NULL DEFAULT now()
);
