import { fetchSpotifyAPI } from "./spotifyAPI.js";

export function getPlaylists() {
  return fetchSpotifyAPI('https://api.spotify.com/v1/me/playlists')
    .then(data => {
      console.log('playlist:', data); 
      return data;
    })
    .catch(err => {
      console.error('Error fetching playlists:', err);
      return { error: err.message };
    });
}
