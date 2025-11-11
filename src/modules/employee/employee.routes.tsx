import { Route, Routes } from "react-router";

export const EmployeeRoutes = () => (
  <Routes>
    <Route index element={<div>Employee Routes</div>} />
    <Route path="create" element={<div>Employee - create</div>} />
    <Route path="edit/:id" element={<div>Employee - edit</div>} />
    <Route path="show/:id" element={<div>Employee - show</div>} />
  </Routes>
);

export default EmployeeRoutes;
