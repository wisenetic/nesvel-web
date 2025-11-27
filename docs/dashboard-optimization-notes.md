# AI Vision Camera – Dashboard & Module Optimization Notes

## Checklist

### Core Fixes & Consistency
- [ ] Investigate and fix translation issues where i18n is not working properly (missing keys, wrong language, or fallback text).
- [ ] Unify drawer presentation config across modules using shared presets.
- [ ] Introduce a shared `EmptyState` component and replace per-page implementations.
- [ ] Centralize detection type and severity color mappings so charts, cards, and filters share a single palette.
- [ ] Standardize confirm-delete UX via a shared `DeleteResourceDialog` in all modules.
- [ ] Normalize loading states using a shared `PageLoadingSkeleton`.
- [ ] Fix remaining TypeScript errors in `api-provider`, `mock-provider`, route controller, and form pages until `pnpm exec tsc` passes cleanly.

### Refactors & Shared Components
- [ ] Implement `ResourceListLayout` and apply to all list pages.
- [ ] Implement `DrawerFormLayout` and use it for all create/edit/show drawers.
- [ ] Refactor Rule and Employee list cards (and similar pages) to use `ResourceSummaryCard` + `MetaGrid`.
- [ ] Extract label/value patterns into `MetaGrid` / `InfoItem` and reuse throughout the app.
- [ ] Create shared chart components: `DetectionTypeBarChart`, `SeverityBarChart`, and `WeeklyHeatmapChart`.
- [ ] Implement `StatusBadge` for statuses/severities across modules.
- [ ] Add helper hooks/utilities: `useResourceList`, `useDrawerNavigation`, and centralized color/icon mappers.

### i18n & UX
- [ ] Audit i18n coverage for all modules (including dashboard) to ensure both `en` and `ar` are complete.
- [ ] Consider a shared status/severity vocabulary namespace instead of per-module duplicates.
- [ ] Align button variants, sizes, and icon usage for primary actions and destructive actions across all modules.
- [ ] Improve accessibility for icon-only buttons with consistent `aria-label` or tooltip behavior.

### Performance, DX & Testing
- [ ] Review client-side vs server-side pagination strategies, especially for detections, and standardize approach.
- [ ] Add basic tests (unit/integration) for dashboard charts, Rule/Employee calculations, empty states, and Settings toggles.
- [ ] Document component patterns and module conventions (when to use drawers, how to add a new module, shared color and status schemes).

### Custom Enhancements
- [ ] Create a dynamic layout system so resource cards auto-arrange responsively (based on viewport and density preferences).
- [ ] Ensure "Save" / "Save & Create" buttons are only enabled when all required fields are valid and dirty, across forms.
- [ ] Remove the "Live View" button from the dashboard header (keep live view in the Cameras module).
- [ ] Define and enforce a consistent icon set and color tokens across the entire application.
- [ ] Create a **Location** module to manage a dynamic hierarchical location structure (Site → Building → Floor → Zone).
- [ ] Create a reusable **LocationSelection** component that integrates with forms.
- [ ] Create a reusable **ModelSelection** component for selecting AI models.
- [ ] Implement a shared **dynamic search** pattern for all modules (debounced queries, filter chips).
- [ ] Standardize and fix the **drawer close button** behavior.
- [ ] Build a dedicated **RTSP player** abstraction in React and integrate it into camera views.
- [ ] Extend the `presentation` config to include **mobile** and **desktop** options per route.
- [ ] Integrate **Supabase messaging** (or similar) for notifications / realtime streams.
- [ ] Implement **PWA** support using Vite PWA (service worker, offline caching, manifest, icons).
- [ ] Implement **push notifications** with default/custom sounds and a global sound/mute control.
- [ ] Implement **access control** using a custom Access Control Provider (roles/permissions, per-resource and per-action).
- [ ] Implement a **realtime provider** (e.g., WebSocket/Supabase channel) for live detections, camera status, and alerts.
- [ ] Customize `UnsavedChangesNotifier` to use the **Sonner** toast component.

## 1. Issues and Inconsistencies

### Layout & Structure
- List pages (Dashboard, Rule, Employee, Detection, Model, Camera) all hand-roll:
  - `PageHeader`
  - Optional `StatsOverview`
  - List of cards
  - Empty state block
- Drawer presentation config is repeated across modules (`rule`, `employee`, `camera`, `alert`) with very similar `view: "drawer"`, width, padding, and `side: "right"`.
- "Show" pages (e.g., Rule show, detection details, some Settings sections) each define their own label/value grids instead of a shared abstraction.

### Styling & Cards
- Similar "resource card" layouts are duplicated in:
  - `RuleListPage`
  - `EmployeeListPage`
  - `DetectionCard`
  - `CameraCard` (info mode)
- Empty states use a similar dashed border + centered text pattern across multiple modules but are re-implemented each time.
- Dashboard charts currently hard-code RGB colors for detection types, severities, and time-of-day buckets. These are consistent with the rest of the app but bypass Tailwind/theme tokens.
- Semantic colors for detection types (person/smoke/vehicle/fire) and severities are defined in multiple places instead of a single source of truth.

### Data / Types / API Layer
- `useList` patterns repeat the same boilerplate: `{ result, query } = useList<T>()` plus `useMemo(() => result?.data ?? [], [result])`.
- Detection list implements custom, client-side pagination, while other lists either do not paginate or use server-side pagination semantics.
- The mock data provider and API provider still have TypeScript typing issues (filters, pagination, generic signatures, and implicit `any` parameters).

### Internationalization (i18n)
- Some modules still rely on English-only default strings or have fewer keys in `ar` than in `en`.
- Status and severity vocabularies are duplicated across different namespaces (`rule.severity.*`, `dashboard.severity.*`, `detection.status.*`) instead of a shared vocabulary.
- A few fallback strings (e.g., some `"-"` or `"--"` values, placeholders) are not yet part of the translation files.

### UX / Consistency
- Create/edit/show flows:
  - `alert`, `camera`, `rule`, `employee`, `detection` all use drawers or modals, but button labels, sizes, and header treatments are not fully aligned.
- Confirm delete behavior is implemented slightly differently in Rule, Alert, Camera list, etc.
- Loading states:
  - Some list pages show a basic "Loading..." message.
  - Settings has a richer skeleton layout.
  - There is no shared "page loading" pattern.

### Accessibility & Semantics
- Icon-only buttons do not share a common pattern for accessible labels or tooltips.
- Label/value grids are visually consistent but not implemented via a common `InfoItem` / `MetaGrid` component that could encapsulate better semantics and ARIA attributes.

### Tooling / Quality
- Global TypeScript build still fails due to:
  - Provider generics (`api-provider`, `mock-provider`).
  - JSX namespace issues in some components.
  - `react-hook-form` + resolver typing mismatches in form pages.
- No automated tests yet, despite non-trivial logic (rules, detections, settings, dashboard charts).

---

## 2. Components to Create / Move into `core`

### A. Layout / Page-Level Components
- **`ResourceListLayout`**
  - Encapsulate:
    - `PageHeader` (title, description, actions)
    - Optional `StatsOverview`
    - Optional filters / search area
    - Main list content area
    - Empty state slot
  - Reuse for: Dashboard, Rule, Employee, Detection, Model, Camera list pages.

- **`DrawerPageLayout` / `DrawerFormLayout`**
  - Standard structure for drawer content:
    - Header with title, optional subtitle, close button
    - Scrollable body
    - Footer actions (primary, secondary)
  - Reuse across all create/edit/show drawers.

- **`PageLoadingSkeleton`**
  - Shared skeleton for initial page loads instead of free-form "Loading" placeholders.

### B. Card / Content Primitives
- **`ResourceSummaryCard`**
  - Card pattern combining:
    - Icon + title
    - One or more badges (e.g., severity, status)
    - Optional description
    - Meta grid (label/value pairs)
    - Right-side actions (buttons, toggles)
  - Backed by a flexible props model so Rule, Employee, and similar modules can share it.

- **`MetaGrid` / `InfoGrid`**
  - Renders a grid of label/value pairs with consistent typography.
  - Reusable across:
    - Employee meta sections
    - Rule meta sections and show page
    - Settings system info
    - Camera and Detection details.

- **`EmptyState`**
  - Standard dashed-border empty card with:
    - Title
    - Description
    - Optional action button
  - Replaces custom empty-state divs in Rule, Alert, Model, Employee, Detection, Camera list pages.

- **`StatusBadge`**
  - Maps internal status/severity keys to:
    - Color (from a centralized palette)
    - Translated label (from i18n)
  - Can support:
    - Detection type/status
    - Rule severity and enabled/disabled
    - Employee status
    - Camera status.

### C. Chart-Related Components
- **`DetectionTypeBarChart`**
  - Horizontal bar chart specifically for detection type distributions:
    - Uses shared detection type color mapping.
    - Labels come from `detection.types.*`.
    - Tooltip format is consistent.

- **`SeverityBarChart`**
  - Bar chart for severity buckets (critical/warning/info) with shared colors and labels.

- **`WeeklyHeatmapChart`**
  - Stacked bar-based weekly heatmap with time-of-day segments:
    - Uses consistent colors for `night/morning/afternoon/evening`.
    - Labels come from `dashboard.time_of_day.*`.

- **`KpiStatCard` (wrapper over `StatsOverview`)**
  - Preconfigured variants for typical KPIs (total, active, critical, errors, etc.).

### D. Actions / Dialogs
- **`DeleteResourceDialog`**
  - Generic confirm-delete dialog that wraps `ConfirmDialog`:
    - Accepts resource name, message, and `onConfirm`.
    - Provides consistent button labels and variants.
  - Reusable from Rule, Alert, Camera, Employee, etc.

- **`PrimarySecondaryActions` group**
  - Reusable right-side header action cluster (primary + secondary/destructive button) to keep spacing and sizes aligned across modules.

### E. Hooks / Utilities
- **`useResourceList`**
  - Helper around `useList` that returns data, query object, and optionally computed stats.

- **`useDrawerNavigation`**
  - Encapsulate background-location handling for drawer navigation.

- **Color & Icon Mappers**
  - Central helpers like `getDetectionTypeStyle(type)` and `getSeverityStyle(severity)` used by cards, filters, and charts.

---

## 3. Pending Improvements / Backlog (No-Code Checklist)

### P1 – Consistency & Correctness
1. Unify drawer presentation config across modules using shared presets.
2. Introduce a shared `EmptyState` component and replace per-page implementations.
3. Refactor Rule and Employee list cards to use `ResourceSummaryCard` + `MetaGrid`.
4. Centralize detection type and severity color mappings so charts, cards, and filters share a single palette.
5. Standardize confirm-delete UX via `DeleteResourceDialog` in all modules.
6. Fix remaining TypeScript errors in `api-provider`, `mock-provider`, route controller, and form pages until `pnpm exec tsc` passes cleanly.

### P2 – Reuse & Maintainability
7. Implement `ResourceListLayout` and apply to all list pages.
8. Implement `DrawerFormLayout` and use it for all create/edit/show drawers.
9. Normalize loading states using a shared `PageLoadingSkeleton`.
10. Extract label/value patterns into `MetaGrid` / `InfoItem` and reuse throughout the app.

### P3 – i18n / UX Polish
11. Audit i18n coverage to ensure all user-facing strings (including dashboard) have both `en` and `ar` entries.
12. Consider a shared vocabulary namespace for common statuses and severities instead of per-module duplicates.
13. Align button variants, sizes, and icon usage for primary actions across all modules.
14. Improve accessibility for icon-only buttons with consistent `aria-label` or tooltip behavior.

### P4 – Performance & Developer Experience
15. Review client-side vs server-side pagination strategies, especially for detections, and standardize approach.
16. Add basic tests (unit/integration) for:
    - Dashboard charts
    - Rule/Employee list calculations and empty states
    - Settings toggles and patch behavior.
17. Document component patterns and module conventions (when to use drawers, how to add a new module, shared color and status schemes).

---

## 4. Custom Enhancements (Backlog)

1. Create a dynamic layout system so resource cards auto-arrange responsively (e.g., based on viewport size and density preferences).
2. Ensure "Save" / "Save & Create" buttons are only enabled when all required fields are valid and dirty, across all forms.
3. Remove the "Live View" button from the dashboard header (move live view into the Cameras module instead).
4. Define and enforce a consistent icon set and color tokens across the entire application (detections, cameras, rules, alerts, employees, settings, dashboard charts).
5. Create a **Location** module to manage a dynamic hierarchical location structure (e.g., Site → Building → Floor → Zone).
6. Create a reusable **LocationSelection** component (cascading selector) that plugs into forms in other modules.
7. Create a reusable **ModelSelection** component (searchable list of AI models with status, category, and capabilities).
8. Implement a shared **dynamic search** pattern for all modules (Rule, Employee, Camera, Detection, etc.), with debounced queries and filter chips.
9. Standardize and fix the **drawer close button** behavior (position, icon, keyboard handling, and navigation back to background route).
10. Build a dedicated **RTSP player** abstraction in React (wrapping HLS/WebRTC/other protocols) and integrate it into camera views.
11. Extend the `presentation` config to include **mobile** and **desktop** options for per-route layout behavior.
12. Integrate a **Supabase messaging** (or equivalent) library for notifications / messaging streams.
13. Implement **PWA** support using Vite PWA (service worker, offline caching, manifest, icons).
14. Implement **push notifications** with default and custom sounds, plus a sound/mute icon to control alert audio globally.
15. Implement **access control** using a custom Access Control Provider (roles/permissions, per-resource and per-action).
16. Implement a **realtime provider** (e.g., WebSocket/Supabase channel) for live detections, camera status, and alerts.
17. Customize `UnsavedChangesNotifier` to use the **Sonner** toast component with consistent styling and messaging.
