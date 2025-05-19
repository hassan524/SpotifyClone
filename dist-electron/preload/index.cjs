"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld("electronAPI", {
    loginWithSpotify: () => ipcRenderer.invoke('login-with-spotify'),
    exchangeCode: (code) => ipcRenderer.invoke('spotify-exchange-code', code),
    closeAuthWindow: () => ipcRenderer.invoke('closeAuthWindow'),
    gettoken: () => ipcRenderer.invoke('gettoken'),
    logout: () => ipcRenderer.invoke('logout'),
    minimizeWindow: () => ipcRenderer.invoke('minimize'),
    closeWindow: () => ipcRenderer.invoke('closeWindow'),
    getplaylist: () => ipcRenderer.invoke('getplaylist'),
    getsongs: (id) => ipcRenderer.invoke('getsongs', id),
    getSingleplaylist: (playlistid) => ipcRenderer.invoke('getSingleplaylist', playlistid),
    FetchTopArtist: () => ipcRenderer.invoke('FetchTopArtist'),
    FetchTopSongs: () => ipcRenderer.invoke('FetchTopSongs'),
    FetchRecentPLays: () => ipcRenderer.invoke('FetchRecentPLays'),
    FetchNewReleases: () => ipcRenderer.invoke('FetchNewReleases'),
    fetchArtistById: (url) => ipcRenderer.invoke('fetchArtistById', url),
    onToken: (callback) => {
        ipcRenderer.on('token', (_event, token) => callback(token));
    },
    me: () => ipcRenderer.invoke('me')
});
