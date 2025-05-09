import { ipcMain } from "electron";
import { loginWithSpotify, exchangeCodeForToken, closeAuthWindow, gettoken, logout } from "./methods/auth.js";
import { minimize, closeWindow } from "./methods/windows.js";
import Store from 'electron-store';
import { getPlaylists } from "./methods/playlists.js";
const store = new Store();
export function initializeIpcHandlers() {
    ipcMain.handle('login-with-spotify', loginWithSpotify);
    ipcMain.handle('spotify-exchange-code', exchangeCodeForToken);
    ipcMain.handle('closeAuthWindow', closeAuthWindow);
    ipcMain.handle('gettoken', gettoken);
    ipcMain.handle('logout', logout);
    ipcMain.handle('closeWindow', closeWindow);
    ipcMain.handle('minimize', minimize);
    ipcMain.handle('getplaylist', getPlaylists);
}
