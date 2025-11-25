import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const SettingListPage = React.lazy(() => import("./pages/list"));

export const SettingRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<SettingListPage />} />
      {/* background routes placeholder */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default SettingRoutes;
