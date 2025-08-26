# Copilot Instructions for AI Coding Agents

**Project Description:**
The Kiba Group is a security company specializing in government and state contracts. Our team is highly trained and specialized, with deep expertise in mission planning, tactics, and execution.

**This project uses Svelte 5 and SvelteKit. All Svelte code, conventions, and features should target Svelte 5.**

## Project Overview

- **Framework:** Svelte 5 & SvelteKit (see `svelte.config.js`, `vite.config.ts`, `src/`)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (`tailwindcss`, `app.css`)
- **Database:** Drizzle ORM (see `src/lib/server/db/`)
- **Testing:**
  - Unit: Vitest (`vitest`, `vitest-setup-client.ts`)
  - E2E: Playwright (`e2e/`, `playwright.config.ts`)
- **Linting/Formatting:** ESLint, Prettier, Svelte plugin (see `eslint.config.js`)

## Key Workflows

- **Develop:** `npm run dev` (starts Vite dev server)
- **Build:** `npm run build` (production build)
- **Preview:** `npm run preview` (serves built app)
- **Lint:** `npm run lint` (Prettier + ESLint)
- **Format:** `npm run format`
- **Type Check:** `npm run check` (SvelteKit sync + svelte-check)
- **Unit Test:** `npm run test:unit` (Vitest)
- **E2E Test:** `npm run test:e2e` (Playwright)
- **All Tests:** `npm run test` (unit + e2e)
- **DB Migrations:** `npm run db:push`, `db:generate`, `db:migrate`, `db:studio` (Drizzle Kit)

## Project Structure

- `src/routes/`: SvelteKit route files (`+page.svelte`, `+layout.svelte`)
- `src/lib/server/db/`: Database schema and access (Drizzle ORM)
- `e2e/`: Playwright end-to-end tests
- `vitest-setup-client.ts`: Vitest browser setup
- `playwright.config.ts`: Playwright config (runs preview server for e2e)

## Conventions & Patterns

- **Svelte 5:** Use Svelte 5 syntax and features (e.g., runes, new reactivity model, etc.). Prefer `<script lang="ts">` and idiomatic Svelte 5 patterns. See official Svelte 5 docs for details.
- **SvelteKit routing:** Follows file-based routing (`src/routes/`).
- **TypeScript:** Used throughout; type safety is enforced.
- **ESLint config:** Disables `no-undef` for TS, uses Svelte plugin, includes Prettier.
- **Prettier:** Enforced for all code, including Svelte and Tailwind.
- **Database:** Schema defined in `src/lib/server/db/schema.ts`, access via Drizzle ORM.
- **Testing:**
  - Unit tests colocated or in `src/routes/` as `*.spec.ts`.
  - E2E tests in `e2e/`.
- **Adapters:** Uses `@sveltejs/adapter-vercel` for deployment (see `package.json`).

## External Integrations

- **Drizzle ORM** for DB (see `drizzle.config.ts`)
- **Playwright** for e2e
- **Vitest** for unit
- **Tailwind CSS** for styling

## Examples

- To add a new page: create `src/routes/yourpage/+page.svelte`.
- To add a DB table: update `src/lib/server/db/schema.ts` and run `npm run db:generate`.
- To run all tests: `npm run test`.

---

For more, see `README.md`, `package.json` scripts, and config files in the project root.
