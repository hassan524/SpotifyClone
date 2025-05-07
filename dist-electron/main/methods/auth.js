import { BrowserWindow, app } from 'electron';
import fetch from 'node-fetch';
import path from 'path';
import Store from 'electron-store';
let authWindow = null;
const store = new Store();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = 'https://myapp:3000/callback';
const scope = 'user-read-private user-read-email';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
export function loginWithSpotify() {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    authWindow = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), 'dist-electron/preload/index.cjs'),
        },
    });
    authWindow.loadURL(authUrl);
}
export async function exchangeCodeForToken(_, code) {
    try {
        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' +
                    Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            }),
        });
        const data = (await res.json());
        store.set('token', data);
        return data;
    }
    catch (error) {
        console.error('Error during token exchange:', error);
        throw error;
    }
}
export function closeAuthWindow() {
    authWindow?.close();
}
export async function gettoken() {
    const token = store.get('token');
    return token;
}
export async function logout() {
    store.delete('token');
}
