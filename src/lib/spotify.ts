/**
 * 🎧 LIVE MODE — Spotify "Now Playing"
 *
 * Flow:
 * 1. Swap the refresh token for a fresh access token.
 * 2. Ask Spotify what's playing right now.
 * 3. If nothing is playing (or it fails), ask for the last played song.
 * 4. If even that fails, show the hardcoded backup song so the page never breaks.
 *
 * Needs these env vars (in .env.local and in Vercel):
 *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 */

export type SpotifyData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

// Backup song: shown only if Spotify is unreachable or env vars are missing.
const FALLBACK_SONG: SpotifyData = {
  isPlaying: false,
  title: "Yun Zindagi Ki Raah Mein",
  artist: "Mehdi Hassan",
  albumImageUrl:
    "https://i.scdn.co/image/ab67616d0000b273c936287128140a740cabcd5b",
  songUrl: "https://open.spotify.com/track/4Y8zVmzA6f9gs1I215y33g",
};

const getAccessToken = async (): Promise<string> => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify env vars");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    // Only pull the two safe fields Spotify sends back; nothing else is logged.
    const body = await res.json().catch(() => ({}));
    const error = body?.error ?? "unknown_error";
    const description = body?.error_description ?? "no description";
    throw new Error(
      `Spotify token request failed: ${res.status} (${error}: ${description})`,
    );
  }

  const json = await res.json();
  return json.access_token as string;
};

// Turns a Spotify track OR podcast episode into our simple SpotifyData shape.
const formatItem = (item: any, isPlaying: boolean): SpotifyData | null => {
  if (!item) return null;

  // Podcast episode
  if (item.type === "episode") {
    return {
      isPlaying,
      title: item.name,
      artist: item.show?.name ?? "Podcast",
      albumImageUrl: item.images?.[0]?.url ?? item.show?.images?.[0]?.url ?? "",
      songUrl: item.external_urls?.spotify ?? "",
    };
  }

  // Normal song
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists ?? [])
      .map((a: { name: string }) => a.name)
      .join(", "),
    albumImageUrl: item.album?.images?.[0]?.url ?? "",
    songUrl: item.external_urls?.spotify ?? "",
  };
};

const getNowPlaying = async (
  accessToken: string,
): Promise<SpotifyData | null> => {
  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  // 204 = nothing playing right now
  if (res.status === 204 || !res.ok) return null;

  const json = await res.json();
  if (!json?.item) return null;

  return formatItem(json.item, Boolean(json.is_playing));
};

const getRecentlyPlayed = async (
  accessToken: string,
): Promise<SpotifyData | null> => {
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  return formatItem(json?.items?.[0]?.track, false);
};

export const getSpotifyData = async (): Promise<SpotifyData> => {
  try {
    const accessToken = await getAccessToken();

    const nowPlaying = await getNowPlaying(accessToken).catch(() => null);
    if (nowPlaying) return nowPlaying;

    const recent = await getRecentlyPlayed(accessToken).catch(() => null);
    if (recent) return recent;

    return FALLBACK_SONG;
  } catch (error) {
    console.error("Spotify error, showing fallback song:", error);
    return FALLBACK_SONG;
  }
};