import React from "react";
import { createRoot } from "react-dom/client";

import "@/core/i18n/i18n"; // 👈 Important: initialize before app starts
import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
