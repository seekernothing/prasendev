import queryString from "query-string";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
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
    throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
  }

  return response.json();
};

export type SpotifyData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
};

const fallback: SpotifyData = {
  isPlaying: false,
  title: "Not Playing",
  artist: "Spotify",
  albumImageUrl: "",
  songUrl: "https://spotify.com",
};

const parseTrack = (track: any, isPlaying: boolean): SpotifyData => ({
  isPlaying,
  title: track.name,
  artist: track.artists.map((a: any) => a.name).join(", "),
  albumImageUrl: track.album?.images?.[0]?.url ?? "",
  songUrl: track.external_urls?.spotify ?? "https://spotify.com",
});

const parseEpisode = (episode: any, isPlaying: boolean): SpotifyData => ({
  isPlaying,
  title: episode.name,
  artist: episode.show?.name ?? "Podcast",
  albumImageUrl:
    episode.images?.[0]?.url ?? episode.show?.images?.[0]?.url ?? "",
  songUrl: episode.external_urls?.spotify ?? "https://spotify.com",
});

const getLastPlayed = async (access_token: string): Promise<SpotifyData> => {
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!res.ok) return fallback;

  const data = await res.json();
  const track = data?.items?.[0]?.track;
  if (!track) return fallback;

  return parseTrack(track, false);
};

export const getSpotifyData = async (): Promise<SpotifyData> => {
  try {
    const { access_token } = await getAccessToken();

    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // 204 = nothing playing, >=400 = error — fall back to recently played
    if (nowPlayingRes.status === 204 || nowPlayingRes.status >= 400) {
      return getLastPlayed(access_token);
    }

    const song = await nowPlayingRes.json();

    // Empty body or no item (transition between tracks)
    if (!song?.item) {
      return getLastPlayed(access_token);
    }

    const { item, is_playing } = song;

    // Podcast episode — different shape from track
    if (item.type === "episode") {
      return parseEpisode(item, is_playing);
    }

    return parseTrack(item, is_playing);
  } catch (error) {
    console.error("Error in getSpotifyData:", error);
    return fallback;
  }
};
