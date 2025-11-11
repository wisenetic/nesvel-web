import { Route, Routes } from "react-router";

export const ModelRoutes = () => (
  <Routes>
    <Route index element={<div>Model Routes</div>} />
    <Route path="create" element={<div>Model - create</div>} />
    <Route path="edit/:id" element={<div>Model - edit</div>} />
    <Route path="show/:id" element={<div>Model - show</div>} />
  </Routes>
);

export default ModelRoutes;
