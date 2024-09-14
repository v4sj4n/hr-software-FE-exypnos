/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;  // Define your environment variable here
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
