import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const AlertListPage = React.lazy(() => import("./pages/list"));
const AlertShowPage = React.lazy(() => import("./pages/show"));
const AlertEditPage = React.lazy(() => import("./pages/edit"));
const AlertCreatePage = React.lazy(() => import("./pages/create"));

export const AlertRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<AlertListPage />} />

      <Route path="show/:id" element={<AlertShowPage />} />
      <Route path="edit/:id" element={<AlertEditPage />} />
      <Route path="create" element={<AlertCreatePage />} />

      {/* Prevent background 404 for modal/drawer routes */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default AlertRoutes;
