import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import "./utils/optimizeCdn.ts"; // Load global prototype CDN redirectors first
import { detectFastestCDN } from "./utils/optimizeCdn.ts";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import App from './App.tsx';
import './index.css';

// Non-blocking background speed-test to auto-select fastest mirror
detectFastestCDN();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
