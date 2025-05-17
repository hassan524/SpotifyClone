import { ipcMain } from "electron";
import { loginWithSpotify, exchangeCodeForToken, closeAuthWindow, gettoken, logout } from "./methods/auth.js";
import { minimize, closeWindow } from "./methods/windows.js";
import { getPlaylists, getSongs, getPlaylist } from "./methods/playlists.js";
import { FetchTopArtist, FetchTopSongs, FetchRecentPLays, FetchNewReleases, fetchArtistById } from "./methods/services.js";
export function initializeIpcHandlers() {
    ipcMain.handle('login-with-spotify', loginWithSpotify);
    ipcMain.handle('spotify-exchange-code', exchangeCodeForToken);
    ipcMain.handle('closeAuthWindow', closeAuthWindow);
    ipcMain.handle('gettoken', gettoken);
    ipcMain.handle('logout', logout);
    ipcMain.handle('closeWindow', closeWindow);
    ipcMain.handle('minimize', minimize);
    ipcMain.handle('getplaylist', getPlaylists);
    ipcMain.handle('getsongs', (_event, id) => getSongs(id));
    ipcMain.handle('getSingleplaylist', (_event, id) => getPlaylist(id));
    ipcMain.handle('FetchTopArtist', FetchTopArtist);
    ipcMain.handle('FetchTopSongs', FetchTopSongs);
    ipcMain.handle('FetchRecentPLays', FetchRecentPLays);
    ipcMain.handle('FetchNewReleases', FetchNewReleases);
    ipcMain.handle('fetchArtistById', (_e, url) => fetchArtistById(url));
}
