# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Website and web app for **ROMAGA** (Transportes Romaga), a Mexican freight/cargo transport company. It's a two-app monorepo:

- `app-angular/` — Angular 20 standalone frontend (public site + customer dashboard).
- `backend/` — Express + MongoDB (Mongoose) REST API.

The backend was bootstrapped from a generic "Duck-Hack Cloud" template (see `openapi.yaml` title, `JWT_ISSUER=duckhack-cloud-backend`, `MONGO_URL_GLOBAL=mongodb://localhost:27017/duckhub_admin` in `.env.example`). Some template scaffolding for multi-tenant/store use cases exists (`TENANT_*` env vars, `validateStoreConfigPayload`, `validateContactEmailPayload`) but is not fully wired into `server.js`/routes — don't assume tenant resolution or store-config endpoints are live just because the env vars or validators exist.

Code comments, error messages, and API responses are written in **Spanish**. Match that convention when touching backend code.

## Commands

### Backend (`backend/`)
```bash
npm install
npm start              # node server.js — reads config from .env (see .env.example)
```
There is no real test suite (`npm test` is a stub that exits 1). Requires MongoDB reachable at `MONGO_URL_GLOBAL` and will throw on boot if required env vars are missing (`MONGO_URL_GLOBAL`, `CORS_ALLOWED_ORIGINS`, JWT vars — see `utils/jwt.js` `validateJwtEnvConfig()`).

### Frontend (`app-angular/`)
```bash
npm install
ng serve                # dev server, http://localhost:4200, uses environment.develop.ts (fileReplacements)
ng build                # production build (default configuration), outputs dist/app-angular/browser
ng build --configuration development
ng test                 # Karma/Jasmine unit tests
ng generate component <name>
```

### Docker
```bash
docker compose up --build
```
`docker-compose.yml` builds both images: Angular is built and served via nginx (`nginx.conf`, SPA fallback to `index.html`) on host port 103, backend on host port 104 (container port 5000).

## Backend architecture

- **Entry point** `server.js`: connects to a single global Mongo DB (`MONGO_URL_GLOBAL`), applies `cors`/`helmet`, mounts all routers under `/api/ds/*`, and serves the uploads directory statically at `/api/ds/uploads`. Startup fails fast (throws) if required env vars are absent — check `.env.example` for the full list before debugging "it won't start" issues.
- **CORS**: origin allowlist comes from `CORS_ALLOWED_ORIGINS`; `CORS_ALLOW_LOCAL_DEV=true` additionally allows a hardcoded set of localhost origins (see `server.js`) — useful when running the Angular dev server against a local backend.
- **Error responses**: every handler uses `sendError(res, status, code, message, details?)` from `utils/httpResponses.js`, producing a consistent `{ ok: false, error: { status, code, message } }` envelope. Follow this pattern for any new endpoint rather than `res.status().json()` ad hoc.
- **Auth** (`middleware/authMiddleware.js`): JWTs are signed/verified in `utils/jwt.js` with a `tokenType` claim (`access`, `email_verification`, `reset_password`) so tokens can't be reused across purposes. `verifyToken` populates `req.user`; `authorizeRoles`, `authorizeSelf`, and `authorizeSelfOrRoles` build role/ownership checks on top of it.
  - **Known gotcha**: `ROLES` in `authMiddleware.js` currently only defines `SUPER_ADMIN` and `CUSTOMER`. Several routes reference `ROLES.STORE_ADMIN` (`routes/user.routes.js`) and `ROLES.CATALOG_MANAGER` (`routes/upload.routes.js`), which are `undefined` — those `authorizeRoles(...)` calls will always fail with `RBAC_CONFIGURATION_INVALID` (500) until the role enum is extended or the call sites are corrected. Be aware of this before assuming those checks work as written.
- **Validation** (`middleware/validationMiddleware.js`): hand-rolled per-payload validators (no schema library), each trims/normalizes `req.body` fields in place before calling `next()`.
- **Rate limiting** (`middleware/rateLimitMiddleware.js`): simple in-memory per-IP `Map`, not shared across processes/instances — fine for a single backend container, won't work correctly if the backend is horizontally scaled.
- **Image uploads** (`middleware/imageUploadMiddleware.js`): `multer` buffers the file in memory, `sharp` re-encodes it (JPEG/PNG only, EXIF rotation applied, PNG/JPEG re-compressed) before writing to disk — this both validates real image content and strips unexpected payloads. Destination directory comes from `utils/uploads.js` `resolveUploadsDir()` (`UPLOADS_DIR` env var, falling back to `/tmp/media-uploads` if not writable).
- **External API integration**: `routes/destination.routes.js` and `routes/route.cost.routes.js` proxy to the INEGI (Mexican national statistics institute) route-cost API using `INEGI_*` env vars, for computing freight route distances/costs by vehicle type.
- **`Movil` model** (`models/movil.model.js`): generic `{ key, data: Mixed }` document store keyed by a string (e.g. `'home'`) used to serve content for a mobile app screen — see `routes/movil.routes.js` `GET /api/ds/movil/home`.
- **API contract**: `backend/openapi.yaml` documents the REST surface; `backend/romaga-postman-collection.json` is a matching Postman collection. **MANDATORY:** every time an endpoint is added, removed, or changed (path, method, query/body params, response shape, auth requirements), update both `backend/openapi.yaml` and `backend/romaga-postman-collection.json` in the same change — never one without the other. This applies even though `backend/romaga-postman-collection.json` and `backend/scripts/` are gitignored (local-only, not committed) — keep them in sync on disk regardless, since they're the working reference for manual API testing.

## Frontend architecture

- Angular 20 standalone app (no `NgModule`s): `app.config.ts` wires `provideRouter`, `provideHttpClient(withFetch())`, and `provideZonelessChangeDetection()`. All routed components are lazy-loaded via `loadComponent` in `app.routes.ts`.
- **Routing structure**: public marketing pages at root (`/`, `sobre-nosotros`, `contacto`, `servicios`), auth flows (`login`, `users/verify`, `reset-password`), and an authenticated `dashboard` section with nested children (`home`, `price`, `history`) redirecting unknown sub-paths to `home`.
- **Environments**: `src/environments/environment.ts` (production defaults) vs `environment.develop.ts`, swapped via `fileReplacements` in `angular.json`'s `development` build configuration (not the Angular-CLI-default `environment.prod.ts` naming). Imported via the `@environments/*` path alias defined in `tsconfig.json`. Both currently point `urlbackend` at the same deployed API (`https://api-romaga.duck-hack.cloud`) — there is no local-backend environment file, point it at `http://localhost:5000` manually when developing against a local backend.
- **Session/auth state**: `services/user.service.ts` holds the logged-in user in a `signal` (`sessionUser`) backed by `localStorage` (key from `environment.localStorageName`); token expiry is checked client-side by decoding the JWT payload (`isTokenValid`), not by calling the backend.
- **External API access**: services (`services/inegi.service.ts`) call the backend's `/api/ds/*` proxy routes directly with `HttpClient`, passing the stored JWT as a `Bearer` header — they do not call INEGI directly.
- **Shared UI**: reusable presentational components live under `shared/components/` (further split into `dashboard/`, `navbar/`, `service-cards/`, `skeleton/`, etc.); response/DTO shapes live under `shared/interfaces/` and generally mirror backend JSON shapes (e.g. `route.cost.interface.ts` mirrors the INEGI proxy response).
- Styling uses Tailwind CSS v4 (`@tailwindcss/postcss`) plus `@tailwindplus/elements`; maps rendered with `leaflet`.
