import { Route, Routes } from "react-router";

export const RuleRoutes = () => (
  <Routes>
    <Route index element={<div>Rule Routes</div>} />
    <Route path="create" element={<div>Rule - create</div>} />
    <Route path="edit/:id" element={<div>Rule - edit</div>} />
    <Route path="show/:id" element={<div>Rule - show</div>} />
  </Routes>
);

export default RuleRoutes;
