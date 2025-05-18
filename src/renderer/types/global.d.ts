// global.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
      loginWithSpotify: () => void;
      exchangeCode: (code: string) => Promise<any>;
      closeAuthWindow: () => Promise<void>;
      gettoken: () => Promise<string | any>;
      logout: () => void

      minimizeWindow: () => Promise<any>;
      closeWindow:  () => Promise<any>

      getplaylist: () => Promise<any>
      getsongs: (id: string) => Promise<any>
      getSingleplaylist: (playlistid: string) => Promise<any>

      FetchTopArtist: () => Promise<any>
      FetchTopSongs: () => Promise<any>
      FetchRecentPLays: () => Promise<any>
      FetchNewReleases: () => Promise<any>
      fetchArtistById: (url: string) => Promise<any>
      
    };
  }
}
