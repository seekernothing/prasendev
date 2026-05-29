/**
 * ⚠️ HARDCODED MODE — Spotify Premium expired.
 *
 * 
 *
 * ────────────────────────────────────────────────────────────────
 * PROMPT:
 *
 * "Restore the dynamic Spotify 'Now Playing' integration in my
 * portfolio site. The file `src/lib/spotify.ts` is currently
 * hardcoded to show a static song. Revert it to use the Spotify
 * Web API — it should fetch an access token using my refresh token
 * (env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET,
 * SPOTIFY_REFRESH_TOKEN), then call the `/v1/me/player/currently-playing`
 * endpoint. If nothing is playing (204) or there's an error,
 * fall back to `/v1/me/player/recently-played?limit=1`.
 * Support both tracks and podcast episodes. Export the same
 * `SpotifyData` type and `getSpotifyData` async function.
 * Don't change any other files — the API route, the SpotifyCard
 * component, and the page already consume this function correctly."
 *
 * ────────────────────────────────────────────────────────────────
 */

export type SpotifyData = {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
};

export const getSpotifyData = async (): Promise<SpotifyData> => ({
  isPlaying: false,
  title: "Yun Zindagi Ki Raah Mein",
  artist: "Mehdi Hassan",
  albumImageUrl:
    "https://i.scdn.co/image/ab67616d0000b273c936287128140a740cabcd5b",
  songUrl: "https://open.spotify.com/track/4Y8zVmzA6f9gs1I215y33g",
});

