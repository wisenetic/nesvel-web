import { Route, Routes } from "react-router";

export const DetectionRoutes = () => (
  <Routes>
    <Route index element={<div>Detection Routes</div>} />
    <Route path="create" element={<div>Detection - create</div>} />
    <Route path="edit/:id" element={<div>Detection - edit</div>} />
    <Route path="show/:id" element={<div>Detection - show</div>} />
  </Routes>
);

export default DetectionRoutes;
