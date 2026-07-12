# Elevate Backend

A production-style Spring Boot REST API for the Elevate ecommerce storefront: product catalog, categories, server-side cart, checkout/orders, product reviews, contact messages, and JWT authentication.

## Tech stack

- Java 21, Spring Boot 3.3
- Spring Web, Spring Security, Spring Data JPA (Hibernate), Spring Validation
- PostgreSQL 16 + Flyway migrations
- JWT authentication (jjwt) with BCrypt password hashing
- springdoc-openapi (Swagger UI)
- Maven, Docker / docker-compose

## Architecture

Classic layered architecture, one package per concern:

```
com.elevate.backend
├─ controller/   REST endpoints (thin — validation + delegation only)
├─ service/      Business logic, transactions
├─ repository/   Spring Data JPA interfaces
├─ entity/       JPA entities
├─ dto/          Request/response records, grouped by feature
├─ mapper/       Entity <-> DTO conversion
├─ security/     JWT filter/service, UserDetails adapter
├─ config/       Security, CORS, OpenAPI, JPA auditing config
└─ exception/    Custom exceptions + a single @RestControllerAdvice
```

Every error response (validation failure, 404, 409, 401, 403, 500) is shaped the same way:

```json
{
  "timestamp": "2026-07-11T12:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for one or more fields",
  "path": "/api/products",
  "fieldErrors": [{ "field": "price", "message": "Price must be greater than zero" }]
}
```

## Running locally with Docker (recommended)

```bash
cd backend
cp .env.example .env
# edit .env and set DATABASE_PASSWORD and ELEVATE_JWT_SECRET
docker compose up --build
```

This starts Postgres and the API together. Flyway runs automatically on startup and seeds the full product catalog (5 categories, 50 products) plus two demo accounts:

| Email | Password | Role |
| --- | --- | --- |
| `admin@elevate.dev` | `Admin123!` | ADMIN |
| `demo@elevate.dev` | `Password123!` | USER |

The API is then available at `http://localhost:8080`, with interactive docs at `http://localhost:8080/swagger-ui.html`.

## Running locally without Docker

You need a local PostgreSQL instance:

```bash
docker run --name elevate-postgres -e POSTGRES_DB=elevate -e POSTGRES_USER=elevate -e POSTGRES_PASSWORD=replace-with-a-local-postgres-password -p 5432:5432 -d postgres:16-alpine

cd backend
# export/set DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, and ELEVATE_JWT_SECRET first
mvn spring-boot:run
```

Configuration is environment-variable driven (see `.env.example` and `src/main/resources/application.yml`). The database password and JWT signing secret are intentionally required rather than defaulted.

## API overview

All endpoints are prefixed `/api`. Endpoints marked 🔓 don't require a token; everything else needs `Authorization: Bearer <token>`, and 🔒 additionally requires the ADMIN role.

| Method | Path | Description |
| --- | --- | --- |
| POST | `/auth/register` 🔓 | Create an account, returns a JWT |
| POST | `/auth/login` 🔓 | Authenticate, returns a JWT |
| GET | `/users/me` | Current user's profile |
| GET | `/categories` 🔓 | List categories |
| GET | `/categories/{slug}` 🔓 | Category detail |
| POST/PUT/DELETE | `/categories` 🔒 | Manage categories |
| GET | `/products` 🔓 | Paginated/filterable product search (`category`, `search`, `minPrice`, `maxPrice`, `page`, `size`, `sort`) |
| GET | `/products/featured` 🔓 | Badged/featured products for the homepage |
| GET | `/products/{slug}` 🔓 | Product detail |
| GET | `/products/{slug}/related` 🔓 | Related products (same category) |
| POST/PUT/DELETE | `/products` 🔒 | Manage products |
| GET | `/products/{slug}/reviews` 🔓 | Reviews for a product |
| PUT | `/products/{slug}/reviews/me` | Create/update the caller's review |
| GET | `/cart` | The signed-in user's server-side cart |
| POST | `/cart/items` | Add an item |
| PATCH | `/cart/items/{itemId}` | Update quantity |
| DELETE | `/cart/items/{itemId}` | Remove an item |
| DELETE | `/cart` | Clear the cart |
| POST | `/orders` 🔓 | Checkout (works for guests and signed-in users) |
| GET | `/orders/number/{orderNumber}` | Look up one of the signed-in user's order confirmations |
| GET | `/orders/me` | The signed-in user's order history |
| GET | `/orders/me/{id}` | One of the signed-in user's orders |
| POST | `/contact` 🔓 | Submit the storefront contact form |
| GET | `/contact/admin/messages` 🔒 | List submitted contact messages |

### Checkout works for guests and accounts

`POST /api/orders` accepts a shipping address, an optional `contactEmail`, and the list of cart line items directly from the client. It doesn't require a token: guests check out by sending their cart items and an email address; signed-in users can omit `contactEmail` (it defaults to their account email) and the order is linked to their account. Stock and pricing are revalidated server-side on every checkout regardless of where the cart came from.

### Server-side cart vs. guest cart

Signed-in users get a persistent cart via `/api/cart`, so it survives across devices. Guests keep using the existing client-side (localStorage) cart from the original storefront — there's nothing to persist server-side until they have an account.

## Data model highlights

- `Product` owns four `@ElementCollection`s (`features`, `images`, `specs`, `colors`) rather than separate join-entity tables, since none of those need independent identity — this matches the shape of the original frontend's static catalog exactly.
- `OrderItem` snapshots `productName` / `productImage` / `unitPrice` at purchase time, so historical orders stay accurate even if a product is later re-priced, renamed, or deleted.
- `Order.user` is nullable to support guest checkout; `Order.contactEmail` is always set.
- `Review` has a unique `(product_id, user_id)` constraint — one review per customer per product, upserted via `PUT .../reviews/me`. Saving a review recalculates the product's aggregate `rating`/`reviewCount`.

## Tests

```bash
mvn test
```

Uses an in-memory H2 database (`src/test/resources/application-test.yml`) so tests don't require Postgres.
