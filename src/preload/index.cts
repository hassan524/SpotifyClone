const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electronAPI", {
    loginWithSpotify: () => ipcRenderer.invoke('login-with-spotify'),
    exchangeCode: (code: any) => ipcRenderer.invoke('spotify-exchange-code', code),
    closeAuthWindow: () => ipcRenderer.invoke('closeAuthWindow'),
    gettoken: () => ipcRenderer.invoke('gettoken'),
    logout: () => ipcRenderer.invoke('logout'),

    minimizeWindow: () => ipcRenderer.invoke('minimize'),
    closeWindow: () => ipcRenderer.invoke('closeWindow'),

    getplaylist: () => ipcRenderer.invoke('getplaylist'),
    getsongs: (id: string) => ipcRenderer.invoke('getsongs', id),
    getSingleplaylist: (playlistid: string) => ipcRenderer.invoke('getSingleplaylist', playlistid)
});
