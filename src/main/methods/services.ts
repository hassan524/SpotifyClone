import { fetchSpotifyAPI } from "./spotifyAPI.js";

export async function FetchTopArtist() {
    const url = 'https://api.spotify.com/v1/me/top/artists'
    try {
        const data = await fetchSpotifyAPI(url)
        return data
    } catch (error) {
        console.log('error fetching TopArtist', error)
    }
}


export async function FetchTopSongs() {
    const url = 'https://api.spotify.com/v1/me/top/tracks'
    try {
        const data = await fetchSpotifyAPI(url)
        return data
    } catch (error) {
        console.log('error fetching TopArtist', error)
    }
}

export async function FetchRecentPLays() {
    const url = 'https://api.spotify.com/v1/me/player/recently-played?limit=3'
    try {
        const data = await fetchSpotifyAPI(url)
        return data
    } catch (error) {
        console.log('error fetching TopArtist', error)
    }
}


export async function FetchNewReleases() {
    const url = 'https://api.spotify.com/v1/browse/new-releases?country=IN&limit=10';
    try {
        const data = await fetchSpotifyAPI(url)
        return data
    } catch (error) {
        console.log('error fetching FetchCountryPlaylists', error)
    }
}

export async function fetchArtistById(urls: string) {
    const url = `${urls}`;
    try {
        const data = await fetchSpotifyAPI(url);
        return data;
    } catch (error) {
        console.error('Error fetching artist info:', error);
    }
}