import "server-only";

import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const spotifyError = request.nextUrl.searchParams.get("error");

  if (spotifyError) {
    return NextResponse.json(
      { error: `Spotify authorization failed: ${spotifyError}` },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Missing Spotify authorization code" },
      { status: 400 },
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Spotify credentials are not configured" },
      { status: 500 },
    );
  }

  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI ??
    new URL("/api/spotify/callback", request.nextUrl.origin).toString();

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  const data = (await response.json()) as Record<string, unknown>;

  if (!response.ok) {
    console.error(
      "[Spotify] Authorization code exchange failed",
      response.status,
      data,
    );
    return NextResponse.json(
      { error: "Failed to exchange Spotify authorization code" },
      { status: response.status },
    );
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
