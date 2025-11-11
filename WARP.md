# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: React 19 + Vite 6 + TypeScript, Refine v5 (core, devtools, kbar, react-router), Tailwind CSS 4, shadcn/ui components.
- Package manager: pnpm is preferred (pnpm-lock.yaml present). npm/yarn also work.
- Path alias: "@" → "src" (see vite.config.ts and tsconfig.json).

Common commands
- Install deps
  - pnpm install
- Run (API mode)
  - pnpm dev
    - Runs refine dev --mode dev, loads .env.dev and uses the Axios API data provider.
- Run (Mock mode)
  - pnpm mock
    - Runs refine dev --mode mock, loads .env.mock and serves data from /public/mocks via the mock data provider.
- Build production bundle
  - pnpm build
    - Runs TypeScript typecheck then refine build (Vite build under the hood).
- Preview built app
  - pnpm start
    - refine start (Vite preview/serve for the built dist).
- Lint
  - pnpm exec eslint . --ext .ts,.tsx
  - Auto-fix: pnpm exec eslint . --ext .ts,.tsx --fix
- Type-check only
  - pnpm exec tsc -p tsconfig.json --noEmit

Environment and modes
- .env.dev
  - VITE_API_MODE=api
  - VITE_API_URL=https://staging-api.yourapp.com
- .env.mock
  - VITE_API_MODE=mock
  - VITE_API_URL=http://localhost:5173/mocks
- Optional: VITE_WS_URL for websockets (read in app.config.ts).
- The running mode is determined by the CLI flag in scripts (refine dev --mode dev|mock); VITE_API_MODE switches data providers at runtime.

High-level architecture
- Entry and providers
  - src/index.tsx boots src/App.tsx.
  - App composes Refine with providers: dataProvider (getDataProvider), authProvider, i18nProvider, routerProvider, notification provider, Refine Devtools/Kbar, and ThemeProvider.
- Routing and auth
  - src/core/router/app-routes.tsx defines two trees:
    - Authenticated layout: wraps routes with <Authenticated>, renders shared <Layout> (Sidebar + Header + main), and mounts every feature module’s route tree under /<resource>/*.
    - Public routes: /login, /register, /forgot-password guarded so authenticated users are redirected to a resource.
- Feature modules (auto-discovered)
  - src/core/modules/index.ts eagerly imports all files matching src/modules/*/*.module.tsx via import.meta.glob.
  - Each module exports an AppModule: { resource: IResourceItem, routes: JSX.Element, priority?, group?, hidden? }.
  - appResources is derived from appModules and fed to Refine. The sidebar/menu uses Refine’s menu tree (resource meta: icon, labelKey, etc.).
  - Example: src/modules/camera/camera.module.tsx + camera.routes.tsx + pages/.
- Data layer
  - src/core/providers/data-provider.ts selects between:
    - api-provider.ts (Axios DataProvider): baseURL from VITE_API_URL, request/response interceptors, 401 refresh flow (refresh endpoint /auth/refresh), queueing for concurrent 401s, and redirect to /login on failure.
    - mock-provider.ts: fetches JSON from /mocks/<resource>.json for getList/getOne; no-ops for write operations.
  - src/core/api/auth.service.ts encapsulates login/logout/refresh and unifies mock vs API behavior; localStorage holds tokens and the current user.
  - src/core/providers/auth-provider.ts adapts auth.service to Refine’s AuthProvider and implements onError to logout on 401.
- Internationalization
  - src/core/i18n/i18n.ts initializes i18next with LanguageDetector and react-i18next; sets document dir/lang on load and language change.
  - src/core/i18n/index.ts merges common translations with auto-imported module-level i18n files at src/modules/*/i18n/{en,ar}.ts.
  - src/core/i18n/i18nProvider.ts implements Refine’s I18nProvider.
- UI shell
  - src/core/components/layout/layout.tsx renders ThemeProvider, Sidebar, Header, and a main content slot.
  - src/core/components/layout/sidebar/* integrates shadcn/ui Sidebar primitives with Refine’s useMenu and supports icons and selection state.
  - src/core/components/shared/* contains reusable inputs, forms, notifications (toast), language and theme controls.
- App configuration
  - src/core/config/app.config.ts centralizes brand info, feature flags, and env (reads import.meta.env). Supported languages: en, ar (RTL handled).

Conventions that matter
- Module shape: place a <name>.module.tsx file exporting AppModule and a <name>.routes.tsx that returns a <Routes> tree. Add pages/ and optional i18n/ per module. The module’s resource.name determines its base route (/name/*) and menu entry.
- Resource meta
  - Use resource.meta.labelKey to hook into i18n (e.g., camera.title) and meta.icon for the sidebar.
- Files are imported via the @ alias. Prefer absolute imports from @/..

Testing
- No test tooling or scripts are configured in package.json. Running a single test is not applicable until a test runner (e.g., Vitest/Jest/Playwright) is added.

Notes for agents
- Refine Devtools and Kbar are included; they mount in App for local development.
- When switching between API and mock modes, ensure the correct .env.* file values are in place; the mode also affects auth.service behavior.
