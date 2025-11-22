import queryString from "query-string";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: queryString.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify Token Error:", response.status, errorText);
    throw new Error(
      `Failed to get access token: ${response.status} ${errorText}`
    );
  }

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getRecentlyPlayed = async () => {
  const { access_token } = await getAccessToken();

  return fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export type SpotifyData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
};

export const getSpotifyData = async (): Promise<SpotifyData> => {
  const nowPlayingResponse = await getNowPlaying();

  // If 204, it means nothing is playing currently
  if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
    const recentlyPlayedResponse = await getRecentlyPlayed();
    const recentlyPlayedData = await recentlyPlayedResponse.json();

    // Check if there are any recently played tracks
    if (!recentlyPlayedData.items || recentlyPlayedData.items.length === 0) {
      // Fallback if no data at all (rare but possible for new accounts)
      return {
        isPlaying: false,
        title: "Not Playing",
        artist: "Spotify",
        albumImageUrl: "",
        songUrl: "https://spotify.com",
      };
    }

    const track = recentlyPlayedData.items[0].track;

    return {
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    };
  }

  const song = await nowPlayingResponse.json();

  // If the song object is empty or item is null (can happen in transition)
  if (!song || !song.item) {
    const recentlyPlayedResponse = await getRecentlyPlayed();
    const recentlyPlayedData = await recentlyPlayedResponse.json();
    const track = recentlyPlayedData.items[0].track;
    return {
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    };
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return {
    isPlaying,
    title,
    artist,
    albumImageUrl,
    songUrl,
  };
};
