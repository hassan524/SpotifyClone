// global.d.ts
declare global {
    interface Window {
      electronAPI: {
        loginWithSpotify: () => void;
        exchangeCode: (code) => Promise<any>;
        closeAuthWindow: () => Promise<any>
      };
    }
  }
  
  export {}; // This is required to make the file a module
  