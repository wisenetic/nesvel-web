import { Route, Routes } from "react-router";

export const MetricRoutes = () => (
  <Routes>
    <Route index element={<div>Metric Routes</div>} />
    <Route path="create" element={<div>Metric - create</div>} />
    <Route path="edit/:id" element={<div>Metric - edit</div>} />
    <Route path="show/:id" element={<div>Metric - show</div>} />
  </Routes>
);

export default MetricRoutes;
