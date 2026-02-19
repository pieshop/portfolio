import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './css/index.css';
import store from './store/configureStore';
import prettyLog from 'utils/prettyLog';
import App from './App';

const logInfo = () => {
  prettyLog.add([
    {
      key: 'Info',
      value: [
        { key: 'Node Env:', value: import.meta.env.MODE },
        { key: 'Service Worker:', value: String(import.meta.env.VITE_SERVICE_WORKER) },
        { key: 'Google Analytics:', value: String(import.meta.env.VITE_GA_ENABLED) },
      ],
    },
  ]);
  prettyLog.print();
};

logInfo();

if (!import.meta.env.DEV && import.meta.env.VITE_SERVICE_WORKER === 'true') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => console.info('SW registered:', registration))
      .catch((err) => console.info('SW registration failed:', err));
  }
}

ReactDOM.createRoot(document.getElementById('app-root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Theme accentColor="violet">
          <App />
        </Theme>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
