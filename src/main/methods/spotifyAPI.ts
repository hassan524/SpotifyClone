import Store from 'electron-store';
import SpotifyTokenResponse from '../utils/data.js';
import { refreshAccessToken } from '../utils/refreshToken.js';


const store = new Store();

export async function fetchSpotifyAPI(url: string): Promise<any> {
  let token = store.get('token') as SpotifyTokenResponse;

  let res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.access_token}` }
  });

  if (res.status === 401) {
    await refreshAccessToken();
    token = store.get('token') as SpotifyTokenResponse;

    res = await fetch(url, {
      headers: { Authorization: `Bearer ${token.access_token}` }
    });

  }

  return res.json();
}
