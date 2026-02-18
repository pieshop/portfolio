/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_API_BASE: string;
  readonly VITE_ASSETS_BASE: string;
  readonly VITE_DATA_BASE: string;
  readonly VITE_GA_ENABLED: string;
  readonly VITE_SERVICE_WORKER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
