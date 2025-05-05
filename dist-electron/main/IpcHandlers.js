import { ipcMain } from "electron";
import { loginWithSpotify, exchangeCodeForToken, closeAuthWindow, gettoken } from "./methods/auth.js";
export function initializeIpcHandlers() {
    ipcMain.handle('login-with-spotify', loginWithSpotify);
    ipcMain.handle('spotify-exchange-code', exchangeCodeForToken);
    ipcMain.handle('closeAuthWindow', closeAuthWindow);
    ipcMain.handle('gettoken', gettoken);
}
