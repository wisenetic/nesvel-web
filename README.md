# nesvel-web-admin

A modern admin web app built with:
- React 19 + Vite 6 + TypeScript
- Refine v5 (core, devtools, kbar, react-router)
- Tailwind CSS 4
- shadcn/ui components

Path alias: `@` maps to `src` (see `vite.config.ts` and `tsconfig.json`).

## Quick start

Prerequisites
- Node.js (LTS recommended)
- pnpm (preferred) or npm/yarn

Install dependencies

```bash
pnpm install
```

Run (API mode)

```bash
pnpm dev
```

Run (Mock mode)

```bash
pnpm mock
```

Build production bundle

```bash
pnpm build
```

Preview built app

```bash
pnpm start
```

Lint

```bash
pnpm exec eslint . --ext .ts,.tsx
# Auto-fix
pnpm exec eslint . --ext .ts,.tsx --fix
```

Type-check only

```bash
pnpm exec tsc -p tsconfig.json --noEmit
```

## Environment and modes

This app supports two modes controlled by CLI flags and env vars.

Files
- `.env.dev`
  - `VITE_API_MODE=api`
  - `VITE_API_URL=https://staging-api.yourapp.com`
- `.env.mock`
  - `VITE_API_MODE=mock`
  - `VITE_API_URL=http://localhost:5173/mocks`
- Optional: `VITE_WS_URL` for websockets

How it works
- The `refine dev --mode dev|mock` flag (wired in package scripts) selects which `.env.*` is loaded.
- `VITE_API_MODE` switches data providers at runtime (API vs mock). See Data layer below.

## Project structure (high level)

```
src/
  core/
    api/                # auth.service and API helpers
    components/         # layout shell, shared UI
    config/             # app.config.ts (brand, flags, env)
    i18n/               # i18n initialization and provider
    modules/            # auto-discovery of feature modules
    providers/          # data and auth providers
    router/             # app-routes.tsx
  modules/
    <feature>/
      <feature>.module.tsx   # AppModule export (resource + routes)
      <feature>.routes.tsx   # <Routes> tree for the feature
      pages/                 # feature pages
      i18n/{en,ar}.ts        # optional per-module translations
  index.tsx
  App.tsx
```

Path alias: import from `@/...` instead of relative paths.

## Architecture

- Entry and providers
  - `src/index.tsx` boots `src/App.tsx`.
  - App composes Refine with: dataProvider (`getDataProvider`), `authProvider`, `i18nProvider`, routerProvider, notification provider, Refine Devtools/Kbar, and ThemeProvider.

- Routing and auth
  - `src/core/router/app-routes.tsx` defines two trees:
    - Authenticated layout: wraps routes with `<Authenticated>`, renders shared `<Layout>` (Sidebar + Header + main), and mounts each feature’s route tree under `/<resource>/*`.
    - Public routes: `/login`, `/register`, `/forgot-password` guarded so authenticated users are redirected to a resource.

- Feature modules (auto-discovered)
  - `src/core/modules/index.ts` eagerly imports all files matching `src/modules/*/*.module.tsx` via `import.meta.glob`.
  - Each module exports an `AppModule`: `{ resource: IResourceItem, routes: JSX.Element, priority?, group?, hidden? }`.
  - `appResources` is derived from modules and fed to Refine; the sidebar/menu uses Refine’s menu tree (resource meta: icon, labelKey, etc.).

- Data layer
  - `src/core/providers/data-provider.ts` selects between:
    - `api-provider.ts` (Axios DataProvider): `baseURL` from `VITE_API_URL`, request/response interceptors, 401 refresh flow (`/auth/refresh`), queueing for concurrent 401s, and redirect to `/login` on failure.
    - `mock-provider.ts`: fetches JSON from `/mocks/<resource>.json` for `getList/getOne`; no-ops for write operations.
  - `src/core/api/auth.service.ts` encapsulates login/logout/refresh and unifies mock vs API behavior; `localStorage` holds tokens and current user.
  - `src/core/providers/auth-provider.ts` adapts `auth.service` to Refine’s `AuthProvider` and implements `onError` to logout on 401.

- Internationalization
  - `src/core/i18n/i18n.ts` initializes i18next with LanguageDetector and react-i18next; sets document dir/lang on load and language change.
  - `src/core/i18n/index.ts` merges common translations with auto-imported module-level i18n files at `src/modules/*/i18n/{en,ar}.ts`.
  - `src/core/i18n/i18nProvider.ts` implements Refine’s `I18nProvider`.

- UI shell
  - `src/core/components/layout/layout.tsx` renders ThemeProvider, Sidebar, Header, and a main content slot.
  - `src/core/components/layout/sidebar/*` integrates shadcn/ui Sidebar primitives with Refine’s `useMenu` and supports icons and selection state.
  - `src/core/components/shared/*` contains reusable inputs, forms, notifications (toast), language and theme controls.

- App configuration
  - `src/core/config/app.config.ts` centralizes brand info, feature flags, and env (reads `import.meta.env`). Supported languages: `en`, `ar` (RTL handled).

## Conventions

- Module shape
  - Place a `<name>.module.tsx` exporting `AppModule` and a `<name>.routes.tsx` that returns a `<Routes>` tree.
  - Add `pages/` and optional `i18n/` per module.
  - The module’s `resource.name` determines its base route (`/name/*`) and menu entry.

- Resource meta
  - Use `resource.meta.labelKey` to hook into i18n (e.g., `camera.title`) and `meta.icon` for the sidebar.

- Imports
  - Prefer absolute imports from `@/...`.

## Development tips

- Switching API vs Mock
  - Ensure the correct `.env.*` values are in place. The selected mode affects both the data provider and `auth.service` behavior.

- Adding a new feature module (example)
  1) Create `src/modules/foo/foo.module.tsx` exporting an `AppModule` with a unique `resource.name`.
  2) Add `src/modules/foo/foo.routes.tsx` and related pages under `pages/`.
  3) Optional: add translations under `src/modules/foo/i18n/en.ts` and `ar.ts`.
  4) The module will be auto-registered and appear in the sidebar if not `hidden`.

## Testing

No test tooling is configured yet. If you plan to add tests, consider Vitest/Jest for unit tests and Playwright/Cypress for E2E.

## Troubleshooting

- Auth flows
  - On repeated 401s, the app queues refresh requests; persistent failure redirects to `/login`.
- Styles
  - Ensure Tailwind CSS is properly configured and built by Vite; restart dev server if classes don’t apply.
- i18n
  - If language direction or attributes don’t update, verify `i18n.ts` is initializing and handling `on('languageChanged')` correctly.

## License

Proprietary. All rights reserved. Replace with your license if needed.
