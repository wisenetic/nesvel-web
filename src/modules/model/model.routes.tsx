import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const ModelListPage = React.lazy(() => import("./pages/list"));
const ModelShowPage = React.lazy(() => import("./pages/show"));

export const ModelRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<ModelListPage />} />
      <Route path="show/:id" element={<ModelShowPage />} />
      {/* Prevent background 404 for drawer routes */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default ModelRoutes;
