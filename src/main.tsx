import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { detectFastestCDN, startProgressiveImagePreload } from "./utils/optimizeCdn.ts";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import App from './App.tsx';
import './index.css';

// Establish video origins, then start conservative idle-time asset warmups.
detectFastestCDN().then(() => {
  startProgressiveImagePreload();
}).catch(() => {
  startProgressiveImagePreload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
