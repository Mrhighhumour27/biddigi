import "./site.css";
import {installAnalytics} from "./redesign/analytics";
installAnalytics();
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
const root = document.getElementById("root")!;
const content = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, content);
else createRoot(root).render(content);
