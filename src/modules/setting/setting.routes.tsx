import { Route, Routes } from "react-router";

export const SettingRoutes = () => (
  <Routes>
    <Route index element={<div>Setting Routes</div>} />
    <Route path="create" element={<div>Setting - create</div>} />
    <Route path="edit/:id" element={<div>Setting - edit</div>} />
    <Route path="show/:id" element={<div>Setting - show</div>} />
  </Routes>
);

export default SettingRoutes;
