/// <reference types="vite/client" />

declare module '*.jsx' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: any;
  export default component;
}

