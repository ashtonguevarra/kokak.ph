# Kokak

Kokak is a Wordle-style web game for learning Philippine regional languages — players translate Filipino words into Cebuano, Ilocano, or Hiligaynon while discovering each word's meaning, pronunciation, and usage.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/kokak run dev` — run the frontend (port 18748)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Wouter, TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle DB schema (languages, words, contributions tables)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/kokak/src/` — React frontend (pages: home, play, contribute)
- `lib/api-client-react/src/generated/` — generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — generated Zod schemas (do not edit)

## Architecture decisions

- OpenAPI-first: spec gates codegen which gates the frontend; never hand-write types the codegen produces.
- Client-side game logic: the target word is returned from the API and validation happens client-side for MVP simplicity.
- Word contributions stored with `pending` status; AI validation is a future enhancement.
- Drizzle ORM with node-postgres for type-safe DB queries; schema pushed with `drizzle-kit push`.

## Product

- Choose a Philippine regional language (Cebuano, Ilocano, Hiligaynon)
- Guess the Filipino word's regional equivalent in a Wordle-style letter grid (6 attempts)
- Reveal meaning, pronunciation, and example sentence after solving
- Contribute new words to the growing dictionary

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, re-run `pnpm --filter @workspace/api-spec run codegen` before using updated types.
- DB schema changes require `pnpm --filter @workspace/db run push` in dev.
- The API server must be restarted after route changes (it builds with esbuild before starting).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
