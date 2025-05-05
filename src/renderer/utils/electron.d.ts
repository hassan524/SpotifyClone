// global.d.ts
declare global {
    interface Window {
      electronAPI: {
        loginWithSpotify: () => void;
        exchangeCode: (code) => Promise<any>;
        closeAuthWindow: () => Promise<any>
        gettoken: () => Promise<any>
      };
    }
  }
  
  export {}; 
  