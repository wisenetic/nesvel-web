import { Route, Routes } from "react-router";

export const AlertRoutes = () => (
  <Routes>
    <Route index element={<div>Alert Routes</div>} />
    <Route path="create" element={<div>Alert - create</div>} />
    <Route path="edit/:id" element={<div>Alert - edit</div>} />
    <Route path="show/:id" element={<div>Alert - show</div>} />
  </Routes>
);

export default AlertRoutes;
