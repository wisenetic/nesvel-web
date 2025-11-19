import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const RuleListPage = React.lazy(() => import("./pages/list"));
const RuleShowPage = React.lazy(() => import("./pages/show"));
const RuleEditPage = React.lazy(() => import("./pages/edit"));
const RuleCreatePage = React.lazy(() => import("./pages/create"));

export const RuleRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<RuleListPage />} />

      <Route path="show/:id" element={<RuleShowPage />} />
      <Route path="edit/:id" element={<RuleEditPage />} />
      <Route path="create" element={<RuleCreatePage />} />

      {/* Prevent background 404 for modal/drawer routes */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default RuleRoutes;
