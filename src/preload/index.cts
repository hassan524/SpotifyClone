const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electronAPI", {
    loginWithSpotify: () => ipcRenderer.invoke('login-with-spotify'),
    exchangeCode: (code: any) => ipcRenderer.invoke('spotify-exchange-code', code),
    closeAuthWindow: () => ipcRenderer.invoke('closeAuthWindow'),
    gettoken: () => ipcRenderer.invoke('gettoken')
});
