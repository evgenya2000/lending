# AI Coding Agent Instructions — Macaron Store (`lending`)

> This file is the single source of truth for AI coding agents working in this repository.
> It is **not** a generic Next.js template — every command, path, and version below was
> verified against the actual files in this repo. When in doubt, re-read the referenced file
> instead of trusting memory.

---

## 1. Repository Overview

**Macaron Store** is a single-page e-commerce storefront for macarons with an interactive
**3D product catalog**. Product colors change in real time based on the selected flavor.
The UI language is **Russian** (`<html lang="ru">`).

- **Package name:** `lending` (version `0.1.0`, private)
- **Framework:** Next.js `^16.2.12` — **App Router** (`src/app/`)
- **UI runtime:** React `19.2.4` / React DOM `19.2.4`
- **Language:** TypeScript `^5` in **strict** mode
- **State:** Redux Toolkit `^2.12.0` + react-redux `^9.3.0` + **RTK Query**
- **Styling:** styled-components `^6.5.3` (SSR via a styled registry) + `normalize.css`
- **Forms:** react-hook-form `^7.83.0`
- **3D:** three `^0.184.0` + `@react-three/fiber ^9.6.1` + `@react-three/drei ^10.7.7`
- **Architecture:** **Feature-Sliced Design (FSD)** — see §4

### Runtime requirement (critical)

Next.js 16 requires **Node.js >= 20.9.0**. Verified locally: Node `v20.14.0`, npm `10.7.0`.
Do not downgrade Node; the build will fail on older runtimes.

---

## 2. Critical Setup Requirements

1. **Environment variable is mandatory.** RTK Query's `fetchBaseQuery` reads
   `process.env.NEXT_PUBLIC_API_URL` (`src/shared/api/cards-api.ts`). Without it, API calls
   target `undefined`. A local `.env` exists in this repo — **never read, print, or commit its
   contents**. If you need to document the variable, add it to a `.env.example` instead.
2. **React Compiler is ON.** `next.config.ts` sets `reactCompiler: true` and the repo depends on
   `babel-plugin-react-compiler@1.0.0`. Do **not** add manual `useMemo`/`useCallback`
   micro-optimizations "for performance" — the compiler handles memoization. Write plain,
   idiomatic components.
3. **styled-components SSR.** `next.config.ts` enables `compiler.styledComponents`, and
   `src/app/styled-registry.tsx` provides the SSR style registry. Keep both in sync when
   touching global styling; do not remove the registry.
4. **Strict CSP + security headers** are defined in `next.config.ts` (`headers()`). The CSP
   allows `'unsafe-eval'`, `'wasm-unsafe-eval'`, `blob:` workers, and `connect-src` to
   `NEXT_PUBLIC_API_URL`. If you add a new external origin (fonts, CDN, API), you must update
   the CSP or the resource will be blocked at runtime.
5. **Large 3D assets.** `public/` contains `.glb` models up to ~34 MB plus a Draco decoder in
   `public/draco/`. Never inline these into source; always load them from `public/` and prefer
   the Draco-compressed variants (`macaron_conf1_draco.glb`).

---

## 3. Local Development Setup

```bash
# 1. Install dependencies (Node >= 20.9.0 required)
npm install

# 2. Configure environment (create .env if missing)
#    NEXT_PUBLIC_API_URL=<backend base url>

# 3. Start the dev server (Turbopack/Next dev)
npm run dev            # http://localhost:3000
```

### Scripts (from `package.json`)

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `next dev` | Local dev server |
| `npm run build` | `next build` | Production build |
| `npm run start` | `next start` | Serve the production build |
| `npm run lint` | `eslint` | ESLint (flat config) |
| `npm test` | `jest` | Run the test suite once |
| `npm run test:watch` | `jest --watch` | Watch mode |

There is **no Docker setup** in this repository. Do not invent `docker-compose` commands.

---

## 4. Architecture (Feature-Sliced Design)

Source lives under `src/` and follows FSD layers. Respect the import direction:
`app → pages-slice → widgets → features → entities → shared`.

```
src/
├── app/            # Next.js App Router: routes, providers, store, global styles
│   ├── layout.tsx          # Root layout (lang="ru", fonts, AppProviders)
│   ├── page.tsx            # "/" home route
│   ├── cart/page.tsx       # "/cart" route
│   ├── orders/page.tsx     # "/orders" route
│   ├── providers.tsx       # Client providers (Redux + styled-components registry)
│   ├── store-provider.tsx  # Redux <Provider> wrapper
│   ├── store.ts            # makeStore() + AppStore/RootState/AppDispatch types
│   ├── styled-registry.tsx # SSR style registry for styled-components
│   ├── global-styles.ts    # createGlobalStyle
│   └── fonts.ts            # next/font (Onest)
├── pages-slice/    # Page-level composition: home-page, cart, orders-page
├── widgets/        # Composite UI blocks
├── features/       # User interactions: cart, catalog-filter, order-form,
│                   #   assemble-order, deliver-order, order-details, modal, answer
├── entities/       # Business entities: cart (model/cart-slice.ts + tests)
└── shared/         # Reusable, framework-agnostic layer
    ├── api/        # RTK Query API (cards-api.ts)
    ├── lib/        # helpers (helps/sanitize.ts, helps/handleCopy.ts, ...)
    ├── model/      # shared types
    ├── ui/         # shared UI primitives
    ├── icons/      # icon components
    ├── fonts/      # font assets
    └── redux.ts    # typed hooks: useAppDispatch, useAppSelector
```

**Path alias:** `@/*` → `src/*` (defined in `tsconfig.json` and mirrored in
`jest.config.mjs`). Always import via `@/...`, never with deep relative paths.

---

## 5. State Management & Data Fetching

- **Store factory:** `src/app/store.ts` exports `makeStore()` plus `AppStore`, `RootState`,
  `AppDispatch`. The store is created per request via `store-provider.tsx` (SSR-safe).
- **Typed hooks:** use `useAppDispatch` / `useAppSelector` from `@/shared/redux` — never the
  raw `useDispatch`/`useSelector`.
- **Reducers:** `cart` (`@/entities/cart/model/cart-slice`) and the RTK Query reducer
  `cardsApi.reducerPath`.
- **API layer:** `src/shared/api/cards-api.ts` — `createApi` + `fetchBaseQuery({ baseUrl:
  process.env.NEXT_PUBLIC_API_URL })`, `tagTypes: ['Orders']`. Endpoints:
  - `getCards` → `GET /cards`
  - `getTastes` → `GET /cards/tastes`
  - `getOrders` → `GET /orders` (provides `Orders`)
  - `createOrder` → `POST /orders` (invalidates `Orders`)

  Add new endpoints here and export the generated hooks; do not call `fetch` directly in
  components.

---

## 6. Testing

- **Runner:** Jest `^30.5.1` via `next/jest` (`jest.config.mjs`).
- **Environment:** `jest-environment-jsdom`.
- **Setup:** `jest.setup.ts` imports `@testing-library/jest-dom`.
- **Test discovery:** `testMatch: ['**/*.test.ts', '**/*.test.tsx']`.
- **Alias mapping:** `^@/(.*)$` → `<rootDir>/src/$1`.
- **Existing tests:**
  - `src/entities/cart/model/cart-slice.test.ts`
  - `src/shared/lib/helps/sanitize.test.ts`
  - `src/shared/lib/helps/handleCopy.test.ts`

Run the smallest relevant scope while iterating, then the full suite before finishing:

```bash
npm test -- cart-slice          # single file by name pattern
npm test                        # full suite
```

When you change shared logic, reducers, or helpers, add or update a co-located
`*.test.ts(x)` next to the source file.

---

## 7. Linting & Type Checking

- **ESLint:** flat config `eslint.config.mjs` extending
  `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, with
  `globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])`.
- **TypeScript:** `tsconfig.json` has `strict: true`, `noEmit: true`,
  `moduleResolution: "bundler"`, `jsx: "react-jsx"`.

```bash
npm run lint        # ESLint
npx tsc --noEmit    # type check (no dedicated script exists)
```

---

## 8. Coding Conventions

- **Language of UI copy:** Russian. Keep user-facing strings in Russian to match the app.
- **Components:** function components with hooks; no class components.
- **Styling:** prefer styled-components co-located with the component; global styles live in
  `src/app/global-styles.ts`. Do not introduce a second styling system.
- **Imports:** use the `@/` alias; keep FSD layer boundaries (a lower layer must not import
  from a higher one).
- **Types:** no `any`; model shared types in `src/shared/model`.
- **3D:** keep Three.js/R3F code inside the relevant feature/widget; load models from
  `public/` and prefer Draco-compressed `.glb` files.

---

## 9. Definition of Done

Before considering a task complete:

1. `npm run lint` passes (no new errors).
2. `npx tsc --noEmit` passes.
3. `npm test` passes; new logic has co-located tests.
4. `npm run build` succeeds for changes touching routing, config, providers, or the API layer.
5. No secrets from `.env` are read, printed, or committed.
6. Any new external origin is reflected in the CSP in `next.config.ts`.

---

## 10. Known Discrepancies / Gotchas

- `README.md` says **"Next.js 14+"** and **"CSS Modules"**, but the actual code uses
  **Next.js 16** and **styled-components**. Trust `package.json` and the source, not the README.
- The README claims FSD — this is accurate; follow the layer structure in §4.
- `public/` contains large `.blend`/`.glb`/`.fig` source files (tens of MB). Do not add more
  binary assets to git without need; prefer the compressed `.glb` variants.
- There is no `.env.example`; only a local `.env`. Consider adding an example file when
  documenting setup.
