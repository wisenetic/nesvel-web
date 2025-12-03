import React, { Suspense } from "react";
import { Routes, Route } from "react-router";

const LocationListPage = React.lazy(() => import("./pages/list/LocationListPage"));

export const LocationRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<LocationListPage />} />
      {/* Prevent background 404 */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default LocationRoutes;
