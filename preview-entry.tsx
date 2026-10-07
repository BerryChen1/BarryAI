import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  detectFastestCDN,
  startProgressiveImagePreload,
  startProgressiveVideoPreload,
} from "./src/utils/optimizeCdn.ts";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import App from "./src/App.tsx";
import "./preview-styles.css";

detectFastestCDN().then(() => {
  startProgressiveImagePreload();
  startProgressiveVideoPreload();
}).catch(() => {
  startProgressiveImagePreload();
  startProgressiveVideoPreload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
