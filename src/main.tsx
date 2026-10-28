import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import "./v3.css";
import "./v4.css";
import "./redesign/campaign-atlas.css";
import "./redesign/placement-v4.css";
import "./redesign/publisher-tools.css";
import App from "./App";
const root = document.getElementById("root")!;
const content = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, content);
else createRoot(root).render(content);
