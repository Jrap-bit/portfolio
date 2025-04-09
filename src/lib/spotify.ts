// lib/spotify.ts

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedAccessToken && tokenExpiryTime && now < tokenExpiryTime) {
    return cachedAccessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify access token");
  }

  const data = await response.json();
  const { access_token, expires_in } = data;

  // Cache it
  cachedAccessToken = access_token;
  tokenExpiryTime = now + expires_in * 1000 - 10_000; // Refresh 10 seconds early

  return access_token;
}