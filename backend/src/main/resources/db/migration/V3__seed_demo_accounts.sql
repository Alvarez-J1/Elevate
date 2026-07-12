-- Demo accounts for local development and grading/demo purposes.
-- IMPORTANT: these are throwaway credentials for a portfolio project only —
-- rotate or remove this migration before using this schema in production.
--
--   admin@elevate.dev / Admin123!   (ROLE_ADMIN)
--   demo@elevate.dev  / Password123! (ROLE_USER)

INSERT INTO users (email, password_hash, first_name, last_name, role, enabled) VALUES
('admin@elevate.dev', '$2b$12$GQnhTwaIKGVuIMTO7A0y9eQT9WuB.yhXVehzOBf4r2vOEzht1584m', 'Elevate', 'Admin', 'ADMIN', true),
('demo@elevate.dev', '$2b$12$73u074Ac1HjuXcibCqfa2efCOyZ9fOgU2gs1KBA7P05OCUR0VVg1G', 'Demo', 'Shopper', 'USER', true);

INSERT INTO carts (user_id)
SELECT id FROM users WHERE email IN ('admin@elevate.dev', 'demo@elevate.dev');
