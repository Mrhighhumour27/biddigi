/* oxlint-disable react/only-export-components -- Build-time server entry, not a Fast Refresh boundary. */
import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import App from "./App";
export { routes } from "./redesign/routes";
// Exposed only from the build-time server entry for component lifecycle verification.
export { MediaHero } from "./redesign/MediaHero";
export { SignalHero } from "./redesign/SignalHero";
export { CampaignAtlas } from "./redesign/CampaignAtlas";
export function render(pathname: string) {
  return renderToString(
    <StrictMode>
      <App pathname={pathname} />
    </StrictMode>,
  );
}
