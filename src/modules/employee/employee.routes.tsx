import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

const EmployeeListPage = React.lazy(() => import("./pages/list"));
const EmployeeCreatePage = React.lazy(() => import("./pages/create"));
const EmployeeEditPage = React.lazy(() => import("./pages/edit"));
const EmployeeShowPage = React.lazy(() => import("./pages/show"));

export const EmployeeRoutes = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route index element={<EmployeeListPage />} />
      <Route path="create" element={<EmployeeCreatePage />} />
      <Route path="edit/:id" element={<EmployeeEditPage />} />
      <Route path="show/:id" element={<EmployeeShowPage />} />
      {/* background routes */}
      <Route path="*" element={<div />} />
    </Routes>
  </Suspense>
);

export default EmployeeRoutes;
