import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const DetectionListPage = React.lazy(() => import("./pages/list"));
const DetectionShowPage = React.lazy(() => import("./pages/show"));

export const DetectionRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<DetectionListPage />} />
      <Route path="show/:id" element={<DetectionShowPage />} />
      {/* Prevent background 404 for drawer routes */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default DetectionRoutes;
