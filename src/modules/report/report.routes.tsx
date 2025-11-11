import { Route, Routes } from "react-router";

export const ReportRoutes = () => (
  <Routes>
    <Route index element={<div>Report Routes</div>} />
    <Route path="create" element={<div>Report - create</div>} />
    <Route path="edit/:id" element={<div>Report - edit</div>} />
    <Route path="show/:id" element={<div>Report - show</div>} />
  </Routes>
);

export default ReportRoutes;
