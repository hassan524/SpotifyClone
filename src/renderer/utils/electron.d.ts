// global.d.ts

export {};

declare global {
  interface Window {
    electronAPI: {
      loginWithSpotify: () => void;
      exchangeCode: (code: string) => Promise<any>;
      closeAuthWindow: () => Promise<void>;
      gettoken: () => Promise<string | any>;

      minimizeWindow: () => Promise<any>;
      closeWindow:  () => Promise<any>
    };
  }
}
