    // src/app/api/spotify/recently-played/route.ts

import { getAccessToken } from "~/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const track = data.items?.[0]?.track;

    if (!track) {
      return NextResponse.json({ isPlaying: false });
    }

    return NextResponse.json({
      isPlaying: false,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images[0].url,
      songUrl: track.external_urls.spotify,
    });
  } catch (err) {
    console.error("[Spotify] Recently played fetch error", err);
    return NextResponse.json({ error: "Failed to fetch recently played" }, { status: 500 });
  }
}