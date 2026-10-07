# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

Public marketing website for **ROMAGA** (Transportes Romaga), a Mexican freight/cargo transport company. It is a static Angular frontend only (`app-angular/`); there is no backend, login, or customer dashboard — those were removed before the production launch.

Site copy and code comments are written in **Spanish**. Match that convention.

## Commands

All from `app-angular/`:
```bash
npm install
ng serve                # dev server, http://localhost:4200, uses environment.develop.ts (fileReplacements)
ng build                # production build (default configuration), outputs dist/app-angular/browser
ng build --configuration development
ng test                 # Karma/Jasmine unit tests
```

### Docker
```bash
docker compose up --build
```
`docker-compose.yml` builds the Angular app and serves it via nginx (`nginx.conf`, SPA fallback to `index.html`) on host port 103.

## Frontend architecture

- Angular 20 standalone app (no `NgModule`s): `app.config.ts` wires `provideRouter` and `provideZonelessChangeDetection()`. There is no `HttpClient` — the site makes no API calls. All routed components are lazy-loaded via `loadComponent` in `app.routes.ts`.
- **Routes**: `/`, `sobre-nosotros`, `contacto`, `servicios`; anything else redirects to `/`.
- **Contact form** (`pages/contact-us`): validates client-side, then opens WhatsApp (`wa.me`) or the visitor's mail client (`mailto:`) with the request prefilled. The destination number/email are constants at the top of `contact-us.ts`.
- **Environments**: `src/environments/environment.ts` (production) vs `environment.develop.ts`, swapped via `fileReplacements` in `angular.json`'s `development` configuration. Imported via the `@environments/*` path alias. Only holds company name/slogan.
- **Shared UI**: reusable presentational components live under `shared/components/` (`navbar/`, `main-footer/`, `service-cards/`, `stats-strip/`); data shapes live under `shared/interfaces/`.
- Styling uses Tailwind CSS v4 (`@tailwindcss/postcss`) plus `@tailwindplus/elements`, with global design tokens in `src/styles.css`.
