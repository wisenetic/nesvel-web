import React, { Suspense } from "react";
import { Routes, Route } from "react-router";

const CameraListPage = React.lazy(() => import("./pages/list"));
const CameraShowPage = React.lazy(() => import("./pages/show"));
const CameraEditPage = React.lazy(() => import("./pages/edit"));
const CameraCreatePage = React.lazy(() => import("./pages/create"));

export const CameraRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<CameraListPage />} />

      <Route path="show/:id" element={<CameraShowPage />} />
      <Route path="edit/:id" element={<CameraEditPage />} />
      <Route path="create" element={<CameraCreatePage />} />

      {/* Prevent background 404 */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default CameraRoutes;
