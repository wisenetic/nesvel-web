import { Route, Routes } from "react-router";

export const DashboardRoutes = () => (
  <Routes>
    <Route index element={<div>Dashboard Routes</div>} />
    <Route path="create" element={<div>Dashboard - create</div>} />
    <Route path="edit/:id" element={<div>Dashboard - edit</div>} />
    <Route path="show/:id" element={<div>Dashboard - show</div>} />
  </Routes>
);

export default DashboardRoutes;
