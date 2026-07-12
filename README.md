# Elevate — Full-Stack Premium Ecommerce Storefront

Elevate is a full-stack ecommerce storefront: a Next.js/React/TypeScript frontend backed by a
production-style Java/Spring Boot REST API. The project focuses on modern ecommerce UI design,
a clean layered backend architecture, JWT authentication, a server-persisted cart, and a real
checkout/order pipeline.

<img width="1898" height="908" alt="image" src="https://github.com/user-attachments/assets/d3a4b35b-35f9-46de-bb47-a0eb2b18c081" />

## Live Demo

https://elevate-storefront.vercel.app/ (frontend only, static catalog — the full-stack setup below requires running the backend locally)

## Features

- Responsive ecommerce layout, product filtering, product detail pages, mobile-friendly navigation
- Email/password authentication with JWT, backed by Spring Security + BCrypt
- Server-persisted cart for signed-in users (guests keep a local/localStorage cart)
- Real checkout that creates an order in Postgres, for both guests and signed-in accounts
- Product reviews (star rating + comment), with aggregate rating recalculated per product
- Contact form submissions stored server-side
- OpenAPI/Swagger docs for the whole API

## Tech Stack

**Frontend:** React • Next.js (App Router) • TypeScript • Tailwind CSS • Framer Motion • Zustand

**Backend:** Java 21 • Spring Boot 3 (Web, Security, Data JPA, Validation) • PostgreSQL • Flyway • JWT • BCrypt • springdoc-openapi • Maven • Docker

## Getting Started (full stack)

### 1. Backend

```bash
cd backend
cp .env.example .env
# edit .env and set DATABASE_PASSWORD and ELEVATE_JWT_SECRET
docker compose up --build
```

This starts Postgres and the API on `http://localhost:8080`, seeded with the full product catalog
(5 categories, 50 products) and two demo accounts (`admin@elevate.dev` / `Admin123!` and
`demo@elevate.dev` / `Password123!`). Full details, API reference, and a no-Docker setup are in
[`backend/README.md`](./backend/README.md). Interactive API docs: `http://localhost:8080/swagger-ui.html`.

### 2. Frontend

```bash
cp .env.local.example .env.local   # points the app at http://localhost:8080
npm install
npm run dev
```

Open `http://localhost:3000`. If the backend isn't running, the catalog pages (home, shop, product
detail) fall back to the bundled static catalog in `src/lib/products.ts` so the site still renders —
but auth, cart sync, checkout, contact, and reviews all require the backend to be up.

## Deployment

Deployment steps for Vercel, Render, and Render PostgreSQL are documented in
[`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Project Structure

```text
Elevate/
├─ backend/                      # Spring Boot REST API (see backend/README.md)
│  └─ src/main/java/com/elevate/backend/
│     ├─ controller/ · service/ · repository/ · entity/ · dto/ · mapper/ · security/ · config/ · exception/
│
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # Root layout: AuthProvider, Navbar, Footer
│  │  ├─ page.tsx                # Home: fetches featured products + categories from the API
│  │  ├─ login/ · register/ · account/   # Auth pages + order history
│  │  ├─ cart/ · checkout/ · shop/ · product/[slug]/ · contact/
│  │
│  ├─ components/
│  │  ├─ auth/                   # Login/register forms, account/order history view
│  │  ├─ layout/                 # Navbar (auth-aware), Footer
│  │  ├─ product/                # Product cards, gallery, details, reviews
│  │  ├─ cart/ · checkout/ · contact/ · shop/ · home/ · ui/ · motion/
│  │  └─ store/                  # Zustand cart store (local + server-synced)
│  │
│  ├─ lib/
│  │  ├─ api.ts                  # Typed REST client for the backend + DTO adapters
│  │  ├─ auth-context.tsx        # JWT session state, cart merge-on-login
│  │  ├─ products.ts             # Bundled static catalog (fallback when the API is unreachable)
│  │  └─ utils.ts
│  │
│  └─ types/product.ts
│
├─ .env.local.example
├─ package.json / tsconfig.json / next.config.ts / eslint.config.mjs / postcss.config.mjs
```

## What I Practiced

- Designing a layered Spring Boot backend (controller/service/repository/entity/dto/mapper/security/config/exception)
- JWT authentication and role-based authorization with Spring Security
- Modeling a relational schema (Flyway-versioned) for a real ecommerce domain: products, categories,
  carts, orders, reviews
- Wiring a Next.js frontend to a real REST API, including guest/authenticated hybrid flows (checkout,
  cart) and graceful degradation when the API is unavailable
- Containerizing a Java service with Docker/docker-compose alongside Postgres

## Future Improvements

- Stripe integration for real payment processing
- Server-side pagination/search in the shop page (currently fetches the full catalog client-side)
- Wishlist functionality
- Admin UI for managing products/categories/contact messages (the API already supports it)

## Author
Joel Alvarez
