/// <reference types="vite/client" />

declare module 'assets/*' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}