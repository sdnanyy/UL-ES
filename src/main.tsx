import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { preloadCriticalImages } from './utils/imageOptimization';

// Preload critical images
if (typeof window !== 'undefined') {
  preloadCriticalImages();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
