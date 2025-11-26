import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const DashboardListPage = React.lazy(() => import("./pages/list"));

export const DashboardRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<DashboardListPage />} />
      {/* Background routes placeholder to avoid 404 when using drawers/modals later */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default DashboardRoutes;
