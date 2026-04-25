import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error(
    '[BizLaunch] Failed to find root element. Ensure <div id="root"> exists in index.html.'
  );
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);