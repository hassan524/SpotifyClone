import { BrowserWindow, app } from 'electron';
import fetch from 'node-fetch';
import path from 'path';
import Store from 'electron-store';
import SpotifyTokenResponse from '../utils/data.js';

let mainWindow: BrowserWindow | null = null; // Your main app window (set from outside)
let authWindow: BrowserWindow | null = null;
const store = new Store();

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirectUri = 'myapp://callback';
const scope = 'user-read-private user-read-email user-top-read user-read-recently-played';

export function setMainWindow(win: BrowserWindow) {
  mainWindow = win;
}

export function loginWithSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}`;

  authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: true,
      preload: path.join(app.getAppPath(), 'dist-electron/preload/index.cjs'),
    },
  });

  // Set user-agent to mimic Chrome to avoid white screen
  authWindow.webContents.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  // Clear cache to avoid stale data issues
  authWindow.webContents.session.clearCache().then(() => {
    authWindow?.loadURL(authUrl);
  });

  authWindow.webContents.on('will-redirect', (event, url) => {
    if (url.startsWith(redirectUri)) {
      event.preventDefault();

      const urlObj = new URL(url);
      const code = urlObj.searchParams.get('code');

      if (code) {
        exchangeCodeForToken(code)
          .then(() => {
            if (authWindow) {
              authWindow.close();
              authWindow = null;
            }
          })
          .catch((err) => {
            console.error('Token exchange failed:', err);
            if (authWindow) {
              authWindow.close();
              authWindow = null;
            }
          });
      }
    }
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });
}

async function exchangeCodeForToken(code: string) {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    const data = (await res.json()) as SpotifyTokenResponse;
    store.set('token', data);

    mainWindow?.webContents.send('token', data);

    return data;
  } catch (error) {
    console.error('Error during token exchange:', error);
    throw error;
  }
}

export async function gettoken() {
  return store.get('token');
}

export async function logout() {
  store.delete('token');
}
