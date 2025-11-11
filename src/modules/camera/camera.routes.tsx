import { Route, Routes } from "react-router";
import { CameraList } from "./pages";
// import { CameraCreatePage } from "./presentation/pages/camera-create.page";
// import { CameraEditPage } from "./presentation/pages/camera-edit.page";
// import { CameraShowPage } from "./presentation/pages/camera-show.page";

export const CameraRoutes = () => (
  <Routes>
    <Route index element={<CameraList></CameraList>} />
    <Route path="create" element={<div>CameraRoutes - create</div>} />
    <Route path="edit/:id" element={<div>CameraRoutes - edit</div>} />
    <Route path="show/:id" element={<div>CameraRoutes - show</div>} />
  </Routes>
);

export default CameraRoutes;
