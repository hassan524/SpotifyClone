"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld("electronAPI", {
    loginWithSpotify: () => ipcRenderer.invoke('login-with-spotify'),
    exchangeCode: (code) => ipcRenderer.invoke('spotify-exchange-code', code),
    closeAuthWindow: () => ipcRenderer.invoke('closeAuthWindow'),
    gettoken: () => ipcRenderer.invoke('gettoken')
});
