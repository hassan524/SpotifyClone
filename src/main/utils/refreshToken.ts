import fetch from 'node-fetch';
import Store from 'electron-store';
import SpotifyTokenResponse from './data.js';

const store = new Store();

export async function refreshAccessToken() {
  const token = store.get('token') as any
  const refresh_token = token.refresh_token
  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authString}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: clientId,
    })
  });

  const data = await res.json() as SpotifyTokenResponse;


  if (data.access_token) {
    store.set('token', {
      ...token,
      access_token: data.access_token
    });
  } else {
    console.error('Token refresh failed');
  }
}
