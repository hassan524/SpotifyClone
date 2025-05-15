// Import the necessary modules
import { fetchSpotifyAPI } from "./spotifyAPI.js";
import spotifyPreviewFinder from 'spotify-preview-finder';

// Function to get playlists
export function getPlaylists() {
  return fetchSpotifyAPI('https://api.spotify.com/v1/me/playlists')
    .then((data: any) => {
      return data;
    })
    .catch((err: Error) => {
      console.error('Error fetching playlists:', err);
      return { error: err.message };
    });
}

export async function getPlaylist(playlistId: string) {
  const urlInfo = `https://api.spotify.com/v1/playlists/${playlistId}`;

  try {
    
    const playlist = await fetchSpotifyAPI(urlInfo);

    return {
      playlist,
    };
  } catch (err: any) {
    console.error('Error fetching playlist:', err);
    return { error: err.message };
  }
}

// Function to get songs from a playlist
export async function getSongs(playlistId: string) {
  const urlTracks = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const urlInfo = `https://api.spotify.com/v1/playlists/${playlistId}`;

  try {
    const data = await fetchSpotifyAPI(urlTracks);
    const playlist = await fetchSpotifyAPI(urlInfo);

    const songs = await Promise.all(
      data.items.map(async (songItem: any) => {
        const song = songItem.track;
        const songName = song.name;
        const image = song.album?.images?.[0]?.url || '';
        const duration = song.duration_ms;
        const timestamp = songItem.added_at;

        const previewUrl = await getPreviewWithTimeout(songName);

        return {
          name: songName,
          image,
          duration,
          timestamp,
          previewUrl,
        };
      })
    );
    

    return {
      playlist,
      songs,
    };
  } catch (err: any) {
    console.error('Error fetching songs:', err);
    return { error: err.message };
  }
}

async function getPreviewWithTimeout(songName: string) {
  try {
    const res = await spotifyPreviewFinder(songName, 1);
    return res.results.length > 0 ? res.results[0].previewUrls : null; 
  } catch (err) {
    console.error('Error finding preview:', err);
    return null;
  }
}