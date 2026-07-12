# Elevate Deployment

Target deployment:

- Frontend: Next.js on Vercel
- Backend: Spring Boot on Render
- Database: Managed PostgreSQL on Render

Do not commit real secrets, database credentials, or generated `.env` files.

## Production Configuration

The backend production profile is `prod` and uses PostgreSQL only:

- `spring.datasource.url=${DATABASE_URL}`
- `spring.datasource.username=${DATABASE_USERNAME}`
- `spring.datasource.password=${DATABASE_PASSWORD}`
- `spring.datasource.driver-class-name=org.postgresql.Driver`
- `spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect`
- `spring.jpa.hibernate.ddl-auto=validate`
- `spring.flyway.enabled=true`

`DATABASE_URL` must be a JDBC PostgreSQL URL:

```text
jdbc:postgresql://host:5432/database
```

Render also shows PostgreSQL URLs like `postgresql://USER:PASSWORD@HOST:5432/DATABASE`.
Do not paste that value directly into `DATABASE_URL`. Use the Render database host,
port, and database name to build the JDBC URL above, and provide the username and
password separately.

Flyway migrations `V1` through `V5` are written for PostgreSQL. They create the
schema, seed the catalog and demo accounts, tighten contact-message constraints,
and add production-readiness constraints/indexes. The demo accounts in `V3` are
intentional seed data for this portfolio app; rotate or remove those seeded users
before handling real customer data.

## Render PostgreSQL

1. Create a Render PostgreSQL database.
2. Keep the database and backend service in the same Render region.
3. Use `basic-256mb` or a larger database plan for production.
4. Use the database's internal connection details for the backend service.
5. Record the internal host, port, database name, username, and password.

## Render Backend

Create a Render Web Service from the repository.

Settings:

- Runtime: Docker
- Instance type: Starter or better
- Dockerfile path: `./backend/Dockerfile`
- Docker build context: `./backend`
- Health check path: `/actuator/health`
- Branch: production branch, usually `main`

Required environment variables:

```text
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:postgresql://<render-internal-host>:5432/<database>
DATABASE_USERNAME=<render-database-user>
DATABASE_PASSWORD=<render-database-password>
ELEVATE_JWT_SECRET=<random-32-plus-character-secret>
ELEVATE_FRONTEND_ORIGIN=https://<your-vercel-project>.vercel.app
```

Optional environment variables:

```text
ELEVATE_JWT_EXPIRATION_MS=86400000
SPRINGDOC_API_DOCS_ENABLED=false
SPRINGDOC_SWAGGER_UI_ENABLED=false
ELEVATE_LOG_LEVEL=INFO
ELEVATE_SQL_LOG_LEVEL=WARN
```

The app reads Render's `PORT` environment variable automatically.

## Vercel Frontend

Create a Vercel project from the repository.

Settings:

- Framework preset: Next.js
- Root directory: repository root
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave as the Next.js default

Required environment variable:

```text
NEXT_PUBLIC_API_URL=https://<your-render-backend>.onrender.com
```

`NEXT_PUBLIC_API_URL` is inlined into the browser bundle at build time, so set it
before the Vercel production build.

## CORS

Set `ELEVATE_FRONTEND_ORIGIN` to the exact Vercel origin, for example:

```text
https://elevate-storefront.vercel.app
```

Do not use `*` with credentials. The backend enables credentials and uses the
configured origin list as exact allowed origins.

## Blueprint Option

This repo includes `render.yaml` for the backend service and database. The
Blueprint intentionally prompts for `DATABASE_URL` and `ELEVATE_FRONTEND_ORIGIN`
because `DATABASE_URL` must be the JDBC form and the frontend origin is only
known after Vercel deployment.

After creating the Blueprint, set:

```text
DATABASE_URL=jdbc:postgresql://<render-internal-host>:5432/<database>
ELEVATE_FRONTEND_ORIGIN=https://<your-vercel-project>.vercel.app
```

## Local Verification

Run before deploying:

```powershell
cd backend
mvn test
cd ..
npm.cmd run build
```

If Docker is available, run a real PostgreSQL smoke test:

```powershell
cd backend
Copy-Item .env.example .env
# edit .env and set DATABASE_PASSWORD and ELEVATE_JWT_SECRET
docker compose up --build
```

Then verify:

- `GET http://localhost:8080/actuator/health`
- `GET http://localhost:8080/api/products?size=1`
- A frontend page using `NEXT_PUBLIC_API_URL=http://localhost:8080`

## Post-Deployment Smoke Test

1. Open `https://<render-backend>.onrender.com/actuator/health` and expect `UP`.
2. Open `https://<render-backend>.onrender.com/api/products?size=1`.
3. Confirm Render logs show Flyway applying migrations and Hibernate validation passing.
4. Open the Vercel frontend and test login, cart sync, checkout, reviews, and the contact form.
5. Confirm browser requests go to `NEXT_PUBLIC_API_URL`.
6. Confirm CORS allows the Vercel origin and rejects unexpected origins.
